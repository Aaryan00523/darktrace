import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { RotateCcw, ZoomIn, ZoomOut, Server } from 'lucide-react';

interface InfraNodeData {
  tier: number;
  id: string;
  name: string;
  type: string;
  indicator: string;
  confidence: number;
  status: 'ONLINE' | 'INTERMITTENT' | 'OFFLINE';
  details: string;
  position: THREE.Vector3;
  color: number;
}

export const Infrastructure3D: React.FC<{ onSelectInfra?: (infra: any) => void }> = ({ onSelectInfra }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();
  const [selectedItem, setSelectedItem] = useState<InfraNodeData | null>(null);

  const controlsRef = useRef<{ reset: () => void; zoomIn: () => void; zoomOut: () => void } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.003);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 20, 110);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Subtle lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00F0FF, 1.2);
    dirLight.position.set(30, 40, 50);
    scene.add(dirLight);

    // Cascading 6-tier pipeline infrastructure nodes
    const currentActor = store.actors.find(a => a.id === store.selectedActorId) || store.actors[0];

    const cascadeNodes: InfraNodeData[] = [
      {
        tier: 1,
        id: currentActor.id,
        name: 'THREAT ACTOR',
        type: 'Actor Core',
        indicator: currentActor.name,
        confidence: currentActor.attributionConfidence,
        status: 'ONLINE',
        details: 'Originating administrative entity controlling distributed deployment pipelines.',
        position: new THREE.Vector3(-45, 18, 0),
        color: 0x00F0FF
      },
      {
        tier: 2,
        id: 'infra-hs-01',
        name: 'HIDDEN SERVICE',
        type: 'Tor v3 Onion',
        indicator: 'eclipse-drop77.onion',
        confidence: 94,
        status: 'ONLINE',
        details: 'Tor v3 Onion hidden service descriptor published across 6 HSDir replicas.',
        position: new THREE.Vector3(-27, 8, 8),
        color: 0xEF4444
      },
      {
        tier: 3,
        id: 'infra-ip-01',
        name: 'INFRASTRUCTURE',
        type: 'Server Host',
        indicator: '185.220.101.44 (AS53667)',
        confidence: 86,
        status: 'ONLINE',
        details: 'Physical relay node in Amsterdam hosting reverse proxy terminating TLS.',
        position: new THREE.Vector3(-9, -2, -6),
        color: 0xF59E0B
      },
      {
        tier: 4,
        id: 'infra-cert-01',
        name: 'CERTIFICATE',
        type: 'TLS X.509',
        indicator: 'SHA256: d8f4e2a1b9c7',
        confidence: 82,
        status: 'ONLINE',
        details: 'Self-signed cryptographic certificate shared across private endpoints.',
        position: new THREE.Vector3(9, 6, 10),
        color: 0xA855F7
      },
      {
        tier: 5,
        id: 'infra-domain-01',
        name: 'DOMAIN',
        type: 'Clearnet / I2P Pivot',
        indicator: 'nightfall-vault.i2p',
        confidence: 88,
        status: 'ONLINE',
        details: 'Secondary backup peer-to-peer hidden directory resolved through I2P tunnels.',
        position: new THREE.Vector3(27, -6, -4),
        color: 0x38BDF8
      },
      {
        tier: 6,
        id: 'infra-related-01',
        name: 'RELATED INFRASTRUCTURE',
        type: 'Backend Proxy Ring',
        indicator: 'X-Forwarded-Eclipse: ring-04',
        confidence: 85,
        status: 'ONLINE',
        details: 'Consistent custom HTTP headers leaked by administrative proxy cluster.',
        position: new THREE.Vector3(45, 14, 0),
        color: 0x10B981
      }
    ];

    const interactiveMeshes: THREE.Mesh[] = [];

    // Render Nodes & Connecting Conduits
    cascadeNodes.forEach((node, idx) => {
      // Geometry based on tier
      const geo = new THREE.CylinderGeometry(idx === 0 || idx === 5 ? 3.5 : 2.8, idx === 0 || idx === 5 ? 3.5 : 2.8, 6, 16);
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.2,
        metalness: 0.8,
        emissive: node.color,
        emissiveIntensity: 0.25
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(node.position);
      mesh.rotation.x = Math.PI / 4;
      mesh.userData = node;

      // Glow wireframe outer ring
      const ringGeo = new THREE.RingGeometry(4.2, 4.8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      mesh.add(ringMesh);

      rootGroup.add(mesh);
      interactiveMeshes.push(mesh);

      // Connect to next node in pipeline
      if (idx < cascadeNodes.length - 1) {
        const nextPos = cascadeNodes[idx + 1].position;
        const curve = new THREE.QuadraticBezierCurve3(
          node.position,
          new THREE.Vector3(
            (node.position.x + nextPos.x) / 2,
            (node.position.y + nextPos.y) / 2 + 5,
            (node.position.z + nextPos.z) / 2
          ),
          nextPos
        );
        const points = curve.getPoints(32);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
        const lineMat = new THREE.LineBasicMaterial({
          color: node.color,
          transparent: true,
          opacity: 0.55
        });
        const line = new THREE.Line(lineGeo, lineMat);
        rootGroup.add(line);
      }
    });

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
        rootGroup.rotation.y += deltaX * 0.005;
        rootGroup.rotation.x += deltaY * 0.005;
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
        const hitData = intersects[0].object.userData as InfraNodeData;
        setSelectedItem(hitData);
        if (onSelectInfra) onSelectInfra(hitData);
        store.addToast({
          title: 'Infrastructure Tier Inspected',
          message: `${hitData.name}: ${hitData.indicator}`,
          type: 'info'
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.05;
      camera.position.z = Math.max(50, Math.min(180, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    controlsRef.current = {
      reset: () => {
        rootGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 20, 110);
      },
      zoomIn: () => {
        camera.position.z = Math.max(50, camera.position.z - 20);
      },
      zoomOut: () => {
        camera.position.z = Math.min(180, camera.position.z + 20);
      }
    };

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        rootGroup.rotation.y += 0.0015;
      }
      interactiveMeshes.forEach(m => {
        m.rotation.y += 0.01;
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
  }, [store.selectedActorId]);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-dark-950 overflow-hidden select-none border border-dark-600 rounded-lg">
      <div ref={mountRef} className="w-full h-full" />

      {/* Header & Controls */}
      <div className="absolute top-4 left-4 z-10 bg-dark-800/85 backdrop-blur px-3 py-1.5 rounded-lg border border-dark-600 text-xs font-mono text-cyan flex items-center space-x-2">
        <Server className="w-4 h-4 text-cyan animate-pulse" />
        <span className="font-bold tracking-wide">3D INFRASTRUCTURE DE-ANONYMIZATION CASCADE</span>
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

      {/* Selected Infrastructure Detail Drawer */}
      {selectedItem && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-dark-800/95 border border-cyan/60 rounded-lg p-4 shadow-glow-cyan text-xs font-mono backdrop-blur transition-all">
          <div className="flex items-center justify-between border-b border-dark-600 pb-2 mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan/10 border border-cyan/40 text-cyan font-bold">
                TIER {selectedItem.tier}: {selectedItem.name}
              </span>
              <span className="text-white font-bold text-sm">{selectedItem.indicator}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-emerald-400 text-[11px] font-semibold">{selectedItem.status}</span>
              <span className="text-cyan text-[11px]">{selectedItem.confidence}% ATTRIBUTION CONFIDENCE</span>
            </div>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">{selectedItem.details}</p>
        </div>
      )}
    </div>
  );
};
