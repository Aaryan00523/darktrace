import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Persona } from '../../types';
import { RotateCcw, ZoomIn, ZoomOut, Brain } from 'lucide-react';

export const PersonaSpace3D: React.FC<{
  onSelectPersona?: (persona: Persona) => void;
}> = ({ onSelectPersona }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();
  const [activePersona, setActivePersona] = useState<Persona>(store.personas[0]);

  const controlsRef = useRef<{ reset: () => void; zoomIn: () => void; zoomOut: () => void } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.003);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 15, 60);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    const spaceGroup = new THREE.Group();
    scene.add(spaceGroup);

    // 3D coordinate axes grid
    const gridXY = new THREE.GridHelper(50, 10, 0x162235, 0x0D141E);
    gridXY.position.y = -15;
    scene.add(gridXY);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00F0FF, 1.5, 100);
    pointLight.position.set(0, 20, 20);
    scene.add(pointLight);

    // Interactive Persona Meshes
    const interactiveMeshes: THREE.Mesh[] = [];

    // Focus on curated Nightfall personas plus surrounding cluster personas
    const displayPersonas = store.personas.slice(0, 12);

    displayPersonas.forEach((p, idx) => {
      const isCurated = idx < 3;
      const baseCoords = p.spatialCoordinates || [0, 0, 0];
      const scaledPos = new THREE.Vector3(
        baseCoords[0] * 14,
        baseCoords[1] * 12,
        baseCoords[2] * 14
      );

      const geo = new THREE.DodecahedronGeometry(isCurated ? 2.8 : 1.8);
      const color = isCurated ? 0x00F0FF : 0xA855F7;
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: isCurated ? 0.35 : 0.15
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(scaledPos);
      mesh.userData = p;

      // Glow shell
      const shellGeo = geo.clone();
      const shellMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.scale.multiplyScalar(1.3);
      mesh.add(shellMesh);

      spaceGroup.add(mesh);
      interactiveMeshes.push(mesh);
    });

    // Connecting lines between NightFall cluster personas (demonstrating Euclidean similarity)
    if (interactiveMeshes.length >= 3) {
      const p1 = interactiveMeshes[0].position;
      const p2 = interactiveMeshes[1].position;
      const p3 = interactiveMeshes[2].position;

      const addTriLine = (vA: THREE.Vector3, vB: THREE.Vector3) => {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([vA, vB]);
        const lineMat = new THREE.LineDashedMaterial({
          color: 0x00F0FF,
          dashSize: 1,
          gapSize: 0.5,
          transparent: true,
          opacity: 0.7
        });
        const line = new THREE.Line(lineGeo, lineMat);
        line.computeLineDistances();
        spaceGroup.add(line);
      };

      addTriLine(p1, p2);
      addTriLine(p2, p3);
      addTriLine(p1, p3);
    }

    // Raycast and Interactions
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
        spaceGroup.rotation.y += deltaX * 0.005;
        spaceGroup.rotation.x += deltaY * 0.005;
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
        const hitData = intersects[0].object.userData as Persona;
        setActivePersona(hitData);
        if (onSelectPersona) onSelectPersona(hitData);
        store.addToast({
          title: 'Persona Vector Selected',
          message: `${hitData.handle} (${hitData.platform}) stylometric profile loaded.`,
          type: 'info'
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.05;
      camera.position.z = Math.max(25, Math.min(120, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    controlsRef.current = {
      reset: () => {
        spaceGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 15, 60);
      },
      zoomIn: () => {
        camera.position.z = Math.max(25, camera.position.z - 15);
      },
      zoomOut: () => {
        camera.position.z = Math.min(120, camera.position.z + 15);
      }
    };

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        spaceGroup.rotation.y += 0.0012;
      }
      interactiveMeshes.forEach(m => {
        m.rotation.y += 0.008;
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

      {/* Top Bar */}
      <div className="absolute top-4 left-4 z-10 bg-dark-800/85 backdrop-blur px-3 py-1.5 rounded-lg border border-dark-600 text-xs font-mono text-cyan flex items-center space-x-2">
        <Brain className="w-4 h-4 text-cyan animate-pulse" />
        <span className="font-bold tracking-wide">3D STYLOMETRIC SIMILARITY VECTOR SPACE</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 bg-dark-800/85 backdrop-blur p-1 rounded-lg border border-dark-600">
        <button
          onClick={() => controlsRef.current?.zoomIn()}
          className="p-1.5 rounded hover:bg-dark-700 text-cyan transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => controlsRef.current?.zoomOut()}
          className="p-1.5 rounded hover:bg-dark-700 text-cyan transition-colors"
          title="Zoom Out"
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

      {/* Active Persona Floating Summary */}
      {activePersona && (
        <div className="absolute bottom-4 left-4 z-20 bg-dark-800/95 border border-cyan/60 rounded-lg p-3.5 shadow-glow-cyan text-xs font-mono backdrop-blur max-w-sm">
          <div className="flex items-center justify-between space-x-3 mb-1.5">
            <span className="font-bold text-white text-sm">{activePersona.handle}</span>
            <span className="text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30 text-[10px]">
              {activePersona.metrics.overallCorrelation}% CORRELATION
            </span>
          </div>
          <div className="text-purple-300 text-[11px] mb-2">{activePersona.platform}</div>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 border-t border-dark-600 pt-2 mb-2">
            <div>Stylometry: <span className="text-cyan font-bold">{activePersona.metrics.stylometricSimilarity}%</span></div>
            <div>Vocabulary: <span className="text-cyan font-bold">{activePersona.metrics.vocabularySimilarity}%</span></div>
            <div>Writing Pattern: <span className="text-cyan font-bold">{activePersona.metrics.writingPatternSimilarity}%</span></div>
            <div>Timing Similarity: <span className="text-cyan font-bold">{activePersona.metrics.activityTimingSimilarity}%</span></div>
          </div>
          <p className="text-slate-400 text-[10px] italic leading-relaxed">{activePersona.aiSummary}</p>
        </div>
      )}
    </div>
  );
};
