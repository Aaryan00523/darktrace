import React, { useState } from 'react';
import { useDarktraceStore } from '../../store/useDarktraceStore';
import { Bot, X, Send, Sparkles, Shield, ChevronRight, CornerDownLeft, Database } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  finding?: string;
  evidenceRef?: string;
  confidence?: number;
  sources?: string[];
}

export const TraceAIAssistant: React.FC = () => {
  const store = useDarktraceStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: 'Greetings, Analyst. I am TRACE AI, the analytical intelligence daemon for DARKTRACE. I can explain cross-marketplace actor correlations, stylometric clustering, and infrastructure overlaps grounded in the active synthetic intelligence graph.',
      timestamp: 'Online'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  if (!store.aiAssistantOpen) return null;

  const quickPrompts = [
    'Show all entities connected to NightFall.',
    'Why is NightFall linked to NF_Market?',
    'Show infrastructure overlaps.',
    'Summarize the evidence for Operation Eclipse.',
    'Explain attribution confidence methodology.'
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Formulate explainable response grounded in synthetic dataset
    setTimeout(() => {
      let finding = '';
      let evidenceRef = '';
      let confidence = 87;
      let sources: string[] = ['Tor Public Keyserver Index', 'Synthetic Darknet Ingest Pipeline'];
      let responseText = '';

      const queryLower = text.toLowerCase();

      if (queryLower.includes('entities connected to nightfall') || queryLower.includes('nightfall')) {
        finding = 'NightFall is centrally clustered with 9 high-confidence synthetic entities spanning Dread, SilkCore, and Genesis Underground.';
        evidenceRef = 'EVD-10482, EVD-10483, EVD-10484, EVD-10485';
        confidence = 87;
        sources = ['Dread Underground Crawler', 'SilkCore Escrow Feed', 'BTC / XMR Ledger Node'];
        responseText = 'Graph traversal resolved 3 aliases (NF_Market, EclipseVendor, 0xNightfall), 1 4096-bit PGP master signing key (0xF12C8E90), 2 Bitcoin UTXO clusters totaling 42.18 BTC, and 1 onion hidden service (eclipse-drop77.onion).';
      } else if (queryLower.includes('nf_market') || queryLower.includes('why is nightfall linked')) {
        finding = 'Direct cryptographic identity link via PGP public key subkey fingerprint overlap.';
        evidenceRef = 'EVD-10482';
        confidence = 94;
        sources = ['Tor Public Keyserver Index', 'Torrez Reborn Market Feed'];
        responseText = 'The vendor identity "NF_Market" published an RSA-4096 public key matching the exact subkeys (0x3D2C1B4A and 0x8E90F12C) created by handle "NightFall" on 2024-06-14 UTC.';
      } else if (queryLower.includes('infrastructure')) {
        finding = 'Multi-hop reverse proxy overlap discovered via self-signed TLS certificates and custom HTTP response headers.';
        evidenceRef = 'EVD-10483, EVD-10486';
        confidence = 82;
        sources = ['Darknet TLS Transparency Feed', 'Passive Descriptor Probe Daemon'];
        responseText = 'Tor hidden service eclipse-drop77.onion and clearnet host 185.220.101.44 serve the same self-signed TLS certificate (SHA256: d8f4e2a1b9c7) with custom reverse proxy header "X-Forwarded-Eclipse: ring-04".';
      } else if (queryLower.includes('operation eclipse') || queryLower.includes('evidence')) {
        finding = 'Operation Eclipse has compiled 5 verified synthetic evidence items establishing multi-disciplinary convergence.';
        evidenceRef = 'EVD-10482 through EVD-10486';
        confidence = 87;
        sources = ['Ledger Analytics Node', 'AI Persona Profiling Daemon', 'Darknet Ingest Pipeline'];
        responseText = 'Evidence spans: 1) Master PGP key match (94%), 2) Bitcoin UTXO clustering CIOH (88%), 3) Nginx proxy header reuse (86%), 4) Cross-forum NLP stylometry (84%), and 5) TLS certificate reuse (82%).';
      } else {
        finding = 'Analytical Multi-Factor Confidence Engine operates on weighted probabilistic correlation.';
        confidence = 87;
        sources = ['DARKTRACE Analytical Methodology Spec'];
        responseText = 'Attribution confidence is calculated as: PGP correlation (30%), Infrastructure reuse (25%), Wallet clustering (20%), NLP stylometry (15%), and Behavioural timing (10%). Confidence reflects observed correlation strength, not proof of real-world identity.';
      }

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: responseText,
        finding,
        evidenceRef,
        confidence,
        sources,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] bg-dark-850/95 backdrop-blur-xl border border-cyan/40 rounded-2xl shadow-2xl flex flex-col font-mono text-xs overflow-hidden select-none">
      {/* Header */}
      <div className="px-4 py-3 bg-dark-800 border-b border-dark-600 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded bg-cyan/10 border border-cyan/30 text-cyan">
            <Bot className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="font-bold text-white tracking-wide text-xs">TRACE AI</div>
            <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>SYNTHETIC CTI KNOWLEDGEBASE ACTIVE</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => store.setAiAssistantOpen(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] p-3 rounded-xl ${
                msg.sender === 'user'
                  ? 'bg-cyan/15 text-slate-100 border border-cyan/30 rounded-tr-none'
                  : 'bg-dark-750 text-slate-200 border border-dark-600 rounded-tl-none shadow-md'
              }`}
            >
              <p className="text-[11px] leading-relaxed">{msg.text}</p>

              {/* Explainable Attribution Breakdown for AI responses */}
              {msg.finding && (
                <div className="mt-2.5 pt-2 border-t border-dark-600 space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between text-cyan font-bold">
                    <span>FINDING</span>
                    <span>{msg.confidence}% CONF</span>
                  </div>
                  <div className="text-slate-300 font-sans">{msg.finding}</div>

                  {msg.evidenceRef && (
                    <div className="text-purple-300">
                      <span className="text-slate-500 mr-1">EVIDENCE:</span>
                      {msg.evidenceRef}
                    </div>
                  )}

                  {msg.sources && (
                    <div className="text-slate-400 text-[9px] flex flex-wrap gap-1 mt-1">
                      {msg.sources.map((s, i) => (
                        <span key={i} className="px-1 py-0.5 rounded bg-dark-900 border border-dark-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-dark-800/80 border-t border-dark-600 overflow-x-auto whitespace-nowrap flex space-x-1.5 scrollbar-none">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="px-2 py-1 rounded bg-dark-700 hover:bg-dark-600 text-slate-300 hover:text-cyan border border-dark-600 text-[10px] transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-dark-800 border-t border-dark-600 flex items-center space-x-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
          placeholder="Ask TRACE AI about actors, evidence, or infrastructure..."
          className="flex-1 bg-dark-900 border border-dark-600 focus:border-cyan text-white px-3 py-2 rounded-lg text-xs placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={() => handleSend(inputVal)}
          className="p-2 rounded-lg bg-cyan/20 hover:bg-cyan/30 border border-cyan text-cyan transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
