import { Kbd } from '@monority/ui'

export function KbdBasicExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Alt</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
        </div>
    )
}

export function KbdKeysExample() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Copy:</span>
                <Kbd keys={['Ctrl', 'C']} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Paste:</span>
                <Kbd keys={['Ctrl', 'V']} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Find and replace:</span>
                <Kbd keys={['Ctrl', 'Shift', 'H']} />
            </div>
        </div>
    )
}

export function KbdSizesExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Kbd size="sm">sm</Kbd>
            <Kbd size="md">md</Kbd>
            <Kbd size="lg">lg</Kbd>
        </div>
    )
}
