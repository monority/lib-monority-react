import fs from 'node:fs'

export interface SpecCriterion {
    id: string
    text: string
}

export interface CriteriaReport {
    component: string
    total: number
    covered: string[]
    missing: string[]
}

export function extractSpecCriteria(markdown: string): SpecCriterion[] {
    const start = markdown.indexOf('## Critères de vérification')
    if (start < 0) return []
    const end = markdown.indexOf('\n## ', start + 3)
    const section = markdown.slice(start, end < 0 ? undefined : end)
    return [...section.matchAll(/^(\d+)\.\s+(.+)$/gm)].map((match) => ({
        id: match[1]!,
        text: match[2]!.trim(),
    }))
}

export function extractTestCaseIds(source: string): string[] {
    return [...source.matchAll(/\btest\(\s*['"`]([^'"`]+?)['"`]/g)]
        .map((match) => match[1]!.match(/^([\w-]+#\d+)/)?.[1])
        .filter((id): id is string => Boolean(id))
}

export function buildCriteriaReport(
    component: string,
    specMarkdown: string,
    testSource: string
): CriteriaReport {
    const criteria = extractSpecCriteria(specMarkdown)
    const ids = new Set(extractTestCaseIds(testSource))
    const covered = criteria
        .filter((criterion) => ids.has(`${component}#${criterion.id}`))
        .map((criterion) => criterion.id)
    const missing = criteria
        .filter((criterion) => !covered.includes(criterion.id))
        .map((criterion) => criterion.id)
    return { component, total: criteria.length, covered, missing }
}

export function collectCriteriaCoverage(
    specFiles: string[],
    testFiles: string[]
): CriteriaReport[] {
    const testSource = testFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n')
    return specFiles.map((file) =>
        buildCriteriaReport(file.replace(/\.md$/, ''), fs.readFileSync(file, 'utf8'), testSource)
    )
}
