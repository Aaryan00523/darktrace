// DARKTRACE Synthetic Intelligence Dataset Generator & Repository
// 100% Synthetic Data for Lawful Threat Intelligence Demonstration

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

// ==========================================
// 1. CURATED CORE SCENARIO: NIGHTFALL
// ==========================================

export const NIGHTFALL_ACTOR: ThreatActor = {
  id: 'actor-nightfall',
  name: 'NIGHTFALL',
  primaryHandle: 'NightFall',
  aliases: ['NightFall', 'NF_Market', 'EclipseVendor', '0xNightfall', 'ShadowFall_Ops'],
  status: 'ACTIVE',
  riskLevel: 'HIGH',
  attributionConfidence: 87,
  confidenceBreakdown: {
    pgpWeight: 0.30,
    pgpScore: 94,
    infraWeight: 0.25,
    infraScore: 82,
    walletWeight: 0.20,
    walletScore: 88,
    styleWeight: 0.15,
    styleScore: 84,
    behaviourWeight: 0.10,
    behaviourScore: 79,
    overallScore: 87,
    explanation: 'High cross-marketplace convergence observed across subkey signing routines, shared TLS certificate SHA256 hashes, direct UTXO clustering on Bitcoin and Monero mix gateways, and consistent Russian-English phonetic transliteration patterns.'
  },
  firstObserved: '2024-06-14',
  lastObserved: '2026-09-28',
  categories: ['Credential Trading', 'Data Theft', 'Fraud', 'Darknet Escrow'],
  description: 'Prolific cyber-threat actor operating across Tor hidden services and encrypted forums since mid-2024. Specializes in industrial corporate credential caches and financial access broker services. Key operational hallmark includes rapid migration across marketplace mirrors using shared cryptographic credentials.',
  primaryMarketplace: 'Torrez Reborn / Eclipse Underground',
  associatedWallets: [
    'bc1q9x402mzl4pwe9j38y0zkv5n297m44qklst',
    'bc1q7wre482k390xlmv78fhe04kln3d9402lks',
    '888tNk48BvP7X8eY2W3Q9mZ4L1vC8K7J2G4H3D9S6F5A'
  ],
  associatedPGP: [
    '7A9F 48B2 C3E1 99D4 0A1B 5E8F 3D2C 1B4A 8E90 F12C',
    '3D2C 1B4A 8E90 F12C 7A9F 48B2 C3E1 99D4 0A1B 5E8F'
  ],
  associatedDomains: [
    'eclipse-drop77.onion',
    'nightfall-vault.i2p',
    'nf-escrow-secure.top',
    'shadowfall-relay.is'
  ],
  associatedInfrastructure: [
    'infra-nf-cert-01',
    'infra-nf-banner-02',
    'infra-nf-hs-01',
    'infra-nf-ip-01'
  ],
  associatedPersonas: [
    'persona-nightfall-dread',
    'persona-nfmarket-silk',
    'persona-eclipsevendor-genesis'
  ],
  evidenceIds: [
    'EVD-10482',
    'EVD-10483',
    'EVD-10484',
    'EVD-10485',
    'EVD-10486'
  ],
  investigationIds: ['inv-eclipse-01']
};

export const SHADOW_MERCHANT_ACTOR: ThreatActor = {
  id: 'actor-shadow-merchant',
  name: 'SHADOW MERCHANT',
  primaryHandle: 'ShadowMerchant',
  aliases: ['Shadow_M', 'VesperBroker', 'SilkTrader99'],
  status: 'ACTIVE',
  riskLevel: 'CRITICAL',
  attributionConfidence: 83,
  confidenceBreakdown: {
    pgpWeight: 0.30,
    pgpScore: 91,
    infraWeight: 0.25,
    infraScore: 78,
    walletWeight: 0.20,
    walletScore: 85,
    styleWeight: 0.15,
    styleScore: 81,
    behaviourWeight: 0.10,
    behaviourScore: 76,
    overallScore: 83,
    explanation: 'Cross-forum PGP public key re-upload with identical key expiration parameters and overlapping Wasabi wallet CoinJoin patterns.'
  },
  firstObserved: '2024-02-19',
  lastObserved: '2026-09-25',
  categories: ['Zero-Day Brokering', 'Ransomware Access', 'Network Intrusion'],
  description: 'High-tier initial access broker and exploit vendor operating within restricted Russian-language cyber underground forums.',
  primaryMarketplace: 'Exploit.in / XSS.is mirror',
  associatedWallets: ['bc1qm8x04928fje4892ld91k0d01kf384kflw019ls'],
  associatedPGP: ['9B1E 33C4 88D9 12A0 44F1 77B2 99E3 55A1 22C4 77F0'],
  associatedDomains: ['vesper-gateway.onion'],
  associatedInfrastructure: ['infra-sm-ip-01', 'infra-sm-cert-01'],
  associatedPersonas: ['persona-sm-dread', 'persona-sm-xss'],
  evidenceIds: ['EVD-20101', 'EVD-20102'],
  investigationIds: ['inv-shadow-02']
};

export const ORBITAL_FOX_ACTOR: ThreatActor = {
  id: 'actor-orbital-fox',
  name: 'ORBITAL FOX',
  primaryHandle: 'OrbitalFox',
  aliases: ['Fox_Orbit', 'AeroKits', 'VulpineOps'],
  status: 'MONITORED',
  riskLevel: 'MEDIUM',
  attributionConfidence: 78,
  confidenceBreakdown: {
    pgpWeight: 0.30,
    pgpScore: 82,
    infraWeight: 0.25,
    infraScore: 79,
    walletWeight: 0.20,
    walletScore: 74,
    styleWeight: 0.15,
    styleScore: 76,
    behaviourWeight: 0.10,
    behaviourScore: 80,
    overallScore: 78,
    explanation: 'Reused custom Nginx TLS headers on Tor gateway and recurrent PGP signature headers containing custom commentary.'
  },
  firstObserved: '2024-09-02',
  lastObserved: '2026-09-22',
  categories: ['Phishing Kits', 'Bulletproof Hosting', 'SIM Swapping'],
  description: 'Infrastructure supplier providing automated bulletproof reverse proxy configurations to multiple darknet fraud rings.',
  primaryMarketplace: 'Dread / BreachForums v3',
  associatedWallets: ['bc1q74m83jfe9201948mzlke923kdlsk493ldkw019'],
  associatedPGP: ['4A8F 99B1 00C2 33E4 55F6 77A8 11B2 44C5 88D9 00E1'],
  associatedDomains: ['fox-proxy-nodes.onion'],
  associatedInfrastructure: ['infra-of-ip-01', 'infra-of-hs-01'],
  associatedPersonas: ['persona-of-dread'],
  evidenceIds: ['EVD-30111'],
  investigationIds: ['inv-orbital-03']
};

// ==========================================
// 2. CURATED EVIDENCE RECORDS
// ==========================================

export const CURATED_EVIDENCE: Evidence[] = [
  {
    id: 'EVD-10482',
    title: 'Synthetic PGP Key Fingerprint Overlap',
    type: 'PGP Correlation',
    confidence: 94,
    observedDate: '2026-09-18',
    sourceId: 'src-darknet-keyserver',
    sourceName: 'Tor Public Keyserver Index',
    sourceReliability: 'A',
    relatedEntities: [
      { id: 'actor-nightfall', name: 'NIGHTFALL', type: 'actor' },
      { id: 'ident-pgp-01', name: '7A9F 48B2 C3E1 99D4', type: 'pgp' },
      { id: 'ident-handle-02', name: 'NF_Market', type: 'handle' }
    ],
    technicalDetails: {
      keyId: '0xF12C8E90',
      fingerprint: '7A9F 48B2 C3E1 99D4 0A1B 5E8F 3D2C 1B4A 8E90 F12C',
      keyAlgorithm: 'RSA 4096 / GnuPG v2.2.4',
      creationTimestamp: '1718371200 (2024-06-14 UTC)',
      sharedSubkeys: ['0x3D2C1B4A', '0x8E90F12C'],
      signatureComment: 'Synthetic Verification Key - Eclipse Relay Ring'
    },
    summary: 'The primary PGP public key used by handle "NightFall" on Dread Forum exactly matches the vendor key posted by "NF_Market" on Torrez Reborn, including creation timestamps and subkey signing fingerprints.'
  },
  {
    id: 'EVD-10483',
    title: 'Self-Signed TLS Certificate Fingerprint SHA256 Match',
    type: 'Infrastructure Overlap',
    confidence: 82,
    observedDate: '2026-09-21',
    sourceId: 'src-infra-scanner',
    sourceName: 'Synthetic Darknet Ingest Pipeline',
    sourceReliability: 'B',
    relatedEntities: [
      { id: 'actor-nightfall', name: 'NIGHTFALL', type: 'actor' },
      { id: 'infra-nf-cert-01', name: 'SHA256: d8f4e2a1b9c7', type: 'certificate' },
      { id: 'infra-nf-hs-01', name: 'eclipse-drop77.onion', type: 'infrastructure' }
    ],
    technicalDetails: {
      sha256: 'd8f4e2a1b9c7882e3f4a10c8e2b9d4f1a2c3e4b5d6e7f8a9b0c1d2e3f4a5b6c7',
      commonName: 'internal.eclipse-drop.local',
      serialNumber: '0x4F8A90B12C',
      validity: '2024-05-10 to 2034-05-10',
      exposedPorts: [8443, 9001],
      bannerFingerprint: 'OpenSSL 3.0.8 Debian 12 (Bookworm)'
    },
    summary: 'A self-signed TLS certificate previously discovered during service fingerprinting of an administrative hidden service was observed active on a clearnet relay server linked to EclipseVendor.'
  },
  {
    id: 'EVD-10484',
    title: 'Shared UTXO Cluster & Monero Mix Bridge Link',
    type: 'Wallet Clustering',
    confidence: 88,
    observedDate: '2026-09-12',
    sourceId: 'src-blockchain-indexer',
    sourceName: 'Ledger Analytics Node',
    sourceReliability: 'A',
    relatedEntities: [
      { id: 'actor-nightfall', name: 'NIGHTFALL', type: 'actor' },
      { id: 'ident-wallet-01', name: 'bc1q9x402mzl4pwe9j38y0zkv5n297m44qklst', type: 'wallet' },
      { id: 'ident-wallet-02', name: 'bc1q7wre482k390xlmv78fhe04kln3d9402lks', type: 'wallet' }
    ],
    technicalDetails: {
      clusteringHeuristic: 'Common Input Ownership (CIOH)',
      hopCount: 2,
      totalVolumeBtc: 42.18,
      sharedDepositAddresses: 4,
      mixerEndpoint: 'Synthetic Wasabi Bridge v2'
    },
    summary: 'Direct transaction inputs link payout addresses of "EclipseVendor" to wallet deposit nodes administered by "NightFall", confirmed across 14 multi-input transactions.'
  },
  {
    id: 'EVD-10485',
    title: 'Cross-Forum Stylometric & Stylistic Convergence',
    type: 'Stylometric Analysis',
    confidence: 84,
    observedDate: '2026-09-24',
    sourceId: 'src-persona-engine',
    sourceName: 'AI Persona Profiling Daemon',
    sourceReliability: 'B',
    relatedEntities: [
      { id: 'actor-nightfall', name: 'NIGHTFALL', type: 'actor' },
      { id: 'persona-nightfall-dread', name: 'NightFall (Dread)', type: 'persona' },
      { id: 'persona-eclipsevendor-genesis', name: 'EclipseVendor (Genesis)', type: 'persona' }
    ],
    technicalDetails: {
      cosineSimilarity: 0.884,
      jaccardVocabulary: 0.792,
      sentenceLengthVariance: '± 2.4 words',
      frequentNgrams: ['instant escrow release', 'clean dumps no dupes', 'pgp signed proofs'],
      activeTimeWindowUTC: '18:00 - 02:00'
    },
    summary: 'Deep linguistic stylometry shows 88% writing pattern consistency, matching idiosyncratic punctuation spacing and identical technical jargon across forum posts.'
  },
  {
    id: 'EVD-10486',
    title: 'Shared Nginx Reverse Proxy Header Disclosures',
    type: 'Infrastructure Fingerprint Overlap',
    confidence: 86,
    observedDate: '2026-09-26',
    sourceId: 'src-infra-scanner',
    sourceName: 'Synthetic Darknet Ingest Pipeline',
    sourceReliability: 'A',
    relatedEntities: [
      { id: 'actor-nightfall', name: 'NIGHTFALL', type: 'actor' },
      { id: 'infra-nf-banner-02', name: 'Nginx Custom Headers', type: 'service_banner' }
    ],
    technicalDetails: {
      customHeader: 'X-Forwarded-Eclipse: ring-04',
      serverToken: 'nginx/1.22.1-custom-mod',
      tcpWindowSize: 64240,
      timestampOption: 'TCP Timestamp Disabled'
    },
    summary: 'Disclosed diagnostic HTTP response headers on three different onion services revealed identical staging backend identifiers and TCP stack options.'
  }
];

// ==========================================
// 3. CURATED PERSONA SCENARIOS
// ==========================================

export const CURATED_PERSONAS: Persona[] = [
  {
    id: 'persona-nightfall-dread',
    actorId: 'actor-nightfall',
    actorName: 'NIGHTFALL',
    handle: 'NightFall',
    platform: 'Dread Underground Forum',
    firstPostDate: '2024-06-15',
    lastPostDate: '2026-09-27',
    postCount: 342,
    metrics: {
      stylometricSimilarity: 88,
      vocabularySimilarity: 82,
      writingPatternSimilarity: 91,
      behaviouralSimilarity: 85,
      activityTimingSimilarity: 84,
      overallCorrelation: 88,
      primaryLanguage: 'English (Russian syntax traits)',
      avgSentenceLength: 14.8,
      lexicalDiversity: 0.74,
      punctuationFrequency: {
        commas: 0.042,
        semicolons: 0.008,
        ellipsis: 0.021
      },
      keyPhrases: ['escrow release within 24h', 'clean logs full capture', 'pgp signature attached', 'verify fingerprint before transfer'],
      activeHoursUTC: [18, 19, 20, 21, 22, 23, 0, 1]
    },
    spatialCoordinates: [1.2, 0.8, -0.4],
    aiSummary: 'Technical, brief, highly security-conscious posting style. Consistently uses dual-newline delimiters before PGP blocks and idiosyncratic spaced dashes (" - "). Active primarily between 18:00 and 02:00 UTC.'
  },
  {
    id: 'persona-nfmarket-silk',
    actorId: 'actor-nightfall',
    actorName: 'NIGHTFALL',
    handle: 'NF_Market',
    platform: 'SilkCore Escrow Market',
    firstPostDate: '2024-11-04',
    lastPostDate: '2026-09-24',
    postCount: 189,
    metrics: {
      stylometricSimilarity: 86,
      vocabularySimilarity: 84,
      writingPatternSimilarity: 87,
      behaviouralSimilarity: 88,
      activityTimingSimilarity: 81,
      overallCorrelation: 87,
      primaryLanguage: 'English',
      avgSentenceLength: 15.2,
      lexicalDiversity: 0.71,
      punctuationFrequency: {
        commas: 0.039,
        semicolons: 0.006,
        ellipsis: 0.019
      },
      keyPhrases: ['verified tier 1 seller', 'auto-dispatch escrow', 'disputes handled in ticket', 'btc and xmr only'],
      activeHoursUTC: [17, 18, 19, 20, 21, 22, 23]
    },
    spatialCoordinates: [1.5, 0.6, -0.3],
    aiSummary: 'Vendor-oriented persona maintaining customer support channels. Strong linguistic continuity with Dread handle, sharing the exact same product naming taxonomy and auto-responder formatting.'
  },
  {
    id: 'persona-eclipsevendor-genesis',
    actorId: 'actor-nightfall',
    actorName: 'NIGHTFALL',
    handle: 'EclipseVendor',
    platform: 'Genesis Underground Relay',
    firstPostDate: '2025-03-12',
    lastPostDate: '2026-09-28',
    postCount: 276,
    metrics: {
      stylometricSimilarity: 84,
      vocabularySimilarity: 79,
      writingPatternSimilarity: 88,
      behaviouralSimilarity: 81,
      activityTimingSimilarity: 74,
      overallCorrelation: 86,
      primaryLanguage: 'English / Russian',
      avgSentenceLength: 13.9,
      lexicalDiversity: 0.68,
      punctuationFrequency: {
        commas: 0.045,
        semicolons: 0.005,
        ellipsis: 0.024
      },
      keyPhrases: ['bulk dumps verified', 'escrow via admin', 'no timewasters', 'sub-24h support response'],
      activeHoursUTC: [19, 20, 21, 22, 23, 0, 1, 2]
    },
    spatialCoordinates: [1.1, 1.1, -0.6],
    aiSummary: 'High-volume trading persona with identical timezone activity spikes (19:00 - 02:00 UTC). Displays high confidence linguistic matching on specialized jargon and dispute resolution arguments.'
  }
];

// ==========================================
// 4. CURATED INVESTIGATION SCENARIO
// ==========================================

export const CURATED_INVESTIGATION: Investigation = {
  id: 'inv-eclipse-01',
  title: 'Operation Eclipse: NightFall Syndicate De-Anonymization',
  codename: 'OPERATION ECLIPSE',
  status: 'ACTIVE',
  priority: 'HIGH',
  leadActorId: 'actor-nightfall',
  leadActorName: 'NIGHTFALL',
  createdDate: '2026-04-12',
  updatedDate: '2026-09-28',
  summary: 'In-depth multi-source intelligence operation targeting the NightFall cyber syndicate. Cross-correlates Tor hidden service infrastructure, Dread forum handles, vendor accounts on SilkCore, self-signed TLS certificates, and cryptocurrency money laundering flows.',
  entitiesCount: 14,
  indicatorsCount: 32,
  relationshipsCount: 18,
  overallConfidence: 87,
  associatedActors: ['actor-nightfall'],
  evidenceIds: ['EVD-10482', 'EVD-10483', 'EVD-10484', 'EVD-10485', 'EVD-10486'],
  indicatorIds: ['infra-nf-cert-01', 'infra-nf-banner-02', 'infra-nf-hs-01', 'infra-nf-ip-01'],
  analystNotes: [
    {
      id: 'note-01',
      author: 'Senior CTI Analyst [AN-482]',
      timestamp: '2026-09-21 14:32 UTC',
      content: 'Certificate fingerprint SHA256 d8f4e2a1b9c7 confirmed present on clearnet port 8443 of relay host 185.220.101.44. This directly bridges the synthetic onion gateway to known hosting infrastructure.'
    },
    {
      id: 'note-02',
      author: 'Financial Forensics Lead [AN-109]',
      timestamp: '2026-09-24 09:15 UTC',
      content: 'Clustered 42.18 BTC across 14 multi-input transactions linking EclipseVendor escrow payouts to NightFall cold storage address bc1q9x402mzl4pwe9j38y0zkv5n297m44qklst.'
    },
    {
      id: 'note-03',
      author: 'NLP & Stylometry Specialist [AN-731]',
      timestamp: '2026-09-27 16:50 UTC',
      content: 'AI persona comparison between "NightFall" and "EclipseVendor" confirms 86% correlation index. Punctuation cadence, rare jargon collocations, and UTC activity envelopes are statistically indistinguishable.'
    }
  ],
  tags: ['Dark Web', 'Escrow', 'Credential Theft', 'Tor Hidden Services', 'Cryptocurrency Tracking', 'Stylometry']
};

// ==========================================
// 5. INTELLIGENCE SOURCES (50+ REQUIRED)
// ==========================================

export const BASE_INTELLIGENCE_SOURCES: IntelligenceSource[] = [
  { id: 'src-dread-forum', name: 'Dread Underground Forum Crawler', type: 'DARKNET_FORUM', reliability: 'A', indicatorsCount: 420, lastCollection: '12m ago', status: 'ONLINE', feedFrequency: 'Every 15m', description: 'Monitors public discussion, vendor PGP announcements, and rep threads.' },
  { id: 'src-torrez-market', name: 'Torrez Reborn Market Feed', type: 'MARKETPLACE', reliability: 'B', indicatorsCount: 310, lastCollection: '8m ago', status: 'ONLINE', feedFrequency: 'Every 30m', description: 'Tracks marketplace listings, vendor deposit addresses, and feedback profiles.' },
  { id: 'src-genesis-relay', name: 'Genesis Underground Stream', type: 'DARKNET_FORUM', reliability: 'A', indicatorsCount: 285, lastCollection: '24m ago', status: 'ONLINE', feedFrequency: 'Every 20m', description: 'Monitors invite-only access broker subforums and credential trade threads.' },
  { id: 'src-cert-stream', name: 'Darknet TLS Transparency Feed', type: 'CERT_TRANSPARENCY', reliability: 'A', indicatorsCount: 195, lastCollection: '3m ago', status: 'ONLINE', feedFrequency: 'Realtime', description: 'Correlates self-signed certificates across Tor onion relays and clearnet edges.' },
  { id: 'src-blockchain-indexer', name: 'BTC / XMR UTXO Cluster Indexer', type: 'BLOCKCHAIN_LEDGER', reliability: 'A', indicatorsCount: 540, lastCollection: '5m ago', status: 'ONLINE', feedFrequency: 'Realtime Block Sync', description: 'Applies Common Input Ownership Heuristics (CIOH) to darknet transactions.' },
  { id: 'src-darknet-keyserver', name: 'Tor Public Keyserver Index', type: 'PUBLIC_SOURCES' as any, reliability: 'A', indicatorsCount: 160, lastCollection: '1h ago', status: 'ONLINE', feedFrequency: 'Hourly', description: 'Archive of PGP public key asc uploads, revokers, and subkey signing records.' },
  { id: 'src-telegram-intel', name: 'Underground Telegram Channel Monitor', type: 'TELEGRAM_CHANNEL', reliability: 'B', indicatorsCount: 220, lastCollection: '18m ago', status: 'ONLINE', feedFrequency: 'Continuous Stream', description: 'Scrapes darknet escrow announcements, leak sample hashes, and contact JIDs.' },
  { id: 'src-infra-probe-eu', name: 'Tor Active Probe Daemon (EU-North)', type: 'INFRASTRUCTURE_PROBE', reliability: 'A', indicatorsCount: 340, lastCollection: '2m ago', status: 'ONLINE', feedFrequency: 'Every 5m', description: 'Performs passive descriptor verification and service banner fingerprinting.' }
];

// Generate up to 52 sources to comfortably surpass 50
export const GENERATED_SOURCES: IntelligenceSource[] = [
  ...BASE_INTELLIGENCE_SOURCES,
  ...Array.from({ length: 44 }).map((_, i) => {
    const id = `src-gen-${i + 9}`;
    const types: IntelligenceSource['type'][] = ['MARKETPLACE', 'DARKNET_FORUM', 'BLOCKCHAIN_LEDGER', 'TELEGRAM_CHANNEL', 'CERT_TRANSPARENCY', 'INFRASTRUCTURE_PROBE'];
    const reliabilities: IntelligenceSource['reliability'][] = ['A', 'B', 'B', 'A', 'C', 'B'];
    const chosenType = types[i % types.length];
    return {
      id,
      name: `Collector Node [${chosenType}_${(i + 10).toString(16).toUpperCase()}]`,
      type: chosenType,
      reliability: reliabilities[i % reliabilities.length],
      indicatorsCount: 120 + (i * 17) % 350,
      lastCollection: `${(i % 55) + 2}m ago`,
      status: (i % 19 === 0 ? 'DEGRADED' : 'ONLINE') as IntelligenceSource['status'],
      feedFrequency: 'Every 15m',
      description: `Autonomous synthetic collector monitoring regional ${chosenType.toLowerCase().replace('_', ' ')} indicators.`
    };
  })
];

// ==========================================
// 6. SYNTHETIC ACTOR GENERATION (>= 100 ACTORS)
// ==========================================

const ACTOR_NAME_PREFIXES = ['CYBER', 'SHADOW', 'NEO', 'PHANTOM', 'ZERO', 'VIPER', 'NEXUS', 'ONYX', 'AERO', 'SPECTRE', 'KRONOS', 'VALKYRIE', 'IRON', 'TITAN', 'DARK', 'VOID', 'CRYPTO', 'ROGUE', 'SILVER', 'RAVEN'];
const ACTOR_NAME_SUFFIXES = ['SYNDICATE', 'BROKER', 'PROTOCOL', 'OPERATIVE', 'MERCHANT', 'VAULT', 'NETWORK', 'COLLECTIVE', 'PHREAK', 'PACKET', 'CELL', 'FORGE', 'SHADOW', 'NINJA', 'HUNTER', 'CORP', 'ROOT', 'VENDOR', 'DEV', 'PROXY'];

const CATEGORIES_POOL = [
  'Ransomware Access Broker', 'Credential Trading', 'Credit Card Fraud', 'Exploit Development',
  'Bulletproof Hosting', 'Cryptocurrency Laundering', 'Botnet Infrastructure', 'SIM Swapping',
  'Data Theft & Extortion', 'Counterfeit Documents', 'Phishing Infrastructure', 'DDoS For Hire'
];

export function generateSyntheticDataset() {
  const actors: ThreatActor[] = [NIGHTFALL_ACTOR, SHADOW_MERCHANT_ACTOR, ORBITAL_FOX_ACTOR];
  const identifiers: Identifier[] = [];
  const infrastructure: InfrastructureIndicator[] = [];
  const personas: Persona[] = [...CURATED_PERSONAS];
  const relationships: Relationship[] = [];
  const evidenceList: Evidence[] = [...CURATED_EVIDENCE];
  const timelineEvents: TimelineEvent[] = [];
  const streamItems: IntelligenceStreamItem[] = [];

  // Add Nightfall indicators
  identifiers.push(
    { id: 'ident-handle-01', type: 'handle', value: 'NightFall', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2024-06-14', lastSeen: '2026-09-28', confidence: 98, source: 'Dread Forum Ingest' },
    { id: 'ident-handle-02', type: 'handle', value: 'NF_Market', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2024-11-04', lastSeen: '2026-09-24', confidence: 91, source: 'SilkCore Market Feed' },
    { id: 'ident-handle-03', type: 'handle', value: 'EclipseVendor', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2025-03-12', lastSeen: '2026-09-28', confidence: 89, source: 'Genesis Underground' },
    { id: 'ident-pgp-01', type: 'pgp', value: '7A9F 48B2 C3E1 99D4 0A1B 5E8F 3D2C 1B4A 8E90 F12C', keyId: '0xF12C8E90', fingerprint: '7A9F 48B2 C3E1 99D4 0A1B 5E8F 3D2C 1B4A 8E90 F12C', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2024-06-14', lastSeen: '2026-09-28', confidence: 95, source: 'Tor Keyserver' },
    { id: 'ident-wallet-01', type: 'wallet', value: 'bc1q9x402mzl4pwe9j38y0zkv5n297m44qklst', currency: 'BTC', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2024-08-20', lastSeen: '2026-09-26', confidence: 92, source: 'BTC Ledger Indexer' },
    { id: 'ident-wallet-02', type: 'wallet', value: 'bc1q7wre482k390xlmv78fhe04kln3d9402lks', currency: 'BTC', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2025-02-11', lastSeen: '2026-09-18', confidence: 88, source: 'BTC Ledger Indexer' },
    { id: 'ident-wallet-03', type: 'wallet', value: '888tNk48BvP7X8eY2W3Q9mZ4L1vC8K7J2G4H3D9S6F5A', currency: 'XMR', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', firstSeen: '2025-05-30', lastSeen: '2026-09-27', confidence: 85, source: 'Monero Relay Node' }
  );

  infrastructure.push(
    { id: 'infra-nf-hs-01', indicator: 'eclipse-drop77.onion', type: 'hidden_service', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 94, firstSeen: '2024-07-02', lastSeen: '2026-09-28', status: 'ONLINE', details: 'Tor v3 Onion hidden service hosting private escrow and credential drop portal.' },
    { id: 'infra-nf-cert-01', indicator: 'SHA256: d8f4e2a1b9c7', type: 'tls_certificate', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 82, firstSeen: '2024-07-15', lastSeen: '2026-09-21', status: 'ONLINE', certSha256: 'd8f4e2a1b9c7882e3f4a10c8e2b9d4f1a2c3e4b5d6e7f8a9b0c1d2e3f4a5b6c7', certIssuer: 'CN=internal.eclipse-drop.local', details: 'Self-signed TLS certificate observed on clearnet relay port 8443.' },
    { id: 'infra-nf-banner-02', indicator: 'X-Forwarded-Eclipse: ring-04', type: 'service_banner', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 86, firstSeen: '2024-09-10', lastSeen: '2026-09-26', status: 'ONLINE', bannerSnippet: 'Server: nginx/1.22.1-custom-mod; X-Forwarded-Eclipse: ring-04', details: 'Custom diagnostic response headers emitted by reverse proxy.' },
    { id: 'infra-nf-ip-01', indicator: '185.220.101.44', type: 'server_ip', associatedActorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 81, firstSeen: '2024-10-05', lastSeen: '2026-09-27', status: 'ONLINE', hostingProvider: 'Frantech Solutions / BuyVM', asn: 'AS53667', details: 'Backend gateway host terminating encrypted WebSocket traffic.' }
  );

  // Key Nightfall Relationships for 3D showcase
  relationships.push(
    { id: 'rel-nf-01', sourceId: 'actor-nightfall', sourceType: 'actor', sourceLabel: 'NIGHTFALL', targetId: 'ident-handle-02', targetType: 'handle', targetLabel: 'NF_Market', relationshipType: 'SAME_HANDLE', confidence: 91, firstObserved: '2024-11-04', lastObserved: '2026-09-24', supportingEvidence: ['EVD-10482', 'EVD-10485'], sourceCount: 5, description: 'Direct handle abbreviation with matching PGP verification' },
    { id: 'rel-nf-02', sourceId: 'actor-nightfall', sourceType: 'actor', sourceLabel: 'NIGHTFALL', targetId: 'ident-handle-03', targetType: 'handle', targetLabel: 'EclipseVendor', relationshipType: 'TRUST_LINK', confidence: 89, firstObserved: '2025-03-12', lastObserved: '2026-09-28', supportingEvidence: ['EVD-10484', 'EVD-10485'], sourceCount: 4, description: 'Vendor identity operating on Genesis with linked escrow deposits' },
    { id: 'rel-nf-03', sourceId: 'actor-nightfall', sourceType: 'actor', sourceLabel: 'NIGHTFALL', targetId: 'ident-pgp-01', targetType: 'pgp', targetLabel: 'PGP: 7A9F 48B2', relationshipType: 'SAME_PGP', confidence: 95, firstObserved: '2024-06-14', lastObserved: '2026-09-28', supportingEvidence: ['EVD-10482'], sourceCount: 6, description: 'Primary 4096-bit master signing key' },
    { id: 'rel-nf-04', sourceId: 'actor-nightfall', sourceType: 'actor', sourceLabel: 'NIGHTFALL', targetId: 'ident-wallet-01', targetType: 'wallet', targetLabel: 'BTC: bc1q9x402m', relationshipType: 'WALLET_LINK', confidence: 92, firstObserved: '2024-08-20', lastObserved: '2026-09-26', supportingEvidence: ['EVD-10484'], sourceCount: 4, description: 'Primary escrow payout cluster address' },
    { id: 'rel-nf-05', sourceId: 'actor-nightfall', sourceType: 'actor', sourceLabel: 'NIGHTFALL', targetId: 'infra-nf-hs-01', targetType: 'infrastructure', targetLabel: 'eclipse-drop77.onion', relationshipType: 'ADMINISTERS', confidence: 94, firstObserved: '2024-07-02', lastObserved: '2026-09-28', supportingEvidence: ['EVD-10483'], sourceCount: 3, description: 'Authoritative administrative hidden service' },
    { id: 'rel-nf-06', sourceId: 'infra-nf-hs-01', sourceType: 'infrastructure', sourceLabel: 'eclipse-drop77.onion', targetId: 'infra-nf-cert-01', targetType: 'certificate', targetLabel: 'Cert: d8f4e2a1b9', relationshipType: 'INFRASTRUCTURE_OVERLAP', confidence: 82, firstObserved: '2024-07-15', lastObserved: '2026-09-21', supportingEvidence: ['EVD-10483'], sourceCount: 3, description: 'TLS certificate served across onion and clearnet edges' },
    { id: 'rel-nf-07', sourceId: 'infra-nf-cert-01', sourceType: 'certificate', sourceLabel: 'Cert: d8f4e2a1b9', targetId: 'infra-nf-ip-01', targetType: 'infrastructure', targetLabel: 'IP: 185.220.101.44', relationshipType: 'HOSTED_ON', confidence: 81, firstObserved: '2024-10-05', lastObserved: '2026-09-27', supportingEvidence: ['EVD-10483'], sourceCount: 4, description: 'Relay server hosting the certificate endpoint' },
    { id: 'rel-nf-08', sourceId: 'actor-nightfall', sourceType: 'actor', sourceLabel: 'NIGHTFALL', targetId: 'persona-nightfall-dread', targetType: 'persona', targetLabel: 'Persona: Dread', relationshipType: 'STYLE_SIMILARITY', confidence: 88, firstObserved: '2024-06-15', lastObserved: '2026-09-27', supportingEvidence: ['EVD-10485'], sourceCount: 5, description: 'Stylometric and cadence match' },
    { id: 'rel-nf-09', sourceId: 'persona-nightfall-dread', sourceType: 'persona', sourceLabel: 'Persona: Dread', targetId: 'persona-eclipsevendor-genesis', targetType: 'persona', targetLabel: 'Persona: Genesis', relationshipType: 'BEHAVIOURAL_SIMILARITY', confidence: 86, firstObserved: '2025-03-12', lastObserved: '2026-09-28', supportingEvidence: ['EVD-10485'], sourceCount: 4, description: 'Cross-platform stylometric convergence' }
  );

  // Generate Remaining Actors to reach 128 (Surpassing the 100 minimum)
  const totalActorsTarget = 128;
  for (let i = 3; i < totalActorsTarget; i++) {
    const pIndex = (i * 7) % ACTOR_NAME_PREFIXES.length;
    const sIndex = (i * 13) % ACTOR_NAME_SUFFIXES.length;
    const name = `${ACTOR_NAME_PREFIXES[pIndex]} ${ACTOR_NAME_SUFFIXES[sIndex]}_${(i * 3) % 99 + 1}`;
    const primaryHandle = name.replace(/\s+/g, '_').toLowerCase();
    const id = `actor-syn-${i}`;

    const riskLevel: ThreatActor['riskLevel'] = i % 5 === 0 ? 'CRITICAL' : i % 3 === 0 ? 'HIGH' : i % 2 === 0 ? 'MEDIUM' : 'LOW';
    const status: ThreatActor['status'] = i % 8 === 0 ? 'DORMANT' : i % 12 === 0 ? 'DISRUPTED' : 'ACTIVE';
    const confidence = 65 + ((i * 17) % 31); // 65% to 95%

    const cat1 = CATEGORIES_POOL[i % CATEGORIES_POOL.length];
    const cat2 = CATEGORIES_POOL[(i + 3) % CATEGORIES_POOL.length];

    const actorWallets = [`bc1q${Math.random().toString(36).substring(2, 10)}${i}wlkz89`];
    const actorPGP = [`${(1000 + i * 17).toString(16).toUpperCase()} ${(2000 + i * 19).toString(16).toUpperCase()} ${(3000 + i * 23).toString(16).toUpperCase()} ${(4000 + i * 29).toString(16).toUpperCase()}`];
    const actorDomains = [`${primaryHandle}-portal${i % 10}.onion`];

    const actor: ThreatActor = {
      id,
      name,
      primaryHandle,
      aliases: [primaryHandle, `${primaryHandle}_v2`, `ops_${primaryHandle}`],
      status,
      riskLevel,
      attributionConfidence: confidence,
      confidenceBreakdown: {
        pgpWeight: 0.30,
        pgpScore: Math.min(99, confidence + (i % 6 - 3)),
        infraWeight: 0.25,
        infraScore: Math.min(98, confidence + (i % 8 - 4)),
        walletWeight: 0.20,
        walletScore: Math.min(97, confidence + (i % 7 - 2)),
        styleWeight: 0.15,
        styleScore: Math.min(95, confidence + (i % 5 - 2)),
        behaviourWeight: 0.10,
        behaviourScore: Math.min(94, confidence + (i % 9 - 4)),
        overallScore: confidence,
        explanation: `Synthetic correlation profile derived from ${3 + (i % 5)} correlated identifier nodes across Tor and darknet forums.`
      },
      firstObserved: `2024-0${(i % 9) + 1}-1${(i % 8) + 1}`,
      lastObserved: `2026-09-${((i % 27) + 1).toString().padStart(2, '0')}`,
      categories: [cat1, cat2],
      description: `Synthetic threat entity tracked across regional darknet repositories. Known for operations related to ${cat1.toLowerCase()}.`,
      primaryMarketplace: i % 2 === 0 ? 'Dread Underground' : 'Exploit.in Mirror',
      associatedWallets: actorWallets,
      associatedPGP: actorPGP,
      associatedDomains: actorDomains,
      associatedInfrastructure: [`infra-syn-${i}-01`],
      associatedPersonas: [`persona-syn-${i}`],
      evidenceIds: [`EVD-SYN-${i}`],
      investigationIds: i % 4 === 0 ? ['inv-eclipse-01'] : []
    };

    actors.push(actor);

    // Identifiers (handles, PGP, wallets)
    const handleIdent: Identifier = {
      id: `ident-syn-h-${i}`,
      type: 'handle',
      value: primaryHandle,
      associatedActorId: id,
      actorName: name,
      firstSeen: actor.firstObserved,
      lastSeen: actor.lastObserved,
      confidence: confidence - 2,
      source: 'Tor Crawler v3'
    };
    const pgpIdent: Identifier = {
      id: `ident-syn-p-${i}`,
      type: 'pgp',
      value: actorPGP[0],
      keyId: `0x${(i * 8492).toString(16).toUpperCase()}`,
      fingerprint: actorPGP[0],
      associatedActorId: id,
      actorName: name,
      firstSeen: actor.firstObserved,
      lastSeen: actor.lastObserved,
      confidence: confidence,
      source: 'Keyserver Index'
    };
    const walletIdent: Identifier = {
      id: `ident-syn-w-${i}`,
      type: 'wallet',
      value: actorWallets[0],
      currency: i % 3 === 0 ? 'XMR' : 'BTC',
      associatedActorId: id,
      actorName: name,
      firstSeen: actor.firstObserved,
      lastSeen: actor.lastObserved,
      confidence: confidence - 4,
      source: 'Blockchain Cluster Node'
    };
    identifiers.push(handleIdent, pgpIdent, walletIdent);

    // Infrastructure Indicators
    const infraTypes: InfrastructureIndicator['type'][] = ['hidden_service', 'server_ip', 'tls_certificate', 'service_banner'];
    const chosenInfraType = infraTypes[i % infraTypes.length];
    const infraIndicator: InfrastructureIndicator = {
      id: `infra-syn-${i}-01`,
      indicator: chosenInfraType === 'hidden_service' 
        ? `${primaryHandle.slice(0, 10)}${i}relay.onion`
        : chosenInfraType === 'server_ip'
        ? `194.26.${(i * 3) % 250}.${(i * 7) % 250}`
        : chosenInfraType === 'tls_certificate'
        ? `SHA256: ${Math.random().toString(16).substring(2, 14)}`
        : `Server: nginx/1.${(i % 10) + 18}.0-sec`,
      type: chosenInfraType,
      associatedActorId: id,
      actorName: name,
      confidence: confidence - 5,
      firstSeen: actor.firstObserved,
      lastSeen: actor.lastObserved,
      status: i % 10 === 0 ? 'OFFLINE' : i % 5 === 0 ? 'INTERMITTENT' : 'ONLINE',
      details: `Synthetic ${chosenInfraType.replace('_', ' ')} attributed via automated pipeline correlation.`
    };
    infrastructure.push(infraIndicator);

    // Persona
    const persona: Persona = {
      id: `persona-syn-${i}`,
      actorId: id,
      actorName: name,
      handle: primaryHandle,
      platform: i % 3 === 0 ? 'Dread Forum' : i % 2 === 0 ? 'Genesis Market' : 'SilkCore',
      firstPostDate: actor.firstObserved,
      lastPostDate: actor.lastObserved,
      postCount: 40 + (i * 9) % 300,
      metrics: {
        stylometricSimilarity: 70 + (i % 25),
        vocabularySimilarity: 68 + (i % 26),
        writingPatternSimilarity: 72 + (i % 24),
        behaviouralSimilarity: 69 + (i % 27),
        activityTimingSimilarity: 65 + (i % 28),
        overallCorrelation: confidence - 2,
        primaryLanguage: i % 4 === 0 ? 'Russian' : 'English',
        avgSentenceLength: 12 + (i % 8),
        lexicalDiversity: 0.65 + (i % 20) * 0.01,
        punctuationFrequency: {
          commas: 0.035,
          semicolons: 0.004,
          ellipsis: 0.015
        },
        keyPhrases: ['clean escrow transactions', 'contact via encrypted tox', 'fast response guarantee'],
        activeHoursUTC: [(14 + i) % 24, (15 + i) % 24, (16 + i) % 24, (17 + i) % 24]
      },
      spatialCoordinates: [
        Math.sin(i * 0.35) * (1.5 + (i % 3) * 0.5),
        Math.cos(i * 0.35) * (1.5 + (i % 3) * 0.5),
        (Math.sin(i * 0.7) * 2) - 1
      ],
      aiSummary: `Synthetic persona profile with moderate stylometric clustering around ${cat1.toLowerCase()} discussion topics.`
    };
    personas.push(persona);

    // Evidence
    const evidence: Evidence = {
      id: `EVD-SYN-${i}`,
      title: `Synthetic ${cat1} Correlation Record #${i}`,
      type: i % 2 === 0 ? 'Infrastructure Overlap' : 'PGP Key Fingerprint Correlation',
      confidence: confidence,
      observedDate: actor.lastObserved,
      sourceId: `src-gen-${(i % 40) + 1}`,
      sourceName: `Collector Node [CLUSTER_${i % 16}]`,
      sourceReliability: i % 4 === 0 ? 'A' : 'B',
      relatedEntities: [
        { id, name, type: 'actor' },
        { id: handleIdent.id, name: handleIdent.value, type: 'handle' }
      ],
      technicalDetails: {
        methodology: 'Automated Cosine and Cryptographic Matching',
        iterationCount: 12,
        crossValidationScore: 0.892
      },
      summary: `Automated correlation of synthetic indicators linking ${name} with observed operational infrastructure and cryptographic keys.`
    };
    evidenceList.push(evidence);

    // Relationships (create multiple per actor so total exceeds 500)
    relationships.push({
      id: `rel-syn-${i}-1`,
      sourceId: id,
      sourceType: 'actor',
      sourceLabel: name,
      targetId: handleIdent.id,
      targetType: 'handle',
      targetLabel: handleIdent.value,
      relationshipType: 'SAME_HANDLE',
      confidence: confidence - 1,
      firstObserved: actor.firstObserved,
      lastObserved: actor.lastObserved,
      supportingEvidence: [evidence.id],
      sourceCount: 3,
      description: `Primary operational handle observed on forum repositories.`
    });

    relationships.push({
      id: `rel-syn-${i}-2`,
      sourceId: id,
      sourceType: 'actor',
      sourceLabel: name,
      targetId: pgpIdent.id,
      targetType: 'pgp',
      targetLabel: `PGP: ${pgpIdent.value.slice(0, 9)}`,
      relationshipType: 'SAME_PGP',
      confidence: confidence,
      firstObserved: actor.firstObserved,
      lastObserved: actor.lastObserved,
      supportingEvidence: [evidence.id],
      sourceCount: 4,
      description: `Cryptographic key signed in public marketplace directory.`
    });

    relationships.push({
      id: `rel-syn-${i}-3`,
      sourceId: id,
      sourceType: 'actor',
      sourceLabel: name,
      targetId: walletIdent.id,
      targetType: 'wallet',
      targetLabel: `${walletIdent.currency}: ${walletIdent.value.slice(0, 10)}`,
      relationshipType: 'WALLET_LINK',
      confidence: confidence - 3,
      firstObserved: actor.firstObserved,
      lastObserved: actor.lastObserved,
      supportingEvidence: [evidence.id],
      sourceCount: 2,
      description: `Discovered payout address associated with escrow deposits.`
    });

    relationships.push({
      id: `rel-syn-${i}-4`,
      sourceId: id,
      sourceType: 'actor',
      sourceLabel: name,
      targetId: infraIndicator.id,
      targetType: 'infrastructure',
      targetLabel: infraIndicator.indicator.slice(0, 16),
      relationshipType: 'HOSTED_ON',
      confidence: confidence - 4,
      firstObserved: actor.firstObserved,
      lastObserved: actor.lastObserved,
      supportingEvidence: [evidence.id],
      sourceCount: 3,
      description: `Synthetic network infrastructure hosting communication endpoints.`
    });

    // Inter-actor syndication link (clustering)
    if (i > 3 && i % 4 === 0) {
      const partnerActor = actors[i - 1];
      relationships.push({
        id: `rel-syn-cluster-${i}`,
        sourceId: id,
        sourceType: 'actor',
        sourceLabel: name,
        targetId: partnerActor.id,
        targetType: 'actor',
        targetLabel: partnerActor.name,
        relationshipType: 'TRUST_LINK',
        confidence: 78,
        firstObserved: actor.firstObserved,
        lastObserved: actor.lastObserved,
        supportingEvidence: [evidence.id],
        sourceCount: 2,
        description: `Cross-syndicate vendor escrow relationship observed on Torrez Reborn.`
      });
    }
  }

  // Generate 1000+ Timeline Events to satisfy Prompt 32
  const eventTypes: TimelineEvent['eventType'][] = [
    'DISCOVERY', 'PGP_CORRELATION', 'WALLET_TRANSFER',
    'INFRASTRUCTURE_REUSE', 'PERSONA_ACTIVITY', 'MARKET_MIGRATION',
    'ATTRIBUTION_UPDATE'
  ];
  const significances: TimelineEvent['significance'][] = ['CRITICAL', 'MAJOR', 'MODERATE', 'MINOR'];

  // Add Nightfall timeline events first
  timelineEvents.push(
    { id: 'ev-nf-01', date: '2024-06-14', title: 'First Observation of Handle "NightFall"', description: 'Handle registered on Dread forum advertising industrial credential collections with 4096-bit PGP key.', eventType: 'DISCOVERY', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 98, significance: 'MAJOR' },
    { id: 'ev-nf-02', date: '2024-07-02', title: 'Tor Hidden Service eclipse-drop77.onion Launched', description: 'Descriptor published to Tor HSDir directory with self-signed certificate cn=internal.eclipse-drop.local.', eventType: 'INFRASTRUCTURE_REUSE', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 94, significance: 'MAJOR' },
    { id: 'ev-nf-03', date: '2024-11-04', title: 'New Marketplace Identity: NF_Market', description: 'Vendor account created on SilkCore escrow using identical PGP key fingerprint 7A9F 48B2.', eventType: 'MARKET_MIGRATION', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 95, significance: 'CRITICAL' },
    { id: 'ev-nf-04', date: '2025-02-11', title: 'Bitcoin UTXO Cluster Link Identified', description: 'Common Input Ownership Heuristics linked wallet bc1q9x402m with vendor deposit node bc1q7wre482.', eventType: 'WALLET_TRANSFER', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 88, significance: 'MAJOR' },
    { id: 'ev-nf-05', date: '2025-03-12', title: 'Genesis Underground Vendor "EclipseVendor" Correlated', description: 'Stylometric and PGP subkey match confirmed 86% correlation with Dread persona NightFall.', eventType: 'PERSONA_ACTIVITY', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 86, significance: 'MAJOR' },
    { id: 'ev-nf-06', date: '2026-04-12', title: 'Operation Eclipse Formally Opened', description: 'DARKTRACE autonomous engine grouped 14 indicators and created unified investigation workspace.', eventType: 'ATTRIBUTION_UPDATE', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 87, significance: 'CRITICAL' },
    { id: 'ev-nf-07', date: '2026-09-28', title: 'High-Confidence Attribution Update (87%)', description: 'Multi-layer correlation engine confirmed converging PGP, infrastructure, and wallet links.', eventType: 'ATTRIBUTION_UPDATE', actorId: 'actor-nightfall', actorName: 'NIGHTFALL', confidence: 87, significance: 'CRITICAL' }
  );

  // Generate up to 1024 total timeline events deterministically
  for (let i = 7; i < 1024; i++) {
    const actor = actors[i % actors.length];
    const eventType = eventTypes[i % eventTypes.length];
    const significance = significances[i % significances.length];
    const year = 2024 + (i % 3); // 2024, 2025, 2026
    const month = ((i * 5) % 12) + 1;
    const day = ((i * 7) % 28) + 1;
    const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    timelineEvents.push({
      id: `ev-syn-${i}`,
      date: dateStr,
      title: `${eventType.replace(/_/g, ' ')}: ${actor.name}`,
      description: `Synthetic indicator detected during automated collection pass: ${actor.primaryHandle} associated with ${eventType.toLowerCase().replace(/_/g, ' ')} telemetry.`,
      eventType,
      actorId: actor.id,
      actorName: actor.name,
      confidence: 70 + (i % 26),
      significance
    });
  }

  // Sort timeline events chronologically
  timelineEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Initial live intelligence stream items
  const streamCategories: IntelligenceStreamItem['category'][] = ['INDICATOR', 'RELATIONSHIP', 'CORRELATION', 'ALERT'];
  for (let i = 0; i < 30; i++) {
    const actor = actors[i % actors.length];
    const category = streamCategories[i % streamCategories.length];
    const minAgo = i * 2 + 1;
    streamItems.push({
      id: `stream-${i}`,
      timestamp: `${minAgo}m ago`,
      category,
      message: category === 'ALERT'
        ? `High-confidence link detected for ${actor.name} (${actor.attributionConfidence}% confidence)`
        : category === 'CORRELATION'
        ? `Persona stylometry convergence between ${actor.primaryHandle} and marketplace alias`
        : category === 'RELATIONSHIP'
        ? `Shared infrastructure certificate mapped to relay host ASN`
        : `New synthetic indicator indexed from Tor onion crawler`,
      confidence: actor.attributionConfidence,
      actorId: actor.id,
      actorName: actor.name,
      severity: actor.riskLevel === 'CRITICAL' ? 'critical' : actor.riskLevel === 'HIGH' ? 'high' : 'medium'
    });
  }

  return {
    actors,
    identifiers,
    infrastructure,
    personas,
    relationships,
    evidenceList,
    timelineEvents,
    sources: GENERATED_SOURCES,
    investigations: [CURATED_INVESTIGATION],
    streamItems
  };
}

export const INITIAL_DATASET = generateSyntheticDataset();
