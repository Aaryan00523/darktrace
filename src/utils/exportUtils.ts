import { jsPDF } from 'jspdf';
import {
  Investigation,
  ThreatActor,
  Identifier,
  InfrastructureIndicator,
  Evidence,
  Relationship,
  Persona
} from '../types';

/**
 * Downloads a string or JSON as a file in the browser
 */
function downloadBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Functional JSON Export
 */
export function exportInvestigationJSON(
  inv: Investigation,
  actor: ThreatActor,
  identifiers: Identifier[],
  infrastructure: InfrastructureIndicator[],
  evidence: Evidence[],
  relationships: Relationship[],
  personas: Persona[]
) {
  const reportPayload = {
    metadata: {
      platform: 'DARKTRACE Cyber Threat Intelligence Platform',
      version: '2.8.4-SYNTHETIC',
      generatedAt: new Date().toISOString(),
      classification: 'SYNTHETIC DEMONSTRATION INTELLIGENCE'
    },
    investigation: inv,
    primaryThreatActor: actor,
    correlatedIdentifiers: identifiers,
    infrastructureIndicators: infrastructure,
    evidenceItems: evidence,
    relationshipGraph: relationships,
    personaStylometry: personas
  };

  const jsonStr = JSON.stringify(reportPayload, null, 2);
  downloadBlob(jsonStr, `${inv.codename.toLowerCase()}-intel-dossier.json`, 'application/json');
}

/**
 * Functional CSV Export
 */
export function exportInvestigationCSV(
  inv: Investigation,
  actor: ThreatActor,
  identifiers: Identifier[],
  infrastructure: InfrastructureIndicator[],
  evidence: Evidence[]
) {
  const headers = ['Category', 'ID', 'Entity/Indicator', 'Type', 'Confidence (%)', 'First Seen', 'Last Seen', 'Notes/Details'];
  const rows: string[][] = [];

  // Actor
  rows.push(['Threat Actor', actor.id, actor.name, actor.categories.join('; '), String(actor.attributionConfidence), actor.firstObserved, actor.lastObserved, `Primary Handle: ${actor.primaryHandle}`]);

  // Identifiers
  identifiers.forEach(i => {
    rows.push(['Identifier', i.id, i.value, i.type, String(i.confidence), i.firstSeen, i.lastSeen, `Source: ${i.source}`]);
  });

  // Infrastructure
  infrastructure.forEach(inf => {
    rows.push(['Infrastructure', inf.id, inf.indicator, inf.type, String(inf.confidence), inf.firstSeen, inf.lastSeen, inf.details]);
  });

  // Evidence
  evidence.forEach(e => {
    rows.push(['Evidence', e.id, e.title, e.type, String(e.confidence), e.observedDate, e.observedDate, `Source: ${e.sourceName} (${e.sourceReliability})`]);
  });

  const csvContent = [
    headers.map(h => `"${h}"`).join(','),
    ...rows.map(r => r.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  downloadBlob(csvContent, `${inv.codename.toLowerCase()}-indicators.csv`, 'text/csv;charset=utf-8;');
}

/**
 * Functional PDF Report Generation using jsPDF
 */
export function exportInvestigationPDF(
  inv: Investigation,
  actor: ThreatActor,
  identifiers: Identifier[],
  infrastructure: InfrastructureIndicator[],
  evidence: Evidence[],
  relationships: Relationship[],
  personas: Persona[]
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // Header Banner
  doc.setFillColor(5, 7, 11);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(0, 240, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('DARKTRACE INTELLIGENCE DOSSIER', 14, 12);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('CONNECTING DIGITAL FOOTPRINTS • REVEALING THREAT ACTOR NETWORKS', 14, 18);
  doc.text(`CONFIDENTIAL // SYNTHETIC INTELLIGENCE // ${new Date().toISOString().split('T')[0]}`, 14, 23);

  y = 36;

  // Case Title & Metadata
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`${inv.codename} — ${inv.title}`, 14, y);
  y += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Status: ${inv.status}  |  Priority: ${inv.priority}  |  Attribution Confidence: ${inv.overallConfidence}%`, 14, y);
  y += 8;

  // Executive Summary Box
  doc.setFillColor(241, 245, 249);
  doc.rect(14, y, pageWidth - 28, 22, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('EXECUTIVE SUMMARY', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const splitSummary = doc.splitTextToSize(inv.summary, pageWidth - 36);
  doc.text(splitSummary, 18, y + 12);
  y += 28;

  // Primary Threat Actor Profile
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`1. TARGET PROFILE: ${actor.name}`, 14, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`• Primary Handle: ${actor.primaryHandle}`, 16, y);
  doc.text(`• Known Aliases: ${actor.aliases.join(', ')}`, 16, y + 5);
  doc.text(`• Operational Categories: ${actor.categories.join(', ')}`, 16, y + 10);
  doc.text(`• Observation Window: ${actor.firstObserved} to ${actor.lastObserved}`, 16, y + 15);
  y += 22;

  // Explainable Confidence Breakdown Table
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('2. EXPLAINABLE ATTRIBUTION CONFIDENCE MODEL', 14, y);
  y += 6;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const breakdownRows = [
    `• PGP Fingerprint Correlation (Weight: 30%): ${actor.confidenceBreakdown.pgpScore}%`,
    `• Infrastructure & Banner Overlap (Weight: 25%): ${actor.confidenceBreakdown.infraScore}%`,
    `• Cryptocurrency UTXO Clustering (Weight: 20%): ${actor.confidenceBreakdown.walletScore}%`,
    `• Cross-Forum Stylometry Cosine Match (Weight: 15%): ${actor.confidenceBreakdown.styleScore}%`,
    `• Activity Timing & Behavioural Profile (Weight: 10%): ${actor.confidenceBreakdown.behaviourScore}%`,
    `→ NET WEIGHTED ATTRIBUTION CONFIDENCE: ${actor.attributionConfidence}%`
  ];
  breakdownRows.forEach(row => {
    doc.text(row, 16, y);
    y += 5;
  });
  y += 4;

  // Supporting Evidence Items
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('3. KEY FORENSIC EVIDENCE ARTIFACTS', 14, y);
  y += 6;

  evidence.slice(0, 3).forEach((ev) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`[${ev.id}] ${ev.title} (${ev.confidence}% Confidence)`, 16, y);
    y += 4.5;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const splitEv = doc.splitTextToSize(`Source: ${ev.sourceName} | Observed: ${ev.observedDate} — ${ev.summary}`, pageWidth - 36);
    doc.text(splitEv, 18, y);
    y += splitEv.length * 4.5 + 2;
  });

  if (y < 250) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`4. CORRELATED INFRASTRUCTURE & IDENTIFIERS (${identifiers.length + infrastructure.length} Records)`, 14, y);
    y += 5.5;
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const summaryLine = `Correlated: ${identifiers.slice(0, 3).map(id => id.value).join(', ')} across ${relationships.length} links and ${personas.length} personas.`;
    doc.text(doc.splitTextToSize(summaryLine, pageWidth - 36), 16, y);
    y += 8;
  }

  // Footer Disclaimer
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text(
    'CONFIDENTIAL REPORT: This document contains synthetic demonstration intelligence generated by DARKTRACE for lawful cyber research purposes.',
    14,
    doc.internal.pageSize.getHeight() - 10
  );

  doc.save(`${inv.codename.toLowerCase()}-intelligence-report.pdf`);
}
