import { create } from 'zustand';
import {
  ThreatActor,
  Identifier,
  InfrastructureIndicator,
  Persona,
  Relationship,
  Evidence,
  TimelineEvent,
  IntelligenceSource,
  Investigation,
  IntelligenceStreamItem
} from '../types';
import { INITIAL_DATASET, NIGHTFALL_ACTOR, CURATED_INVESTIGATION } from '../data/syntheticDataset';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'critical';
  timestamp: string;
}

export type PerformanceMode = 'HIGH' | 'BALANCED' | 'PERFORMANCE';

interface DarktraceState {
  // Core Datasets
  actors: ThreatActor[];
  identifiers: Identifier[];
  infrastructure: InfrastructureIndicator[];
  personas: Persona[];
  relationships: Relationship[];
  evidenceList: Evidence[];
  timelineEvents: TimelineEvent[];
  sources: IntelligenceSource[];
  investigations: Investigation[];
  streamItems: IntelligenceStreamItem[];

  // Selected Entities & Context
  selectedActorId: string;
  selectedEntity: { id: string; type: string; label: string; data?: any } | null;
  selectedRelationship: Relationship | null;
  activeInvestigationId: string;

  // Visual & Presentation State
  graphMode: '2D' | '3D';
  performanceMode: PerformanceMode;
  isScanning: boolean;
  scanProgress: number;
  commandPaletteOpen: boolean;
  aiAssistantOpen: boolean;
  demoGuideStep: number | null; // null if closed, 1-7 when active
  toasts: ToastNotification[];

  // Global Filters & Search
  searchQuery: string;
  minConfidenceFilter: number;
  selectedCategoryFilter: string;
  selectedRiskFilter: string;

  // Actions
  setSelectedActorId: (id: string) => void;
  setSelectedEntity: (entity: { id: string; type: string; label: string; data?: any } | null) => void;
  setSelectedRelationship: (rel: Relationship | null) => void;
  setActiveInvestigationId: (id: string) => void;
  setGraphMode: (mode: '2D' | '3D') => void;
  setPerformanceMode: (mode: PerformanceMode) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAiAssistantOpen: (open: boolean) => void;
  setDemoGuideStep: (step: number | null) => void;
  setSearchQuery: (query: string) => void;
  setMinConfidenceFilter: (val: number) => void;
  setSelectedCategoryFilter: (cat: string) => void;
  setSelectedRiskFilter: (risk: string) => void;

  // Business Logic & Mutations
  addToast: (toast: Omit<ToastNotification, 'id' | 'timestamp'>) => void;
  removeToast: (id: string) => void;
  runAutonomousScan: () => Promise<void>;
  createInvestigation: (inv: Partial<Investigation>) => string;
  updateInvestigation: (id: string, updates: Partial<Investigation>) => void;
  addEntityToActiveInvestigation: (entityId: string, entityType: string) => void;
  addAnalystNote: (investigationId: string, content: string) => void;
  resetToNightfallDemo: () => void;
}

export const useDarktraceStore = create<DarktraceState>((set, get) => ({
  actors: INITIAL_DATASET.actors,
  identifiers: INITIAL_DATASET.identifiers,
  infrastructure: INITIAL_DATASET.infrastructure,
  personas: INITIAL_DATASET.personas,
  relationships: INITIAL_DATASET.relationships,
  evidenceList: INITIAL_DATASET.evidenceList,
  timelineEvents: INITIAL_DATASET.timelineEvents,
  sources: INITIAL_DATASET.sources,
  investigations: INITIAL_DATASET.investigations,
  streamItems: INITIAL_DATASET.streamItems,

  selectedActorId: NIGHTFALL_ACTOR.id,
  selectedEntity: { id: NIGHTFALL_ACTOR.id, type: 'actor', label: NIGHTFALL_ACTOR.name, data: NIGHTFALL_ACTOR },
  selectedRelationship: null,
  activeInvestigationId: CURATED_INVESTIGATION.id,

  graphMode: '3D',
  performanceMode: 'HIGH',
  isScanning: false,
  scanProgress: 0,
  commandPaletteOpen: false,
  aiAssistantOpen: false,
  demoGuideStep: null,
  toasts: [],

  searchQuery: '',
  minConfidenceFilter: 0,
  selectedCategoryFilter: 'ALL',
  selectedRiskFilter: 'ALL',

  setSelectedActorId: (id: string) => {
    const actor = get().actors.find(a => a.id === id);
    set({
      selectedActorId: id,
      selectedEntity: actor ? { id: actor.id, type: 'actor', label: actor.name, data: actor } : null,
      selectedRelationship: null
    });
  },

  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
  setSelectedRelationship: (rel) => set({ selectedRelationship: rel }),
  setActiveInvestigationId: (id) => set({ activeInvestigationId: id }),
  setGraphMode: (mode) => set({ graphMode: mode }),
  setPerformanceMode: (mode) => set({ performanceMode: mode }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  setAiAssistantOpen: (open) => set({ aiAssistantOpen: open }),
  setDemoGuideStep: (step) => set({ demoGuideStep: step }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setMinConfidenceFilter: (val) => set({ minConfidenceFilter: val }),
  setSelectedCategoryFilter: (cat) => set({ selectedCategoryFilter: cat }),
  setSelectedRiskFilter: (risk) => set({ selectedRiskFilter: risk }),

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastNotification = {
      ...toast,
      id,
      timestamp: new Date().toLocaleTimeString()
    };
    set(state => ({ toasts: [newToast, ...state.toasts.slice(0, 4)] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 5000);
  },

  removeToast: (id) => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },

  runAutonomousScan: async () => {
    const state = get();
    if (state.isScanning) return;

    set({ isScanning: true, scanProgress: 10 });
    state.addToast({
      title: 'Scan Initialized',
      message: 'Autonomous Intelligence Engine synchronizing 52 darknet collection daemons...',
      type: 'info'
    });

    // Simulated multi-stage progression
    await new Promise(r => setTimeout(r, 600));
    set({ scanProgress: 35 });
    
    await new Promise(r => setTimeout(r, 800));
    set({ scanProgress: 70 });

    await new Promise(r => setTimeout(r, 900));
    set({ scanProgress: 95 });

    await new Promise(r => setTimeout(r, 500));

    // Generate new synthetic discoveries
    const timestampStr = new Date().toISOString().split('T')[0];
    const newIdSuffix = Date.now().toString().slice(-4);
    
    const newInfra: InfrastructureIndicator = {
      id: `infra-auto-${newIdSuffix}`,
      indicator: `shadow-relay-node-${newIdSuffix}.onion`,
      type: 'hidden_service',
      associatedActorId: state.selectedActorId,
      actorName: state.actors.find(a => a.id === state.selectedActorId)?.name || 'NIGHTFALL',
      confidence: 89,
      firstSeen: timestampStr,
      lastSeen: timestampStr,
      status: 'ONLINE',
      details: 'Discovered during autonomous crawler sweep on Tor descriptor consensus cache.'
    };

    const newRel: Relationship = {
      id: `rel-auto-${newIdSuffix}`,
      sourceId: state.selectedActorId,
      sourceType: 'actor',
      sourceLabel: state.actors.find(a => a.id === state.selectedActorId)?.name || 'NIGHTFALL',
      targetId: newInfra.id,
      targetType: 'infrastructure',
      targetLabel: newInfra.indicator,
      relationshipType: 'INFRASTRUCTURE_OVERLAP',
      confidence: 89,
      firstObserved: timestampStr,
      lastObserved: timestampStr,
      supportingEvidence: ['EVD-10486'],
      sourceCount: 3,
      description: 'Newly resolved onion mirror using identical custom reverse proxy TLS profile.'
    };

    const newStreamItem: IntelligenceStreamItem = {
      id: `stream-auto-${newIdSuffix}`,
      timestamp: 'Just now',
      category: 'ALERT',
      message: `Autonomous scan correlated new hidden service ${newInfra.indicator} with ${newRel.sourceLabel}`,
      confidence: 89,
      actorId: state.selectedActorId,
      actorName: newRel.sourceLabel,
      severity: 'high'
    };

    const newTimelineEvent: TimelineEvent = {
      id: `ev-auto-${newIdSuffix}`,
      date: timestampStr,
      title: `Autonomous Engine Discovery: ${newInfra.indicator}`,
      description: `Passive descriptor probe linked new hidden service cluster to actor ${newRel.sourceLabel}.`,
      eventType: 'INFRASTRUCTURE_REUSE',
      actorId: state.selectedActorId,
      actorName: newRel.sourceLabel,
      confidence: 89,
      significance: 'MAJOR'
    };

    set(prev => ({
      isScanning: false,
      scanProgress: 100,
      infrastructure: [newInfra, ...prev.infrastructure],
      relationships: [newRel, ...prev.relationships],
      streamItems: [newStreamItem, ...prev.streamItems],
      timelineEvents: [newTimelineEvent, ...prev.timelineEvents]
    }));

    state.addToast({
      title: 'Autonomous Scan Complete',
      message: 'Correlated 1 new infrastructure mirror and updated threat actor relationships.',
      type: 'success'
    });
  },

  createInvestigation: (invData) => {
    const id = `inv-${Date.now().toString().slice(-6)}`;
    const newInv: Investigation = {
      id,
      title: invData.title || 'Untitled Operation',
      codename: (invData.codename || 'OPERATION UNTITLED').toUpperCase(),
      status: invData.status || 'ACTIVE',
      priority: invData.priority || 'HIGH',
      leadActorId: invData.leadActorId || get().selectedActorId,
      leadActorName: get().actors.find(a => a.id === invData.leadActorId)?.name || 'NIGHTFALL',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      summary: invData.summary || 'Custom investigation dossier created in DARKTRACE console.',
      entitiesCount: 1,
      indicatorsCount: 1,
      relationshipsCount: 1,
      overallConfidence: 85,
      associatedActors: [invData.leadActorId || get().selectedActorId],
      evidenceIds: [],
      indicatorIds: [],
      analystNotes: [
        {
          id: `note-${Date.now()}`,
          author: 'Investigative Officer [CTI-LEAD]',
          timestamp: new Date().toUTCString(),
          content: 'Case folder initialized. Synthetic threat indicators linked for analysis.'
        }
      ],
      tags: invData.tags || ['Custom Investigation', 'De-Anonymization']
    };

    set(state => ({
      investigations: [newInv, ...state.investigations],
      activeInvestigationId: id
    }));

    get().addToast({
      title: 'Investigation Initialized',
      message: `Created case folder ${newInv.codename}.`,
      type: 'success'
    });

    return id;
  },

  updateInvestigation: (id, updates) => {
    set(state => ({
      investigations: state.investigations.map(inv => inv.id === id ? { ...inv, ...updates, updatedDate: new Date().toISOString().split('T')[0] } : inv)
    }));
  },

  addEntityToActiveInvestigation: (entityId, entityType) => {
    const state = get();
    const inv = state.investigations.find(i => i.id === state.activeInvestigationId);
    if (!inv) return;

    const updated = {
      ...inv,
      entitiesCount: inv.entitiesCount + 1,
      indicatorsCount: inv.indicatorsCount + 1,
      updatedDate: new Date().toISOString().split('T')[0]
    };

    set(prev => ({
      investigations: prev.investigations.map(i => i.id === state.activeInvestigationId ? updated : i)
    }));

    state.addToast({
      title: 'Entity Linked to Case',
      message: `Added ${entityType} (${entityId}) to ${inv.codename}`,
      type: 'success'
    });
  },

  addAnalystNote: (investigationId, content) => {
    const newNote = {
      id: `note-${Date.now()}`,
      author: 'Senior Threat Analyst',
      timestamp: new Date().toUTCString(),
      content
    };

    set(state => ({
      investigations: state.investigations.map(inv => {
        if (inv.id === investigationId) {
          return {
            ...inv,
            analystNotes: [newNote, ...inv.analystNotes],
            updatedDate: new Date().toISOString().split('T')[0]
          };
        }
        return inv;
      })
    }));

    get().addToast({
      title: 'Analyst Note Appended',
      message: 'Case dossier updated successfully.',
      type: 'info'
    });
  },

  resetToNightfallDemo: () => {
    set({
      selectedActorId: NIGHTFALL_ACTOR.id,
      selectedEntity: { id: NIGHTFALL_ACTOR.id, type: 'actor', label: NIGHTFALL_ACTOR.name, data: NIGHTFALL_ACTOR },
      activeInvestigationId: CURATED_INVESTIGATION.id,
      demoGuideStep: 1
    });
  }
}));
