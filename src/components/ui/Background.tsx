"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShaderVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Allow transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.innerHTML = ''; // Clear any existing content
    mountRef.current.appendChild(renderer.domElement);

    // Create a dummy data texture for audio
    const createDummyAudioTexture = () => {
      const width = 256;
      const height = 1;
      const size = width * height;
      const data = new Uint8Array(size * 4);
      
      for (let i = 0; i < size; i++) {
        const stride = i * 4;
        const value = 128 + 127 * Math.sin(i * 0.1 + Date.now() * 0.001);
        data[stride] = value;
        data[stride + 1] = value;
        data[stride + 2] = value;
        data[stride + 3] = 255;
      }
      
      const dataTexture = new THREE.DataTexture(
        data,
        width,
        height,
        THREE.RGBAFormat
      );
      dataTexture.needsUpdate = true;
      
      return dataTexture;
    };

    // Create a plane for the shader
    const geometry = new THREE.PlaneGeometry(2, 2);

    // The shader material - red only
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
        iChannel0: { value: createDummyAudioTexture() },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform sampler2D iChannel0;

        float distLine(vec2 p, vec2 a, vec2 b) {
          vec2 ap = p - a;
          vec2 ab = b - a;
          float aDotB = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
          return length(ap - ab * aDotB);
        }

        float drawLine(vec2 uv, vec2 a, vec2 b) {
          float line = smoothstep(0.014, 0.01, distLine(uv, a, b));
          float dist = length(b-a);
          return line * (smoothstep(1.3, 0.8, dist) * 0.5 + smoothstep(0.04, 0.03, abs(dist - 0.75)));
        }

        float n21(vec2 i) {
          i += fract(i * vec2(223.64, 823.12));
          i += dot(i, i + 23.14);
          return fract(i.x * i.y);
        }

        vec2 n22(vec2 i) {
          float x = n21(i);
          return vec2(x, n21(i+x));
        }

        vec2 getPoint(vec2 id, vec2 offset) {
          return offset + sin(n22(id + offset) * iTime * 1.0) * 0.4;
        }

        float layer(vec2 uv) {
          float m = 0.0;
          float t = iTime * 2.0;
         
          vec2 gv = fract(uv) - 0.5;
          vec2 id = floor(uv) - 0.5;
          
          vec2 p[9];
          int i = 0;
          for (float y = -1.0; y <= 1.0; y++) {
            for (float x = -1.0; x <= 1.0; x++) {
              p[i++] = getPoint(id, vec2(x,y));
            }
          }
          
          for (int i = 0; i < 9; i++) {
            m += drawLine(gv, p[4], p[i]);
            float sparkle = 1.0 / pow(length(gv - p[i]), 1.5) * 0.005;
            m += sparkle * (sin(t + fract(p[i].x) * 12.23) * 0.4 + 0.6);
          }
          
          m += drawLine(gv, p[1], p[3]);
          m += drawLine(gv, p[1], p[5]);
          m += drawLine(gv, p[7], p[3]);
          m += drawLine(gv, p[7], p[5]);
           
          return m;
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
          
          // Using only red color
          float redBase = 0.6 + 0.4 * sin(iTime * 0.5);
          vec3 redColor = vec3(redBase, 0.0, 0.0);
          vec3 col = vec3(0);
          
          // Get audio data 
          float fft = texture2D(iChannel0, vec2(76.0/256.0, 0.0)).x / 255.0;
          fft = fft / 2.0 + 0.5;
          
          col += pow(-uv.y + 0.5, 5.0) * fft * vec3(1.0, 0.0, 0.0);
          
          float m = 0.0;
          float x = sin(iTime * 0.1);
          float y = cos(iTime * 0.2);
          
          mat2 rotMat = mat2(x, y, -y, x);
          uv *= rotMat;
          
          for (float i = 0.0; i <= 1.0; i += 1.0/4.0) {
            float z = fract(i + iTime * 0.05);
            float size = mix(15.0, 0.1, z) * 1.50;
            float fade = smoothstep(0.0, 1.0, z) * smoothstep(1.0, 0.9, z);
            m += layer((size * uv) + i * 10.0) * fade;
          }
          
          col += m * redColor;
          
          gl_FragColor = vec4(col, 0.8); // Added some transparency
        }
      `,
      transparent: true, // Enable transparency in the material
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    let frameId: number;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Update time uniform
      shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();
      
      // Update audio texture with dummy data
      shaderMaterial.uniforms.iChannel0.value = createDummyAudioTexture();
      shaderMaterial.uniforms.iChannel0.value.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Put behind other content
        pointerEvents: 'none', // Allow clicking through to content
        background: 'black'
      }}
    />
  );
};

export default ShaderVisualization;