import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Layers, Database, Cpu, Shield, Globe, Terminal, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ArchLayerData {
  id: string;
  name: string;
  yPos: number;
  color: number;
  components: string[];
  description: string;
  specs: string;
}

export const Architecture3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();
  const [selectedLayer, setSelectedLayer] = useState<ArchLayerData | null>(null);

  const controlsRef = useRef<{ reset: () => void; zoomIn: () => void; zoomOut: () => void } | null>(null);

  const archLayers: ArchLayerData[] = [
    {
      id: 'layer-app',
      name: 'APPLICATION LAYER',
      yPos: 28,
      color: 0x00F0FF,
      components: ['Command Dashboard', '3D Investigation Console', 'Graph Explorer', 'Trace AI Assistant', 'Report Center'],
      description: 'Zero-trust web console delivering reactive 3D graph exploration, explainable attribution cards, and automated case dossier compilation.',
      specs: 'React 19 / WebGL / Three.js / Tailwind CSS / Strict TypeScript / Client-side Cryptographic Verification'
    },
    {
      id: 'layer-storage',
      name: 'STORAGE & INDEXING',
      yPos: 14,
      color: 0xA855F7,
      components: ['Graph Topology Store', 'PostgreSQL Metadata', 'Full-Text Search Index', 'Encrypted Evidence Vault'],
      description: 'Multi-model persistent storage combining property graph indexing for high-speed multi-hop traversals with immutable evidence vaulting.',
      specs: 'Neo4j / PostgreSQL 16 / Vector Search / S3 Object Storage with HMAC-SHA256 Content Validation'
    },
    {
      id: 'layer-intel',
      name: 'INTELLIGENCE ENGINES',
      yPos: 0,
      color: 0x38BDF8,
      components: ['Entity Resolution Core', 'Relationship Engine', 'NLP Stylometry Engine', 'Behaviour Classifier', 'Confidence Engine'],
      description: 'Analytical core executing mathematical cosine NLP vector comparisons, Common Input Ownership blockchain clustering, and multi-factor weighted confidence models.',
      specs: 'Python FastAPI Microservices / PyTorch Stylometric Transformers / NetworkX / Cosine Similarity'
    },
    {
      id: 'layer-proc',
      name: 'PROCESSING & NORMALIZATION',
      yPos: -14,
      color: 0x10B981,
      components: ['Entity Extraction', 'Data Normalization', 'Cryptographic Subkey Deduplication', 'Sanitization Pipeline'],
      description: 'Streaming normalization pipeline converting heterogeneous darknet crawler artifacts into standardized CTI taxonomy schemas.',
      specs: 'Apache Kafka / Celery Workers / STIX 2.1 Schema Mapping / PGP RFC-4880 Parsing'
    },
    {
      id: 'layer-sources',
      name: 'DATA SOURCES & COLLECTION',
      yPos: -28,
      color: 0xF59E0B,
      components: ['Marketplace Scrapers', 'Tor Underground Forum Crawlers', 'TLS Certificate Transparency', 'Blockchain Indexers', 'Public Keyservers'],
      description: 'Distributed network of isolated crawler daemons performing passive synthetic ingestion without unauthorized intrusions.',
      specs: 'Isolated Tor SOCKS5 Proxies / Passive Descriptor Probes / UTXO Ledger Sync / Synthetic Telemetry Feed'
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.003);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(40, 25, 90);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    const archGroup = new THREE.Group();
    scene.add(archGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00F0FF, 1.2);
    dirLight.position.set(40, 50, 40);
    scene.add(dirLight);

    const interactivePlanes: THREE.Mesh[] = [];

    // Construct stacked architectural glass planes
    archLayers.forEach(layer => {
      // Base plane geometry
      const planeGeo = new THREE.BoxGeometry(65, 1.2, 38);
      const planeMat = new THREE.MeshStandardMaterial({
        color: layer.color,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.45,
        emissive: layer.color,
        emissiveIntensity: 0.25
      });
      const planeMesh = new THREE.Mesh(planeGeo, planeMat);
      planeMesh.position.set(0, layer.yPos, 0);
      planeMesh.userData = layer;

      // Outer bounding edge wireframe
      const edges = new THREE.EdgesGeometry(planeGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: 0.9,
        linewidth: 2
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      planeMesh.add(wireframe);

      // Add component blocks onto plane
      layer.components.forEach((comp, idx) => {
        const compGeo = new THREE.BoxGeometry(9, 2.5, 9);
        const compMat = new THREE.MeshStandardMaterial({
          color: layer.color,
          roughness: 0.3,
          metalness: 0.7,
          emissive: layer.color,
          emissiveIntensity: 0.3
        });
        const compMesh = new THREE.Mesh(compGeo, compMat);
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        compMesh.position.set(-20 + col * 20, 2, -10 + row * 16);
        planeMesh.add(compMesh);
      });

      archGroup.add(planeMesh);
      interactivePlanes.push(planeMesh);
    });

    // Vertical inter-layer conduit conduits
    const addVerticalConduit = (x: number, z: number) => {
      const conduitGeo = new THREE.CylinderGeometry(0.3, 0.3, 60, 8);
      const conduitMat = new THREE.MeshBasicMaterial({
        color: 0x00F0FF,
        transparent: true,
        opacity: 0.3
      });
      const conduit = new THREE.Mesh(conduitGeo, conduitMat);
      conduit.position.set(x, 0, z);
      archGroup.add(conduit);
    };

    addVerticalConduit(-30, -16);
    addVerticalConduit(30, -16);
    addVerticalConduit(-30, 16);
    addVerticalConduit(30, 16);

    // Mouse Interaction
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
        archGroup.rotation.y += deltaX * 0.005;
        archGroup.rotation.x += deltaY * 0.003;
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactivePlanes);
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
      const intersects = raycaster.intersectObjects(interactivePlanes);

      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData as ArchLayerData;
        setSelectedLayer(hitData);
        store.addToast({
          title: 'Architecture Layer Selected',
          message: `${hitData.name}: ${hitData.components.length} subsystems loaded.`,
          type: 'info'
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.05;
      camera.position.z = Math.max(50, Math.min(160, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    controlsRef.current = {
      reset: () => {
        archGroup.rotation.set(0, 0, 0);
        camera.position.set(40, 25, 90);
      },
      zoomIn: () => {
        camera.position.z = Math.max(50, camera.position.z - 15);
      },
      zoomOut: () => {
        camera.position.z = Math.min(160, camera.position.z + 15);
      }
    };

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        archGroup.rotation.y += 0.001;
      }
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
    <div className="relative w-full h-full min-h-[500px] bg-dark-950 overflow-hidden select-none border border-dark-600 rounded-lg">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Header */}
      <div className="absolute top-4 left-4 z-10 bg-dark-800/85 backdrop-blur px-3 py-1.5 rounded-lg border border-dark-600 text-xs font-mono text-cyan flex items-center space-x-2">
        <Layers className="w-4 h-4 text-cyan animate-pulse" />
        <span className="font-bold tracking-wide">3D ENTERPRISE SYSTEM ARCHITECTURE</span>
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

      {/* Layer Detail Drawer */}
      {selectedLayer && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-dark-800/95 border border-cyan/60 rounded-lg p-4 shadow-glow-cyan text-xs font-mono backdrop-blur transition-all">
          <div className="flex items-center justify-between border-b border-dark-600 pb-2 mb-2">
            <span className="text-white font-bold text-sm tracking-wide">{selectedLayer.name}</span>
            <span className="text-cyan text-[11px] font-semibold">{selectedLayer.specs}</span>
          </div>
          <p className="text-slate-300 text-xs mb-3 leading-relaxed">{selectedLayer.description}</p>
          <div className="flex flex-wrap gap-2">
            {selectedLayer.components.map(comp => (
              <span key={comp} className="px-2 py-1 rounded bg-dark-700 border border-dark-600 text-cyan text-[10px]">
                {comp}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
