import { Table, type Column } from '@monority/ui/table'
import { Kbd } from '@monority/ui/kbd'

export interface KeyboardShortcutRow extends Record<string, unknown> {
    key: string | string[]
    action?: string
    description?: string
    context?: string
}

export interface DocKeyboardTableProps {
    shortcuts: KeyboardShortcutRow[]
}

const keyboardColumns: Column<KeyboardShortcutRow>[] = [
    {
        key: 'key',
        label: 'Touche / Raccourci',
        render: (_val, row) => {
            const keys = Array.isArray(row.key) ? row.key : [row.key]
            return (
                <span
                    className="docs-kbd-cell"
                    style={{
                        display: 'inline-flex',
                        gap: '0.25rem',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {keys.map((k, idx) => (
                        <Kbd key={`${k}-${idx}`} size="sm">
                            {k}
                        </Kbd>
                    ))}
                </span>
            )
        },
    },
    {
        key: 'action',
        label: 'Comportement',
        render: (_val, row) => (
            <span className="docs-keyboard-action">{row.action || row.description}</span>
        ),
    },
    {
        key: 'context',
        label: 'Contexte',
        render: (_val, row) => (
            <span className="docs-keyboard-context">
                {row.context ? (
                    <code>{row.context}</code>
                ) : (
                    <span className="docs-prop-default">Global</span>
                )}
            </span>
        ),
    },
]

export function DocKeyboardTable({ shortcuts }: DocKeyboardTableProps) {
    if (!shortcuts || shortcuts.length === 0) return null

    return (
        <div className="docs-table-wrapper">
            <Table<KeyboardShortcutRow>
                columns={keyboardColumns}
                rows={shortcuts}
                getRowId={(row) =>
                    `${Array.isArray(row.key) ? row.key.join('+') : row.key}-${row.action || row.description || ''}`
                }
            />
        </div>
    )
}
