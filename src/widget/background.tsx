"use client";
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

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      return { width, height };
    };
    
    const { width, height } = updateSize();
    containerRef.current.appendChild(renderer.domElement);

    const canvas = renderer.domElement;
    Object.assign(canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      pointerEvents: 'none'
    });
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        varying vec2 vUv;
        void main() {
          vec2 uv = (vUv - 0.5) * iResolution / iResolution.y;
          float colorFactor = sin(iTime + length(uv) * 5.0) * 0.5 + 0.5;
          vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(1.0, 0.3, 0.3), colorFactor);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      transparent: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(quad);

    let startTime = Date.now();
    
    const animate = () => {
      shaderMaterial.uniforms.iTime.value = (Date.now() - startTime) / 1000;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const { width, height } = updateSize();
      shaderMaterial.uniforms.iResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};

export default ShaderVisualization;
