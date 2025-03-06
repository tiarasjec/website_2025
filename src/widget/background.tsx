"use client"
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface BackgroundShaderProps {
  className?: string;
}

const ShaderVisualization: React.FC<BackgroundShaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup renderer with better defaults
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: false,
      powerPreference: 'default'
    });
    
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Detect device type
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Set pixel ratio based on device
      const pixelRatio = isMobile 
        ? Math.min(window.devicePixelRatio, 0.77)  // Lower for mobile
        : Math.min(window.devicePixelRatio, 1.5);   // Higher for laptop/desktop
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
      
      return { width, height };
    };
    
    const { width, height } = updateSize();
    containerRef.current.appendChild(renderer.domElement);
    
    // Fixed positioning for the canvas
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none'; // Don't capture mouse events
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    

    
    // Shader material with red color scheme
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width, height) },

      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform sampler2D iChannel0;
        varying vec2 vUv;
        
        float distLine(vec2 p, vec2 a, vec2 b) {
          vec2 ap = p - a;
          vec2 ab = b - a;
          float aDotB = clamp(dot(ap, ab) / dot(ab, ab), 0.0, 1.0);
          return length(ap - ab * aDotB);
        }
        
        float drawLine(vec2 uv, vec2 a, vec2 b) {
          float line = smoothstep(0.014, 0.0001, distLine(uv, a, b));
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
          return offset + sin(n22(id + offset) * iTime * 0.5) * 0.4;
        }
        
        float layer(vec2 uv) {
          float m = 0.0;
          float t = iTime * 1.5;
          
          vec2 gv = fract(uv) - 0.5;
          vec2 id = floor(uv) - 0.5;
          
          vec2 p[9];
          int i = 0;
          for (float y = -1.0; y <= 1.0; y++) {
            for (float x = -1.0; x <= 1.0; x++) {
              p[i++] = getPoint(id, vec2(x,y));
            }
          }
          
          // Draw connections
          for (int i = 0; i < 9; i++) {
            m += drawLine(gv, p[4], p[i]);
            float sparkle = 1.0 / pow(length(gv - p[i]), 1.5) * 0.005;
            m += sparkle * (sin(t + fract(p[i].x) * 12.23) * 0.4 + 0.6);
          }
          
          // Additional connections for structure
          m += drawLine(gv, p[1], p[3]);
          m += drawLine(gv, p[1], p[5]);
          m += drawLine(gv, p[7], p[3]);
          m += drawLine(gv, p[7], p[5]);
          
          return m;
        }
        
        void main() {
          vec2 fragCoord = vUv * iResolution;
          vec2 uv = (fragCoord - 0.5 * iResolution) / iResolution.y;
          
          // Red color scheme
          vec3 baseColor = vec3(0.4, 0.0, 0.0); // Strong red
          vec3 accentColor = vec3(0.1, 0.0, 0.0); // Lighter red
          vec3 darkColor = vec3(0.0, 0.0, 0.0); // Dark red
          
          // Mix colors based on time
          vec3 c = mix(darkColor, accentColor, sin(iTime * 0.5) * 0.5 + 0.5);
          vec3 col = vec3(0.1, 0.0, 0.0); // Dark red background
          
          float fft = texture2D(iChannel0, vec2(76.0/128.0, 0.)).x / 2.0 + 0.5;
          col += pow(-uv.y + 0.5, 5.0) * fft * baseColor * 0.7;
          
          float m = 0.0;
          float x = sin(iTime * 0.1);
          float y = cos(iTime * 0.15);
          
          mat2 rotMat = mat2(x, y, -y, x);
          uv *= rotMat;
          
          // Multiple layers with different sizes and movement speeds
          for (float i = 0.0; i <= 1.0; i+= 1.0/3.0) {
            float z = fract(i + iTime * 0.04);
            float size = mix(10.0, 0.5, z) * 1.5;
            float fade = smoothstep(0.0, 1.0, z) * smoothstep(1.0, 0.9, z);
            m += layer((size * uv) + i * 10.0) * fade;
          }
          
          col += m * baseColor;
          
          // Add glow effect
          float glow = m * 0.5;
          col += glow * accentColor;
          
          // Add vignette
          float vignette = smoothstep(1.5, 0.5, length(uv));
          col = mix(darkColor, col, vignette);
          
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      transparent: false // Set to false for better performance with a full background
    });

    // Create a full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(quad);

    // Animation loop
    let startTime = Date.now();
    
    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      shaderMaterial.uniforms.iTime.value = elapsedTime;
      

      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      const { width, height } = updateSize();
      camera.updateProjectionMatrix();
      shaderMaterial.uniforms.iResolution.value.set(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className={className} />;
};

export default ShaderVisualization;