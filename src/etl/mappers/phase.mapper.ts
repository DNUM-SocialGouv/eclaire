import { Phase } from '../dto/EclaireDto'

const PHASE_MAP: { code: Phase; display: string }[] = [
  { code: 'jarde-early', display: 'Jardé phase précoce' },
  { code: 'phase-I-first-admin', display: 'Human Pharmacology (Phase I) - First administration to humans' },
  { code: 'phase-I-bioequivalence', display: 'Human Pharmacology (Phase I) - Bioequivalence Study' },
  { code: 'phase-I-other', display: 'Human Pharmacology (Phase I) -  Other' },
  { code: 'phase-I-II-first-admin', display: 'Phase I and Phase II (Integrated) - First administration to humans' },
  { code: 'phase-I-II-first-bioequivalence', display: 'Phase I and Phase II (Integrated) - Bioequivalence Study' },
  { code: 'phase-I-II-other', display: 'Phase I and Phase II (Integrated) - Other' },
  { code: 'phase-II', display: 'Therapeutic exploratory (Phase II)' },
  { code: 'phase-II-III', display: 'Phase II and Phase III (Integrated)' },
  { code: 'phase-III', display: 'Therapeutic confirmatory  (Phase III)' },
  { code: 'phase-IV', display: 'Therapeutic use (Phase IV)' },
  { code: 'phase-III-IV', display: 'Phase III and phase IV (Integrated)' },
]

export function getPhaseIndex(code: Phase): number | null {
  if (!code) return null

  const index = PHASE_MAP.findIndex((p) => p.code === code)

  return index !== -1 ? index : null
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[()-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractSignals(text: string) {
  const t = normalize(text)

  /* eslint-disable sort-keys */
  return {
    phaseI: t.includes('phase i'),
    phaseII: t.includes('phase ii'),
    phaseIII: t.includes('phase iii'),
    phaseIV: t.includes('phase iv'),
    firstAdmin: t.includes('first administration'),
    bioequivalence: t.includes('bioequivalence'),
    integrated: t.includes('integrated'),
    exploratory: t.includes('exploratory'),
    confirmatory: t.includes('confirmatory'),
    therapeuticUse: t.includes('therapeutic use'),
    early: t.includes('phase precoce') || t.includes('early'),
  }
  /* eslint-enable sort-keys */
}

export function mapPhase(display?: string | null): Phase {
  if (!display) return null

  const input = extractSignals(display)

  let best: { code: Phase; score: number } | null = null

  for (const ref of PHASE_MAP) {
    const target = extractSignals(ref.display)

    let score = 0

    if (input.phaseI === target.phaseI) score++
    if (input.phaseII === target.phaseII) score++
    if (input.phaseIII === target.phaseIII) score++
    if (input.phaseIV === target.phaseIV) score++

    if (input.firstAdmin === target.firstAdmin) score++
    if (input.bioequivalence === target.bioequivalence) score++
    if (input.integrated === target.integrated) score++
    if (input.exploratory === target.exploratory) score++
    if (input.confirmatory === target.confirmatory) score++
    if (input.therapeuticUse === target.therapeuticUse) score++
    if (input.early === target.early) score++

    const normInput = normalize(display)
    const normRef = normalize(ref.display)

    if (normInput.includes(normRef)) score += 2

    if (!best || score > best.score) {
      best = { code: ref.code, score }
    }
  }

  return best && best.score >= 3 ? best.code : null
}
