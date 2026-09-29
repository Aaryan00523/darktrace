import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { RotateCcw, ZoomIn, ZoomOut, Shield, Globe as GlobeIcon } from 'lucide-react';

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  title: string;
  category: string;
  confidence: number;
  details: string;
}

export const IntelligenceGlobe3D: React.FC<{ onNodeSelect?: (nodeData: any) => void }> = ({ onNodeSelect }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    title: '',
    category: '',
    confidence: 0,
    details: ''
  });

  const controlsRef = useRef<{ reset: () => void; zoomIn: () => void; zoomOut: () => void } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.002);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 180);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    // Group for entire globe system
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Core Sphere Wireframe
    const sphereRadius = 60;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 36, 36);
    const sphereWireMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const sphereWire = new THREE.Mesh(sphereGeo, sphereWireMat);
    globeGroup.add(sphereWire);

    // 2. Inner Glow Mesh
    const innerGeo = new THREE.SphereGeometry(sphereRadius * 0.98, 24, 24);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0A1628,
      transparent: true,
      opacity: 0.85
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // 3. Latitude & Longitude Ring Accents
    const ringGeo = new THREE.RingGeometry(sphereRadius * 1.25, sphereRadius * 1.26, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    globeGroup.add(ringMesh);

    // 4. Background Starfield / Floating Intelligence Particles
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 400;
      starPositions[i + 1] = (Math.random() - 0.5) * 400;
      starPositions[i + 2] = (Math.random() - 0.5) * 400;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 1.5,
      transparent: true,
      opacity: 0.4
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 5. Intelligence Nodes
    const interactiveObjects: THREE.Mesh[] = [];
    const nodeCoords: THREE.Vector3[] = [];

    // Synthesize nodes from top actors, infrastructure, and sources
    const nodesData = [
      { id: 'actor-nightfall', title: 'NIGHTFALL Core Relay', type: 'Actor Cluster', confidence: 87, lat: 52.5, lon: 13.4, color: 0x00F0FF },
      { id: 'infra-tor-dread', title: 'Dread Underground Ingest', type: 'Forum Ingest', confidence: 95, lat: 48.8, lon: 2.3, color: 0xA855F7 },
      { id: 'infra-hs-eclipse', title: 'eclipse-drop77.onion', type: 'Hidden Service', confidence: 94, lat: 40.7, lon: -74.0, color: 0xEF4444 },
      { id: 'infra-cert-d8f4', title: 'TLS Cert d8f4e2a1', type: 'Certificate Overlap', confidence: 82, lat: 55.7, lon: 37.6, color: 0x00F0FF },
      { id: 'infra-wallet-btc', title: 'Wasabi UTXO Mixer Bridge', type: 'Blockchain Bridge', confidence: 88, lat: 35.6, lon: 139.6, color: 0xF59E0B },
      { id: 'actor-shadow-m', title: 'SHADOW MERCHANT', type: 'Broker Cluster', confidence: 83, lat: 37.7, lon: -122.4, color: 0x10B981 },
      { id: 'actor-orbital-f', title: 'ORBITAL FOX Node', type: 'Proxy Cell', confidence: 78, lat: 1.3, lon: 103.8, color: 0x38BDF8 },
      { id: 'src-keyserver', title: 'Tor Keyserver HKP Index', type: 'PGP Keyserver', confidence: 91, lat: 51.5, lon: -0.1, color: 0xA855F7 }
    ];

    const convertLatLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const nodeGeo = new THREE.SphereGeometry(1.8, 16, 16);

    nodesData.forEach((item) => {
      const pos = convertLatLonToVector3(item.lat, item.lon, sphereRadius);
      nodeCoords.push(pos);

      const mat = new THREE.MeshBasicMaterial({ color: item.color });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      mesh.userData = item;

      // Glow halo
      const haloGeo = new THREE.RingGeometry(2.2, 3.0, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: item.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.lookAt(pos.clone().multiplyScalar(2));
      mesh.add(haloMesh);

      globeGroup.add(mesh);
      interactiveObjects.push(mesh);
    });

    // 6. Glowing Connecting Intelligence Arcs
    const createCurvedArc = (v1: THREE.Vector3, v2: THREE.Vector3, color = 0x00F0FF) => {
      const distance = v1.distanceTo(v2);
      const mid = v1.clone().lerp(v2, 0.5);
      const midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + distance * 0.25); // Arcs outward from sphere

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(32);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.5
      });
      return new THREE.Line(arcGeo, arcMat);
    };

    if (nodeCoords.length >= 2) {
      globeGroup.add(createCurvedArc(nodeCoords[0], nodeCoords[1], 0x00F0FF));
      globeGroup.add(createCurvedArc(nodeCoords[0], nodeCoords[2], 0xEF4444));
      globeGroup.add(createCurvedArc(nodeCoords[0], nodeCoords[3], 0x00F0FF));
      globeGroup.add(createCurvedArc(nodeCoords[0], nodeCoords[4], 0xF59E0B));
      globeGroup.add(createCurvedArc(nodeCoords[1], nodeCoords[7], 0xA855F7));
      globeGroup.add(createCurvedArc(nodeCoords[2], nodeCoords[5], 0x10B981));
    }

    // 7. Interaction: Mouse dragging, Zoom, Raycasting
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        globeGroup.rotation.y += deltaX * 0.005;
        globeGroup.rotation.x += deltaY * 0.005;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }

      // Raycast for hover tooltip
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;
        setTooltip({
          visible: true,
          x: e.clientX - rect.left,
          y: e.clientY - rect.top - 10,
          title: data.title,
          category: data.type,
          confidence: data.confidence,
          details: `Correlated indicator node with active telemetry link.`
        });
        document.body.style.cursor = 'pointer';
      } else {
        setTooltip(prev => ({ ...prev, visible: false }));
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
      const intersects = raycaster.intersectObjects(interactiveObjects);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const data = hit.userData;
        if (data.id === 'actor-nightfall') {
          store.setSelectedActorId('actor-nightfall');
        }
        if (onNodeSelect) {
          onNodeSelect(data);
        }
        store.addToast({
          title: 'Intelligence Node Focused',
          message: `${data.title} (${data.type}) selected from global network.`,
          type: 'info'
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.05;
      camera.position.z = Math.max(100, Math.min(260, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Expose Controls
    controlsRef.current = {
      reset: () => {
        globeGroup.rotation.set(0, 0, 0);
        camera.position.set(0, 0, 180);
      },
      zoomIn: () => {
        camera.position.z = Math.max(100, camera.position.z - 25);
      },
      zoomOut: () => {
        camera.position.z = Math.min(260, camera.position.z + 25);
      }
    };

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        globeGroup.rotation.y += 0.0018; // Subtle slow rotation
      }

      stars.rotation.y -= 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
    <div className="relative w-full h-full min-h-[420px] overflow-hidden select-none">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
        <button
          onClick={() => controlsRef.current?.zoomIn()}
          className="p-2 rounded bg-dark-800/80 hover:bg-dark-700 text-cyan border border-dark-600 hover:border-cyan transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => controlsRef.current?.zoomOut()}
          className="p-2 rounded bg-dark-800/80 hover:bg-dark-700 text-cyan border border-dark-600 hover:border-cyan transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => controlsRef.current?.reset()}
          className="px-3 py-1.5 rounded bg-dark-800/80 hover:bg-dark-700 text-xs font-mono text-cyan flex items-center space-x-1.5 border border-dark-600 hover:border-cyan transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>RESET VIEW</span>
        </button>
      </div>

      {/* Status Overlay */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-3 text-xs font-mono text-slate-400 bg-dark-800/80 px-3 py-2 rounded border border-dark-600 backdrop-blur pointer-events-none">
        <span className="flex items-center space-x-1.5 text-cyan">
          <GlobeIcon className="w-3.5 h-3.5 animate-pulse" />
          <span>GLOBAL TELEMETRY</span>
        </span>
        <span className="text-slate-600">|</span>
        <span>DRAG TO ROTATE</span>
        <span className="text-slate-600">|</span>
        <span>SCROLL TO ZOOM</span>
      </div>

      {/* Hover Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute z-20 pointer-events-none bg-dark-800/95 border border-cyan/60 rounded p-3 shadow-glow-cyan text-xs font-mono backdrop-blur max-w-xs transition-all"
          style={{
            left: `${Math.min(window.innerWidth - 300, Math.max(10, tooltip.x + 15))}px`,
            top: `${Math.max(10, tooltip.y - 40)}px`
          }}
        >
          <div className="flex items-center justify-between space-x-3 mb-1">
            <span className="font-bold text-white tracking-wide">{tooltip.title}</span>
            <span className="text-cyan text-[10px] px-1.5 py-0.5 rounded bg-cyan/10 border border-cyan/30">
              {tooltip.confidence}% CONF
            </span>
          </div>
          <div className="text-purple-300 text-[11px] mb-1 flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>{tooltip.category}</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-relaxed">{tooltip.details}</p>
          <div className="mt-1.5 text-[9px] text-cyan/70 font-semibold uppercase tracking-wider">
            Click to focus entity & view correlations
          </div>
        </div>
      )}
    </div>
  );
};
