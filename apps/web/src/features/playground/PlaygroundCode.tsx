import { CodeViewer } from '@/shared/components/CodeViewer'

interface PlaygroundCodeProps {
    code: string
}

export function PlaygroundCode({ code }: PlaygroundCodeProps) {
    return (
        <section className="pg-code" aria-label="Generated code">
            <p className="pg-preview__kicker">Code</p>
            <CodeViewer code={code} filename="usage.tsx" />
        </section>
    )
}
