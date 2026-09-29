import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Activity, Radio, Cpu, RefreshCw } from 'lucide-react';

export const AutonomousMonitor3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.003);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 30, 85);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    const monitorGroup = new THREE.Group();
    scene.add(monitorGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x00F0FF, 3.5, 120);
    scene.add(coreLight);

    // 1. Central Intelligence Engine Core (Nested geometric cages)
    const coreGeo = new THREE.IcosahedronGeometry(7, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00F0FF,
      emissiveIntensity: 0.6
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    monitorGroup.add(coreMesh);

    // Outer wireframe gyroscope rings
    const ring1Geo = new THREE.TorusGeometry(14, 0.35, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    monitorGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(17, 0.35, 16, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xA855F7, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    monitorGroup.add(ring2);

    // 2. Orbiting Satellite Source Nodes
    const satelliteData = [
      { name: 'Marketplace Intelligence', color: 0x38BDF8, dist: 34, speed: 0.012 },
      { name: 'Forum Intelligence', color: 0xA855F7, dist: 38, speed: 0.015 },
      { name: 'Infrastructure Feeds', color: 0xEF4444, dist: 30, speed: 0.018 },
      { name: 'Blockchain Intelligence', color: 0xF59E0B, dist: 42, speed: 0.01 },
      { name: 'Public Sources', color: 0x10B981, dist: 36, speed: 0.014 }
    ];

    const satelliteMeshes: { mesh: THREE.Mesh; line: THREE.Line; data: any; angle: number }[] = [];

    satelliteData.forEach((sat, i) => {
      const satGeo = new THREE.BoxGeometry(3.5, 3.5, 3.5);
      const satMat = new THREE.MeshStandardMaterial({
        color: sat.color,
        emissive: sat.color,
        emissiveIntensity: 0.4
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const initialAngle = (i / satelliteData.length) * Math.PI * 2;

      // Connecting data stream line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(initialAngle) * sat.dist, 0, Math.sin(initialAngle) * sat.dist)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: sat.color,
        transparent: true,
        opacity: 0.5
      });
      const streamLine = new THREE.Line(lineGeo, lineMat);

      monitorGroup.add(satMesh);
      monitorGroup.add(streamLine);

      satelliteMeshes.push({
        mesh: satMesh,
        line: streamLine,
        data: sat,
        angle: initialAngle
      });
    });

    // 3. Floating Ingest Particle Stream
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = (Math.random() - 0.5) * 30;
      particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 1.2,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    monitorGroup.add(particles);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const speedMultiplier = store.isScanning ? 3.5 : 1.0;

      coreMesh.rotation.y += 0.02 * speedMultiplier;
      coreMesh.rotation.x += 0.01 * speedMultiplier;
      ring1.rotation.z += 0.015 * speedMultiplier;
      ring2.rotation.y -= 0.012 * speedMultiplier;

      // Pulse core scale if scanning
      if (store.isScanning) {
        const pulse = 1 + Math.sin(clock.getElapsedTime() * 10) * 0.15;
        coreMesh.scale.set(pulse, pulse, pulse);
        coreMat.emissiveIntensity = 1.0;
      } else {
        coreMesh.scale.set(1, 1, 1);
        coreMat.emissiveIntensity = 0.5;
      }

      // Orbit satellites and update connecting lines
      satelliteMeshes.forEach(s => {
        s.angle += s.data.speed * speedMultiplier;
        const x = Math.cos(s.angle) * s.data.dist;
        const z = Math.sin(s.angle) * s.data.dist;
        const y = Math.sin(s.angle * 2) * 5;

        s.mesh.position.set(x, y, z);
        s.mesh.rotation.x += 0.02;
        s.mesh.rotation.y += 0.02;

        const positions = s.line.geometry.attributes.position as THREE.BufferAttribute;
        positions.setXYZ(1, x, y, z);
        positions.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [store.isScanning]);

  return (
    <div className="relative w-full h-full min-h-[440px] bg-dark-950 overflow-hidden select-none border border-dark-600 rounded-lg">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Status */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-3 bg-dark-800/85 backdrop-blur px-3 py-1.5 rounded-lg border border-dark-600 text-xs font-mono">
        <span className="flex items-center space-x-1.5 text-emerald-400">
          <Radio className="w-4 h-4 animate-pulse" />
          <span className="font-bold">ENGINE ONLINE</span>
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-300">52 SYNTHETIC INGEST DAEMONS</span>
      </div>

      {/* Trigger Scan Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => store.runAutonomousScan()}
          disabled={store.isScanning}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all shadow-glow-cyan ${
            store.isScanning
              ? 'bg-amber-500/20 border border-amber-500 text-amber-300 cursor-wait'
              : 'bg-cyan/20 hover:bg-cyan/30 border border-cyan text-cyan hover:shadow-glow-cyan-lg'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${store.isScanning ? 'animate-spin' : ''}`} />
          <span>{store.isScanning ? `SCANNING (${store.scanProgress}%)` : 'RUN SCAN NOW'}</span>
        </button>
      </div>

      {/* Bottom Pipeline Stages */}
      <div className="absolute bottom-4 left-4 right-4 z-10 bg-dark-800/85 backdrop-blur px-4 py-2.5 rounded-lg border border-dark-600 flex flex-wrap items-center justify-between text-[11px] font-mono">
        {['SOURCE', 'COLLECT', 'NORMALIZE', 'CORRELATE', 'ANALYZE', 'ATTRIBUTE', 'INTELLIGENCE'].map((step, idx) => (
          <div key={step} className="flex items-center space-x-2 my-1">
            <span className={`px-2 py-0.5 rounded ${
              store.isScanning && idx <= Math.floor(store.scanProgress / 15)
                ? 'bg-cyan/20 border border-cyan text-cyan animate-pulse font-bold'
                : 'bg-dark-700/60 text-slate-300 border border-dark-600'
            }`}>
              {step}
            </span>
            {idx < 6 && <span className="text-cyan/60 font-bold">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
};
