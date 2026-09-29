import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { TimelineEvent } from '../../types';
import { RotateCcw, ZoomIn, ZoomOut, Calendar, Shield, ExternalLink } from 'lucide-react';

export const Timeline3D: React.FC<{
  onSelectEvent?: (event: TimelineEvent) => void;
}> = ({ onSelectEvent }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [yearFilter, setYearFilter] = useState<string>('ALL');

  const controlsRef = useRef<{ reset: () => void; zoomIn: () => void; zoomOut: () => void } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.0035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 20, 80);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    const timelineGroup = new THREE.Group();
    scene.add(timelineGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00F0FF, 1.8, 120);
    pointLight.position.set(0, 30, 40);
    scene.add(pointLight);

    // 1. Central Chronological Spine Ribbon
    const spinePoints: THREE.Vector3[] = [];
    const spineLength = 120;
    for (let z = -spineLength; z <= spineLength; z += 10) {
      spinePoints.push(new THREE.Vector3(0, 0, z));
    }
    const spineGeo = new THREE.BufferGeometry().setFromPoints(spinePoints);
    const spineMat = new THREE.LineBasicMaterial({
      color: 0x00F0FF,
      linewidth: 3,
      transparent: true,
      opacity: 0.6
    });
    const spineLine = new THREE.Line(spineGeo, spineMat);
    timelineGroup.add(spineLine);

    // 2. Year Marker Portals (2024, 2025, 2026)
    const years = [
      { year: '2024', z: -70 },
      { year: '2025', z: 0 },
      { year: '2026', z: 70 }
    ];

    years.forEach(y => {
      const ringGeo = new THREE.TorusGeometry(12, 0.4, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x1D2D44,
        transparent: true,
        opacity: 0.5
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(0, 0, y.z);
      timelineGroup.add(ring);
    });

    // 3. Key Curated Milestones along timeline
    const milestones = store.timelineEvents.slice(0, 18);
    const interactiveMeshes: THREE.Mesh[] = [];

    milestones.forEach((ev, i) => {
      // Calculate z based on date
      const eventYear = parseInt(ev.date.split('-')[0]) || 2025;
      const eventMonth = parseInt(ev.date.split('-')[1]) || 6;
      const normalizedTime = (eventYear - 2024) * 12 + eventMonth; // 0 to 36
      const zPos = -80 + (normalizedTime / 36) * 150;

      // Stagger nodes alternately left and right
      const xOffset = (i % 2 === 0 ? 1 : -1) * (14 + (i % 3) * 4);
      const yOffset = ((i % 4) - 1.5) * 4;

      const eventPos = new THREE.Vector3(xOffset, yOffset, zPos);

      // Node Geometry
      let color = 0x00F0FF;
      if (ev.significance === 'CRITICAL') color = 0xEF4444;
      else if (ev.significance === 'MAJOR') color = 0xF59E0B;
      else if (ev.significance === 'MODERATE') color = 0xA855F7;

      const geo = new THREE.OctahedronGeometry(2.5, 0);
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.3
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(eventPos);
      mesh.userData = ev;

      // Connector line to spine
      const connGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, zPos),
        eventPos
      ]);
      const connMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4
      });
      const connLine = new THREE.Line(connGeo, connMat);
      timelineGroup.add(connLine);

      timelineGroup.add(mesh);
      interactiveMeshes.push(mesh);
    });

    // Interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        timelineGroup.rotation.y += deltaX * 0.005;
        camera.position.z -= deltaY * 0.2; // Scrub along timeline
        camera.position.z = Math.max(-60, Math.min(130, camera.position.z));
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'default';
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData as TimelineEvent;
        setSelectedEvent(hitData);
        if (onSelectEvent) onSelectEvent(hitData);
        store.addToast({
          title: 'Timeline Milestone Selected',
          message: `${hitData.date}: ${hitData.title}`,
          type: 'info'
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.1;
      camera.position.z = Math.max(-60, Math.min(130, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    controlsRef.current = {
      reset: () => {
        timelineGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 20, 80);
      },
      zoomIn: () => {
        camera.position.z = Math.max(-60, camera.position.z - 20);
      },
      zoomOut: () => {
        camera.position.z = Math.min(130, camera.position.z + 20);
      }
    };

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      interactiveMeshes.forEach(m => {
        m.rotation.y += 0.015;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix;
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('click', onClick);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-dark-950 overflow-hidden select-none border border-dark-600 rounded-lg">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Bar Controls */}
      <div className="absolute top-4 left-4 z-10 bg-dark-800/85 backdrop-blur px-3 py-1.5 rounded-lg border border-dark-600 text-xs font-mono text-cyan flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-cyan animate-pulse" />
        <span className="font-bold tracking-wide">3D CHRONOLOGICAL ATTRIBUTION TIMELINE</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 bg-dark-800/85 backdrop-blur p-1 rounded-lg border border-dark-600">
        <button
          onClick={() => controlsRef.current?.zoomIn()}
          className="p-1.5 rounded hover:bg-dark-700 text-cyan transition-colors"
          title="Scrub Forward"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => controlsRef.current?.zoomOut()}
          className="p-1.5 rounded hover:bg-dark-700 text-cyan transition-colors"
          title="Scrub Backward"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => controlsRef.current?.reset()}
          className="px-2.5 py-1 rounded hover:bg-dark-700 text-xs font-mono text-cyan flex items-center space-x-1 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>

      {/* Bottom Milestone Card */}
      {selectedEvent && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-dark-800/95 border border-cyan/60 rounded-lg p-3.5 shadow-glow-cyan text-xs font-mono backdrop-blur transition-all">
          <div className="flex items-center justify-between border-b border-dark-600 pb-2 mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-cyan font-bold">{selectedEvent.date}</span>
              <span className="text-white font-bold text-sm">{selectedEvent.title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-dark-700 text-slate-300 uppercase">
                {selectedEvent.eventType.replace(/_/g, ' ')}
              </span>
              <span className="text-cyan text-[11px] font-semibold">{selectedEvent.confidence}% CONF</span>
            </div>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{selectedEvent.description}</p>
        </div>
      )}
    </div>
  );
};
