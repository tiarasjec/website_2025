"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ShaderVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Use lower pixel ratio for mobile
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile, // Disable antialiasing on mobile
      alpha: true,
      powerPreference: 'high-performance' // Request high-performance GPU
    });
    
    renderer.setPixelRatio(pixelRatio);
    
    // Use a scaling factor for the render size on mobile
    const scaleFactor = isMobile ? 0.75 : 1.0;
    const renderWidth = window.innerWidth * scaleFactor;
    const renderHeight = window.innerHeight * scaleFactor;
    
    renderer.setSize(renderWidth, renderHeight, false);
    mountRef.current.innerHTML = ''; 
    mountRef.current.appendChild(renderer.domElement);

    // Optimize the dummy audio texture
    const audioTextureSize = isMobile ? 128 : 256; // Smaller texture for mobile
    let audioData = new Uint8Array(audioTextureSize * 4);
    const audioTexture = new THREE.DataTexture(
      audioData,
      audioTextureSize,
      1,
      THREE.RGBAFormat
    );
    
    const updateAudioTexture = () => {
      for (let i = 0; i < audioTextureSize; i++) {
        const stride = i * 4;
        const value = 128 + 127 * Math.sin(i * 0.1 + Date.now() * 0.001);
        audioData[stride] = value;
        audioData[stride + 1] = value;
        audioData[stride + 2] = value;
        audioData[stride + 3] = 255;
      }
      
      audioTexture.needsUpdate = true;
      return audioTexture;
    };

    const geometry = new THREE.PlaneGeometry(2, 2);

    // Optimize the shader for mobile
    const fragmentShader = `
      uniform float iTime;
      uniform vec3 iResolution;
      uniform sampler2D iChannel0;
      uniform bool isMobile;

      float distLine(vec2 p, vec2 a, vec2 b) {
        vec2 ap = p - a;
        vec2 ab = b - a;
        float aDotB = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
        return length(ap - ab * aDotB);
      }

      float drawLine(vec2 uv, vec2 a, vec2 b) {
        float lineWidth = isMobile ? 0.02 : 0.01; // Wider lines on mobile (easier to render)
        float line = smoothstep(lineWidth + 0.004, lineWidth, distLine(uv, a, b));
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
        // Slowed down animation for better performance
        float timeScale = isMobile ? 0.6 : 1.0;
        return offset + sin(n22(id + offset) * iTime * timeScale) * 0.4;
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
        
        // On mobile, we'll draw fewer lines
        int lineLimit = isMobile ? 5 : 9;
        for (int i = 0; i < lineLimit; i++) {
          m += drawLine(gv, p[4], p[i]);
          
          // Simplified sparkle calculation for mobile
          if (!isMobile || i < 5) {
            float sparkle = 1.0 / pow(length(gv - p[i]), 1.5) * 0.005;
            m += sparkle * (sin(t + fract(p[i].x) * 12.23) * 0.4 + 0.6);
          }
        }
        
        // Draw fewer cross lines on mobile
        if (!isMobile) {
          m += drawLine(gv, p[1], p[3]);
          m += drawLine(gv, p[1], p[5]);
          m += drawLine(gv, p[7], p[3]);
          m += drawLine(gv, p[7], p[5]);
        } else {
          // Just draw the main cross on mobile
          m += drawLine(gv, p[1], p[5]);
          m += drawLine(gv, p[3], p[7]);
        }
         
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
        
        // Reduce the number of layers on mobile
        float layerCount = isMobile ? 3.0 : 4.0;
        
        for (float i = 0.0; i <= 1.0; i += 1.0/layerCount) {
          float z = fract(i + iTime * 0.05);
          float size = mix(15.0, 0.1, z) * 1.50;
          float fade = smoothstep(0.0, 1.0, z) * smoothstep(1.0, 0.9, z);
          m += layer((size * uv) + i * 10.0) * fade;
        }
        
        col += m * redColor;
        
        gl_FragColor = vec4(col, 0.8); // Added some transparency
      }
    `;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(renderWidth, renderHeight, 1) },
        iChannel0: { value: updateAudioTexture() },
        isMobile: { value: isMobile }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    const handleResize = () => {
      if (!mountRef.current) return;
      
      // Update mobile status
      const wasMobile = isMobile;
      setIsMobile(window.innerWidth < 768);
      
      // Update uniforms if mobile status changed
      if (wasMobile !== isMobile) {
        shaderMaterial.uniforms.isMobile.value = isMobile;
      }
      
      // Scale rendering based on device
      const newScaleFactor = window.innerWidth < 768 ? 0.75 : 1.0;
      const width = window.innerWidth * newScaleFactor;
      const height = window.innerHeight * newScaleFactor;
      
      renderer.setSize(width, height, false);
      shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let frameId: number;
    let lastUpdate = 0;
    const updateInterval = isMobile ? 1000/30 : 1000/60; // Limit to 30fps on mobile
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      const now = performance.now();
      const elapsed = now - lastUpdate;
      
      if (elapsed >= updateInterval) {
        shaderMaterial.uniforms.iTime.value = clock.getElapsedTime();
        

        if (!isMobile || Math.floor(clock.getElapsedTime() * 10) % 2 === 0) {
          shaderMaterial.uniforms.iChannel0.value = updateAudioTexture();
        }
        
        renderer.render(scene, camera);
        lastUpdate = now;
      }
    };
    
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
      audioTexture.dispose();
    };
  }, [isMobile]);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
        pointerEvents: 'none', 
        background: 'black'
      }}
    />
  );
};

export default ShaderVisualization;