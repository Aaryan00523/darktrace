// DARKTRACE Intelligence Core - TypeScript Types Definition

export type EntityType = 
  | 'actor' 
  | 'handle' 
  | 'pgp' 
  | 'wallet' 
  | 'infrastructure' 
  | 'domain' 
  | 'forum' 
  | 'persona' 
  | 'certificate' 
  | 'service_banner'
  | 'evidence';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ActorStatus = 'ACTIVE' | 'DORMANT' | 'MONITORED' | 'DISRUPTED';
export type SourceReliability = 'A' | 'B' | 'C' | 'D'; // A: Highly Reliable, B: Usually Reliable, C: Fairly Reliable, D: Unreliable

export type RelationshipType = 
  | 'SAME_HANDLE' 
  | 'SAME_PGP' 
  | 'WALLET_LINK' 
  | 'INFRASTRUCTURE_OVERLAP' 
  | 'STYLE_SIMILARITY' 
  | 'BEHAVIOURAL_SIMILARITY' 
  | 'TRUST_LINK'
  | 'HOSTED_ON'
  | 'RESOLVES_TO'
  | 'ADMINISTERS';

export interface ConfidenceBreakdown {
  pgpWeight: number;        // e.g. 0.30
  pgpScore: number;         // e.g. 94%
  infraWeight: number;      // e.g. 0.25
  infraScore: number;       // e.g. 82%
  walletWeight: number;     // e.g. 0.20
  walletScore: number;      // e.g. 88%
  styleWeight: number;      // e.g. 0.15
  styleScore: number;       // e.g. 84%
  behaviourWeight: number;  // e.g. 0.10
  behaviourScore: number;   // e.g. 79%
  overallScore: number;     // Weighted average, e.g. 87%
  explanation: string;
}

export interface ThreatActor {
  id: string;
  name: string;
  primaryHandle: string;
  aliases: string[];
  status: ActorStatus;
  riskLevel: RiskLevel;
  attributionConfidence: number; // e.g. 87
  confidenceBreakdown: ConfidenceBreakdown;
  firstObserved: string;
  lastObserved: string;
  categories: string[];
  description: string;
  primaryMarketplace: string;
  associatedWallets: string[];
  associatedPGP: string[];
  associatedDomains: string[];
  associatedInfrastructure: string[];
  associatedPersonas: string[];
  evidenceIds: string[];
  investigationIds: string[];
  avatarSeed?: string;
}

export interface Identifier {
  id: string;
  type: 'handle' | 'pgp' | 'wallet' | 'email' | 'jid';
  value: string;
  associatedActorId: string;
  actorName: string;
  firstSeen: string;
  lastSeen: string;
  confidence: number;
  source: string;
  notes?: string;
  currency?: string; // For wallets (BTC, XMR)
  keyId?: string;    // For PGP
  fingerprint?: string;
}

export interface InfrastructureIndicator {
  id: string;
  indicator: string; // e.g. onion address, IP, banner hash, JA3 fingerprint
  type: 'hidden_service' | 'server_ip' | 'tls_certificate' | 'domain' | 'service_banner' | 'configuration_fingerprint';
  associatedActorId: string;
  actorName: string;
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  status: 'ONLINE' | 'INTERMITTENT' | 'OFFLINE';
  hostingProvider?: string;
  asn?: string;
  bannerSnippet?: string;
  certIssuer?: string;
  certSha256?: string;
  details: string;
}

export interface PersonaMetrics {
  stylometricSimilarity: number;
  vocabularySimilarity: number;
  writingPatternSimilarity: number;
  behaviouralSimilarity: number;
  activityTimingSimilarity: number;
  overallCorrelation: number;
  primaryLanguage: string;
  avgSentenceLength: number;
  lexicalDiversity: number;
  punctuationFrequency: {
    commas: number;
    semicolons: number;
    ellipsis: number;
  };
  keyPhrases: string[];
  activeHoursUTC: number[]; // Hours 0-23
}

export interface Persona {
  id: string;
  actorId: string;
  actorName: string;
  handle: string;
  platform: string; // e.g. 'Dread Forum', 'Genesis Underground', 'SilkCore Market'
  firstPostDate: string;
  lastPostDate: string;
  postCount: number;
  metrics: PersonaMetrics;
  spatialCoordinates: [number, number, number]; // 3D coordinates for similarity space
  aiSummary: string;
}

export interface Relationship {
  id: string;
  sourceId: string;
  sourceType: EntityType;
  sourceLabel: string;
  targetId: string;
  targetType: EntityType;
  targetLabel: string;
  relationshipType: RelationshipType;
  confidence: number;
  firstObserved: string;
  lastObserved: string;
  supportingEvidence: string[];
  sourceCount: number;
  description: string;
}

export interface Evidence {
  id: string;
  title: string;
  type: string; // e.g. 'PGP Correlation', 'Infrastructure Overlap', 'Wallet Clustering', 'Stylometric Analysis'
  confidence: number;
  observedDate: string;
  sourceId: string;
  sourceName: string;
  sourceReliability: SourceReliability;
  relatedEntities: { id: string; name: string; type: EntityType }[];
  technicalDetails: Record<string, any>;
  summary: string;
  rawSample?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  eventType: 'DISCOVERY' | 'PGP_CORRELATION' | 'WALLET_TRANSFER' | 'INFRASTRUCTURE_REUSE' | 'PERSONA_ACTIVITY' | 'MARKET_MIGRATION' | 'ATTRIBUTION_UPDATE';
  actorId: string;
  actorName: string;
  confidence: number;
  evidenceId?: string;
  significance: 'CRITICAL' | 'MAJOR' | 'MODERATE' | 'MINOR';
}

export interface IntelligenceSource {
  id: string;
  name: string;
  type: 'MARKETPLACE' | 'DARKNET_FORUM' | 'BLOCKCHAIN_LEDGER' | 'TELEGRAM_CHANNEL' | 'CERT_TRANSPARENCY' | 'INFRASTRUCTURE_PROBE';
  reliability: SourceReliability;
  indicatorsCount: number;
  lastCollection: string;
  status: 'ONLINE' | 'DEGRADED' | 'RATE_LIMITED';
  feedFrequency: string;
  description: string;
}

export interface Investigation {
  id: string;
  title: string;
  codename: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'PENDING_REVIEW' | 'CLOSED';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  leadActorId: string;
  leadActorName: string;
  createdDate: string;
  updatedDate: string;
  summary: string;
  entitiesCount: number;
  indicatorsCount: number;
  relationshipsCount: number;
  overallConfidence: number;
  associatedActors: string[];
  evidenceIds: string[];
  indicatorIds: string[];
  analystNotes: {
    id: string;
    author: string;
    timestamp: string;
    content: string;
  }[];
  tags: string[];
}

export interface IntelligenceStreamItem {
  id: string;
  timestamp: string;
  category: 'INDICATOR' | 'RELATIONSHIP' | 'CORRELATION' | 'ALERT';
  message: string;
  confidence?: number;
  actorId?: string;
  actorName?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
