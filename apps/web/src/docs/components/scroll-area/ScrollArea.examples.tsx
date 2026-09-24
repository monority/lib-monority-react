import { ScrollArea } from '@monority/ui/scroll-area'

const longText = Array.from({ length: 30 }, (_, i) => (
    <p key={i} style={{ margin: '0.5rem 0', color: 'var(--mr-fg-muted)' }}>
        Activity {i + 1} - Preview deployment completed for the documentation workspace.
    </p>
))

const wideContent = (
    <div style={{ width: '800px', display: 'flex', gap: '1rem' }}>
        {Array.from({ length: 20 }, (_, i) => (
            <div
                key={i}
                style={{
                    minWidth: '120px',
                    padding: '1rem',
                    background: 'var(--mr-bg-control)',
                    borderRadius: 'var(--mr-radius-md)',
                    textAlign: 'center',
                }}
            >
                Column {i + 1}
            </div>
        ))}
    </div>
)

const bigTable = (
    <div style={{ width: '600px', height: '300px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    {Array.from({ length: 10 }, (_, i) => (
                        <th
                            key={i}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid var(--mr-border-subtle)',
                            }}
                        >
                            Metric {i + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: 20 }, (_, row) => (
                    <tr key={row}>
                        {Array.from({ length: 10 }, (_, col) => (
                            <td
                                key={col}
                                style={{
                                    padding: '0.5rem',
                                    border: '1px solid var(--mr-border-subtle)',
                                }}
                            >
                                R{row + 1} / C{col + 1}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export function ScrollAreaBasicExample() {
    return (
        <ScrollArea
            style={{
                maxHeight: '200px',
                border: '1px solid var(--mr-border-subtle)',
                borderRadius: 'var(--mr-radius-md)',
                padding: '0.5rem',
            }}
        >
            {longText}
        </ScrollArea>
    )
}

export function ScrollAreaHorizontalExample() {
    return (
        <ScrollArea
            orientation="horizontal"
            style={{
                border: '1px solid var(--mr-border-subtle)',
                borderRadius: 'var(--mr-radius-md)',
                padding: '0.5rem',
            }}
        >
            {wideContent}
        </ScrollArea>
    )
}

export function ScrollAreaBothExample() {
    return (
        <ScrollArea
            orientation="both"
            style={{
                maxHeight: '200px',
                border: '1px solid var(--mr-border-subtle)',
                borderRadius: 'var(--mr-radius-md)',
            }}
        >
            {bigTable}
        </ScrollArea>
    )
}

export function ScrollAreaHideScrollbarExample() {
    return (
        <ScrollArea
            hideScrollbar
            style={{
                maxHeight: '200px',
                border: '1px solid var(--mr-border-subtle)',
                borderRadius: 'var(--mr-radius-md)',
                padding: '0.5rem',
            }}
        >
            {longText}
        </ScrollArea>
    )
}
