import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { EntityType, Relationship } from '../../types';
import { RotateCcw, ZoomIn, ZoomOut, Filter, Info, Eye, Layers } from 'lucide-react';

interface GraphNodeData {
  id: string;
  type: EntityType;
  label: string;
  sublabel: string;
  confidence: number;
  color: number;
  geometryType: 'sphere' | 'octahedron' | 'box' | 'icosahedron' | 'cylinder';
  position: THREE.Vector3;
}

interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  type: string;
  confidence: number;
  color: number;
  originalRel: Relationship;
}

export const IdentityGraph3D: React.FC<{
  onSelectNode?: (node: GraphNodeData) => void;
  onSelectEdge?: (edge: Relationship) => void;
}> = ({ onSelectNode, onSelectEdge }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const store = useDarktraceStore();

  const [hoveredNode, setHoveredNode] = useState<GraphNodeData | null>(null);
  const [filterConfidence, setFilterConfidence] = useState<number>(0);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('ALL');

  const controlsRef = useRef<{
    reset: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    focusNode: (pos: THREE.Vector3) => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    // Three scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070B, 0.003);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 30, 110);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070B, 0);
    container.appendChild(renderer.domElement);

    // Graph Root Group
    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00F0FF, 1.2);
    dirLight1.position.set(50, 50, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xA855F7, 0.8);
    dirLight2.position.set(-50, -30, -50);
    scene.add(dirLight2);

    // Subtle Particle Grid Base
    const gridHelper = new THREE.GridHelper(160, 20, 0x162235, 0x0D141E);
    gridHelper.position.y = -35;
    scene.add(gridHelper);

    // Define Graph Nodes
    const currentActor = store.actors.find(a => a.id === store.selectedActorId) || store.actors[0];

    const nodesData: GraphNodeData[] = [
      // Central Actor Node
      {
        id: currentActor.id,
        type: 'actor',
        label: currentActor.name,
        sublabel: 'Primary Threat Entity',
        confidence: currentActor.attributionConfidence,
        color: 0x00F0FF,
        geometryType: 'octahedron',
        position: new THREE.Vector3(0, 0, 0)
      },
      // Handles
      {
        id: 'ident-handle-02',
        type: 'handle',
        label: 'NF_Market',
        sublabel: 'SilkCore Market Handle',
        confidence: 91,
        color: 0x38BDF8,
        geometryType: 'sphere',
        position: new THREE.Vector3(-32, 16, 12)
      },
      {
        id: 'ident-handle-03',
        type: 'handle',
        label: 'EclipseVendor',
        sublabel: 'Genesis Vendor Account',
        confidence: 89,
        color: 0x38BDF8,
        geometryType: 'sphere',
        position: new THREE.Vector3(-28, -20, 18)
      },
      // PGP Keys
      {
        id: 'ident-pgp-01',
        type: 'pgp',
        label: 'PGP: 7A9F 48B2',
        sublabel: '4096-bit Master Key',
        confidence: 95,
        color: 0xA855F7,
        geometryType: 'icosahedron',
        position: new THREE.Vector3(34, 18, 14)
      },
      // Wallets
      {
        id: 'ident-wallet-01',
        type: 'wallet',
        label: 'BTC: bc1q9x402m',
        sublabel: 'Escrow Cold Wallet (42.1 BTC)',
        confidence: 92,
        color: 0xF59E0B,
        geometryType: 'box',
        position: new THREE.Vector3(-38, -5, -20)
      },
      {
        id: 'ident-wallet-03',
        type: 'wallet',
        label: 'XMR: 888tNk48B',
        sublabel: 'Monero Mixer Endpoint',
        confidence: 85,
        color: 0xF59E0B,
        geometryType: 'box',
        position: new THREE.Vector3(-45, -18, -10)
      },
      // Infrastructure
      {
        id: 'infra-nf-hs-01',
        type: 'infrastructure',
        label: 'eclipse-drop77.onion',
        sublabel: 'Tor v3 Hidden Service',
        confidence: 94,
        color: 0xEF4444,
        geometryType: 'cylinder',
        position: new THREE.Vector3(26, -22, -15)
      },
      {
        id: 'infra-nf-cert-01',
        type: 'certificate',
        label: 'Cert: d8f4e2a1b9',
        sublabel: 'Self-Signed TLS (SHA256)',
        confidence: 82,
        color: 0xEF4444,
        geometryType: 'cylinder',
        position: new THREE.Vector3(45, -14, -25)
      },
      {
        id: 'infra-nf-ip-01',
        type: 'infrastructure',
        label: '185.220.101.44',
        sublabel: 'Relay Edge Host (AS53667)',
        confidence: 81,
        color: 0xEF4444,
        geometryType: 'cylinder',
        position: new THREE.Vector3(55, -28, -18)
      },
      // Persona / Forum
      {
        id: 'persona-nightfall-dread',
        type: 'persona',
        label: 'Persona: Dread',
        sublabel: 'Dread Forum Profile',
        confidence: 88,
        color: 0x10B981,
        geometryType: 'octahedron',
        position: new THREE.Vector3(12, 32, -10)
      },
      {
        id: 'persona-eclipsevendor-genesis',
        type: 'persona',
        label: 'Persona: Genesis',
        sublabel: 'Stylometric Match 86%',
        confidence: 86,
        color: 0x10B981,
        geometryType: 'octahedron',
        position: new THREE.Vector3(-14, 35, 15)
      }
    ];

    // Filter nodes according to state
    const filteredNodes = nodesData.filter(node => {
      if (node.confidence < filterConfidence) return false;
      if (activeTypeFilter !== 'ALL' && node.type !== activeTypeFilter) {
        if (node.id !== currentActor.id) return false;
      }
      return true;
    });

    const nodeMeshMap = new Map<string, THREE.Mesh>();
    const interactiveMeshes: THREE.Mesh[] = [];

    // Construct Node 3D Objects
    filteredNodes.forEach(data => {
      let geo: THREE.BufferGeometry;
      const isCentral = data.id === currentActor.id;
      const sizeMultiplier = isCentral ? 1.6 : 1.0;

      switch (data.geometryType) {
        case 'octahedron':
          geo = new THREE.OctahedronGeometry(4.2 * sizeMultiplier, 0);
          break;
        case 'box':
          geo = new THREE.BoxGeometry(5 * sizeMultiplier, 5 * sizeMultiplier, 5 * sizeMultiplier);
          break;
        case 'icosahedron':
          geo = new THREE.IcosahedronGeometry(4 * sizeMultiplier, 0);
          break;
        case 'cylinder':
          geo = new THREE.CylinderGeometry(2.5 * sizeMultiplier, 2.5 * sizeMultiplier, 6 * sizeMultiplier, 16);
          break;
        default:
          geo = new THREE.SphereGeometry(3.5 * sizeMultiplier, 24, 24);
      }

      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        roughness: 0.3,
        metalness: 0.7,
        emissive: data.color,
        emissiveIntensity: isCentral ? 0.45 : 0.2
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(data.position);
      mesh.userData = data;

      // Glow wireframe outer shell
      const shellGeo = geo.clone();
      const shellMat = new THREE.MeshBasicMaterial({
        color: data.color,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.scale.multiplyScalar(1.25);
      mesh.add(shellMesh);

      graphGroup.add(mesh);
      nodeMeshMap.set(data.id, mesh);
      interactiveMeshes.push(mesh);
    });

    // Match Relationships into Graph Edges
    const edgesData: GraphEdgeData[] = [];
    store.relationships.forEach(rel => {
      const srcNode = nodeMeshMap.get(rel.sourceId);
      const tgtNode = nodeMeshMap.get(rel.targetId);

      if (srcNode && tgtNode) {
        let edgeColor = 0x00F0FF;
        if (rel.relationshipType.includes('WALLET')) edgeColor = 0xF59E0B;
        if (rel.relationshipType.includes('PGP')) edgeColor = 0xA855F7;
        if (rel.relationshipType.includes('INFRASTRUCTURE') || rel.relationshipType.includes('HOSTED')) edgeColor = 0xEF4444;
        if (rel.relationshipType.includes('STYLE') || rel.relationshipType.includes('BEHAVIOURAL')) edgeColor = 0x10B981;

        edgesData.push({
          id: rel.id,
          source: rel.sourceId,
          target: rel.targetId,
          type: rel.relationshipType,
          confidence: rel.confidence,
          color: edgeColor,
          originalRel: rel
        });
      }
    });

    // Render Edges
    const edgeLines: THREE.Line[] = [];
    const interactiveEdgeLines: THREE.Line[] = [];

    edgesData.forEach(edge => {
      const srcMesh = nodeMeshMap.get(edge.source);
      const tgtMesh = nodeMeshMap.get(edge.target);
      if (!srcMesh || !tgtMesh) return;

      const points = [srcMesh.position, tgtMesh.position];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: edge.color,
        transparent: true,
        opacity: Math.max(0.3, edge.confidence / 100),
        linewidth: 2
      });

      const line = new THREE.Line(lineGeo, lineMat);
      line.userData = { isEdge: true, edgeData: edge.originalRel };
      graphGroup.add(line);
      edgeLines.push(line);
      interactiveEdgeLines.push(line);
    });

    // Drag / Orbit / Zoom
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isDragging = true;
        prevMouse = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouse.x;
        const deltaY = e.clientY - prevMouse.y;
        graphGroup.rotation.y += deltaX * 0.005;
        graphGroup.rotation.x += deltaY * 0.005;
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      // Raycast test for hover
      raycaster.setFromCamera(mouse, camera);
      const nodeIntersects = raycaster.intersectObjects(interactiveMeshes);

      if (nodeIntersects.length > 0) {
        const hitMesh = nodeIntersects[0].object as THREE.Mesh;
        setHoveredNode(hitMesh.userData as GraphNodeData);
        document.body.style.cursor = 'pointer';
      } else {
        setHoveredNode(null);
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
      const nodeIntersects = raycaster.intersectObjects(interactiveMeshes);

      if (nodeIntersects.length > 0) {
        const hitData = nodeIntersects[0].object.userData as GraphNodeData;
        store.setSelectedEntity({
          id: hitData.id,
          type: hitData.type,
          label: hitData.label,
          data: hitData
        });

        // Smooth camera lerp target
        controlsRef.current?.focusNode(hitData.position);

        if (onSelectNode) onSelectNode(hitData);
        store.addToast({
          title: 'Entity Selected',
          message: `${hitData.label} (${hitData.sublabel}) loaded in intelligence inspector.`,
          type: 'info'
        });
        return;
      }

      // Check if user clicked an edge
      const edgeIntersects = raycaster.intersectObjects(interactiveEdgeLines);
      if (edgeIntersects.length > 0) {
        const hitEdge = edgeIntersects[0].object.userData.edgeData as Relationship;
        store.setSelectedRelationship(hitEdge);
        if (onSelectEdge) onSelectEdge(hitEdge);
        store.addToast({
          title: 'Relationship Analysis Opened',
          message: `${hitEdge.relationshipType} between ${hitEdge.sourceLabel} and ${hitEdge.targetLabel}`,
          type: 'info'
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.05;
      camera.position.z = Math.max(40, Math.min(220, camera.position.z));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('click', onClick);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Target position for smooth lerp
    let targetCameraPos = camera.position.clone();

    controlsRef.current = {
      reset: () => {
        graphGroup.rotation.set(0, 0, 0);
        targetCameraPos.set(0, 30, 110);
      },
      zoomIn: () => {
        targetCameraPos.z = Math.max(40, targetCameraPos.z - 20);
      },
      zoomOut: () => {
        targetCameraPos.z = Math.min(220, targetCameraPos.z + 20);
      },
      focusNode: (pos: THREE.Vector3) => {
        targetCameraPos.set(pos.x, pos.y + 10, pos.z + 45);
      }
    };

    // Render loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera lerp
      camera.position.lerp(targetCameraPos, 0.08);

      if (!isDragging) {
        graphGroup.rotation.y += 0.001;
      }

      // Rotate individual node meshes subtly
      interactiveMeshes.forEach(mesh => {
        mesh.rotation.y += 0.01;
        mesh.rotation.x += 0.005;
      });

      renderer.render(scene, camera);
    };
    animate();

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
  }, [store.selectedActorId, filterConfidence, activeTypeFilter, store.relationships]);

  return (
    <div className="relative w-full h-full min-h-[480px] bg-dark-950 overflow-hidden select-none border border-dark-600 rounded-lg">
      {/* Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Left Entity Legend & Filters */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 bg-dark-800/85 backdrop-blur px-3 py-2 rounded-lg border border-dark-600 text-xs">
        <span className="font-mono text-cyan text-[11px] font-semibold flex items-center gap-1.5 mr-1">
          <Layers className="w-3.5 h-3.5" />
          FILTER:
        </span>
        {['ALL', 'handle', 'pgp', 'wallet', 'infrastructure', 'persona'].map(type => (
          <button
            key={type}
            onClick={() => setActiveTypeFilter(type)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
              activeTypeFilter === type
                ? 'bg-cyan/20 text-cyan border border-cyan/40 font-bold'
                : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Top Right Controls & Confidence Slider */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-dark-800/85 backdrop-blur px-3 py-1.5 rounded-lg border border-dark-600 text-xs font-mono text-slate-300">
          <Filter className="w-3.5 h-3.5 text-cyan" />
          <span>MIN CONF: {filterConfidence}%</span>
          <input
            type="range"
            min="0"
            max="95"
            step="5"
            value={filterConfidence}
            onChange={(e) => setFilterConfidence(Number(e.target.value))}
            className="w-16 accent-cyan cursor-pointer"
          />
        </div>

        <div className="flex items-center space-x-1.5 bg-dark-800/85 backdrop-blur p-1 rounded-lg border border-dark-600">
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
      </div>

      {/* Node Hover Card */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-dark-800/95 border border-cyan/60 rounded-lg p-3.5 shadow-glow-cyan text-xs font-mono backdrop-blur max-w-sm">
          <div className="flex items-center justify-between space-x-3 mb-1.5">
            <span className="font-bold text-white text-sm">{hoveredNode.label}</span>
            <span className="text-cyan px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30 text-[10px]">
              {hoveredNode.confidence}% CONF
            </span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">{hoveredNode.sublabel}</p>
          <div className="flex items-center space-x-2 text-[10px] text-slate-500">
            <span className="uppercase px-1.5 py-0.5 rounded bg-dark-700 text-slate-300">
              {hoveredNode.type}
            </span>
            <span>•</span>
            <span className="text-cyan/80">Click node to focus & inspect</span>
          </div>
        </div>
      )}

      {/* Graph Visual Key / Legend */}
      <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center space-x-3 bg-dark-800/80 backdrop-blur px-3 py-1.5 rounded border border-dark-600 text-[10px] font-mono text-slate-400 pointer-events-none">
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-cyan inline-block shadow-glow-cyan"></span>
          <span>Actor</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-sky-400 inline-block"></span>
          <span>Handle</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block shadow-glow-purple"></span>
          <span>PGP</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
          <span>Wallet</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-glow-red"></span>
          <span>Infrastructure</span>
        </span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>Persona</span>
        </span>
      </div>
    </div>
  );
};
