import React, { useState } from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Relationship } from '../../types';
import { ZoomIn, ZoomOut, RotateCcw, Shield, Layers } from 'lucide-react';

export const IdentityGraph2D: React.FC<{
  onSelectNode?: (node: any) => void;
  onSelectEdge?: (edge: Relationship) => void;
}> = ({ onSelectNode, onSelectEdge }) => {
  const store = useDarktraceStore();
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  const currentActor = store.actors.find(a => a.id === store.selectedActorId) || store.actors[0];

  // 2D Layout calculations around center (400, 300)
  const centerX = 450;
  const centerY = 300;

  // Connected nodes layout
  const connectedNodes = [
    { id: currentActor.id, type: 'actor', label: currentActor.name, sublabel: 'Central Threat Actor', x: centerX, y: centerY, color: '#00F0FF', radius: 36, confidence: currentActor.attributionConfidence },
    { id: 'ident-handle-02', type: 'handle', label: 'NF_Market', sublabel: 'SilkCore Handle', x: centerX - 240, y: centerY - 140, color: '#38BDF8', radius: 24, confidence: 91 },
    { id: 'ident-handle-03', type: 'handle', label: 'EclipseVendor', sublabel: 'Genesis Vendor', x: centerX - 260, y: centerY + 130, color: '#38BDF8', radius: 24, confidence: 89 },
    { id: 'ident-pgp-01', type: 'pgp', label: 'PGP: 7A9F 48B2', sublabel: '4096-bit Master Key', x: centerX + 260, y: centerY - 150, color: '#A855F7', radius: 26, confidence: 95 },
    { id: 'ident-wallet-01', type: 'wallet', label: 'BTC: bc1q9x402m', sublabel: 'Escrow Cold Wallet', x: centerX - 320, y: centerY, color: '#F59E0B', radius: 25, confidence: 92 },
    { id: 'ident-wallet-03', type: 'wallet', label: 'XMR: 888tNk48B', sublabel: 'Monero Mixer', x: centerX - 180, y: centerY + 210, color: '#F59E0B', radius: 22, confidence: 85 },
    { id: 'infra-nf-hs-01', type: 'infrastructure', label: 'eclipse-drop77.onion', sublabel: 'Tor v3 Service', x: centerX + 230, y: centerY + 160, color: '#EF4444', radius: 26, confidence: 94 },
    { id: 'infra-nf-cert-01', type: 'certificate', label: 'Cert: d8f4e2a1b9', sublabel: 'Self-Signed TLS', x: centerX + 340, y: centerY + 80, color: '#EF4444', radius: 23, confidence: 82 },
    { id: 'infra-nf-ip-01', type: 'infrastructure', label: '185.220.101.44', sublabel: 'Relay Edge Host', x: centerX + 380, y: centerY + 220, color: '#EF4444', radius: 23, confidence: 81 },
    { id: 'persona-nightfall-dread', type: 'persona', label: 'Persona: Dread', sublabel: 'Dread Profile', x: centerX + 100, y: centerY - 230, color: '#10B981', radius: 25, confidence: 88 },
    { id: 'persona-eclipsevendor-genesis', type: 'persona', label: 'Persona: Genesis', sublabel: 'Stylometric Match', x: centerX - 100, y: centerY - 230, color: '#10B981', radius: 25, confidence: 86 }
  ];

  const nodeMap = new Map(connectedNodes.map(n => [n.id, n]));

  // Build edges
  const edges = store.relationships
    .map(rel => {
      const src = nodeMap.get(rel.sourceId);
      const tgt = nodeMap.get(rel.targetId);
      if (!src || !tgt) return null;
      return {
        id: rel.id,
        source: src,
        target: tgt,
        rel
      };
    })
    .filter(Boolean) as { id: string; source: any; target: any; rel: Relationship }[];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div
      className="relative w-full h-full min-h-[480px] bg-dark-950 overflow-hidden select-none border border-dark-600 rounded-lg cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 2D SVG Canvas */}
      <svg className="w-full h-full min-h-[480px]">
        <defs>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
          {/* Edges */}
          {edges.map(({ id, source, target, rel }) => {
            let strokeColor = '#00F0FF';
            if (rel.relationshipType.includes('WALLET')) strokeColor = '#F59E0B';
            if (rel.relationshipType.includes('PGP')) strokeColor = '#A855F7';
            if (rel.relationshipType.includes('INFRASTRUCTURE') || rel.relationshipType.includes('HOSTED')) strokeColor = '#EF4444';
            if (rel.relationshipType.includes('STYLE') || rel.relationshipType.includes('BEHAVIOURAL')) strokeColor = '#10B981';

            const midX = (source.x + target.x) / 2;
            const midY = (source.y + target.y) / 2;

            return (
              <g key={id} className="cursor-pointer group" onClick={() => {
                store.setSelectedRelationship(rel);
                if (onSelectEdge) onSelectEdge(rel);
              }}>
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={strokeColor}
                  strokeWidth={2}
                  strokeOpacity={0.45}
                  className="transition-all group-hover:stroke-white group-hover:stroke-[3px]"
                />
                <circle
                  cx={midX}
                  cy={midY}
                  r={3.5}
                  fill={strokeColor}
                  className="animate-pulse"
                />
              </g>
            );
          })}

          {/* Nodes */}
          {connectedNodes.map(node => {
            const isCentral = node.id === currentActor.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  store.setSelectedEntity({
                    id: node.id,
                    type: node.type,
                    label: node.label,
                    data: node
                  });
                  if (onSelectNode) onSelectNode(node);
                }}
              >
                {/* Outer Ring */}
                <circle
                  r={node.radius + 6}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={1}
                  strokeDasharray={isCentral ? '4 2' : 'none'}
                  strokeOpacity={0.6}
                  className="group-hover:stroke-white group-hover:stroke-2 transition-all"
                />
                {/* Node Body */}
                <circle
                  r={node.radius}
                  fill="#0D141E"
                  stroke={node.color}
                  strokeWidth={isCentral ? 3 : 2}
                  filter={isCentral ? 'url(#glow-cyan)' : undefined}
                />
                {/* Label inside node */}
                <text
                  textAnchor="middle"
                  dy={node.radius > 25 ? '-2' : '4'}
                  fontSize={isCentral ? '12px' : '9.5px'}
                  fontWeight="600"
                  fill="#FFFFFF"
                  fontFamily="monospace"
                  className="pointer-events-none select-none"
                >
                  {node.label.length > 15 ? node.label.slice(0, 13) + '..' : node.label}
                </text>
                {node.radius > 25 && (
                  <text
                    textAnchor="middle"
                    dy="13"
                    fontSize="8px"
                    fill={node.color}
                    fontFamily="monospace"
                    className="pointer-events-none select-none"
                  >
                    {node.confidence}% CONF
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 bg-dark-800/85 backdrop-blur p-1 rounded-lg border border-dark-600">
        <button
          onClick={() => setScale(s => Math.min(2.0, s + 0.15))}
          className="p-1.5 rounded hover:bg-dark-700 text-cyan transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setScale(s => Math.max(0.4, s - 0.15))}
          className="p-1.5 rounded hover:bg-dark-700 text-cyan transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setScale(1); setPan({ x: 0, y: 0 }); }}
          className="px-2.5 py-1 rounded hover:bg-dark-700 text-xs font-mono text-cyan flex items-center space-x-1 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-dark-800/95 border border-cyan/60 rounded-lg p-3 shadow-glow-cyan text-xs font-mono backdrop-blur max-w-sm">
          <div className="flex items-center justify-between space-x-3 mb-1">
            <span className="font-bold text-white text-sm">{hoveredNode.label}</span>
            <span className="text-cyan px-1.5 py-0.5 rounded bg-cyan/10 border border-cyan/30 text-[10px]">
              {hoveredNode.confidence}% CONF
            </span>
          </div>
          <p className="text-slate-400 text-[11px] mb-1">{hoveredNode.sublabel}</p>
          <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-dark-700 text-slate-300">
            {hoveredNode.type}
          </span>
        </div>
      )}
    </div>
  );
};
