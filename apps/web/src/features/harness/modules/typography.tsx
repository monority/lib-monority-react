import { Kbd, PreCode, Text, Title } from '@monority/ui'
import { Sample } from '../Sample'

export function TitleHarness() {
    return (
        <>
            <Sample label="Title Display">
                <Title size="display">Display Title</Title>
            </Sample>
            <Sample label="Title LG">
                <Title size="lg">Large Heading</Title>
            </Sample>
            <Sample label="Title MD">
                <Title size="md">Medium Heading</Title>
            </Sample>
            <Sample label="Title SM">
                <Title size="sm">Small Heading</Title>
            </Sample>
        </>
    )
}

export function TextHarness() {
    const tones = [
        'base',
        'muted',
        'strong',
        'accent',
        'success',
        'warning',
        'danger',
        'info',
    ] as const

    return (
        <>
            <Sample label="Text Tones">
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}
                >
                    {tones.map((tone) => (
                        <Text key={tone} tone={tone}>
                            Text with tone &ldquo;{tone}&rdquo;
                        </Text>
                    ))}
                </div>
            </Sample>
            <Sample label="Text Sizes">
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 'var(--mr-spacing-2)' }}
                >
                    <Text size="sm">Small body text (sm)</Text>
                    <Text size="md">Default body text (md)</Text>
                    <Text size="lg">Large lead text (lg)</Text>
                </div>
            </Sample>
        </>
    )
}

export function KbdHarness() {
    return (
        <>
            <Sample label="Kbd Sizes">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-3)', alignItems: 'center' }}>
                    <Kbd size="sm">⌘</Kbd>
                    <Kbd size="md">⌘</Kbd>
                    <Kbd size="lg">⌘</Kbd>
                </div>
            </Sample>
            <Sample label="Kbd Shortcuts">
                <div style={{ display: 'flex', gap: 'var(--mr-spacing-2)', alignItems: 'center' }}>
                    <Kbd>Ctrl</Kbd>
                    <span>+</span>
                    <Kbd>Shift</Kbd>
                    <span>+</span>
                    <Kbd>P</Kbd>
                </div>
            </Sample>
        </>
    )
}

export function PreCodeHarness() {
    const codeSnippet = `import { Button } from '@monority/ui'

export function App() {
  return <Button variant="primary">Click me</Button>
}`

    return (
        <>
            <Sample label="PreCode Small">
                <PreCode language="typescript" size="sm">
                    {codeSnippet}
                </PreCode>
            </Sample>
            <Sample label="PreCode Medium">
                <PreCode language="typescript" size="md">
                    {codeSnippet}
                </PreCode>
            </Sample>
            <Sample label="PreCode with Copy Button">
                <PreCode language="typescript" size="sm" copyable>
                    {codeSnippet}
                </PreCode>
            </Sample>
        </>
    )
}
