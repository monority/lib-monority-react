import { useMessages } from '@/shared/i18n'
import { Kbd } from '@monority/ui/kbd'
import { type Column, Table } from '@monority/ui/table'

export interface KeyboardShortcutRow extends Record<string, unknown> {
    key: string | string[]
    action?: string
    description?: string
    context?: string
}

export interface DocKeyboardTableProps {
    shortcuts: KeyboardShortcutRow[]
}

export function DocKeyboardTable({ shortcuts }: DocKeyboardTableProps) {
    const messages = useMessages().docs.table

    if (!shortcuts || shortcuts.length === 0) return null

    const columns: Column<KeyboardShortcutRow>[] = [
        {
            key: 'key',
            label: messages.key,
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
            label: messages.behavior,
            render: (_val, row) => (
                <span className="docs-keyboard-action">{row.action || row.description}</span>
            ),
        },
        {
            key: 'context',
            label: messages.context,
            render: (_val, row) => (
                <span className="docs-keyboard-context">
                    {row.context ? (
                        <code>{row.context}</code>
                    ) : (
                        <span className="docs-prop-default">{messages.global}</span>
                    )}
                </span>
            ),
        },
    ]

    return (
        <div className="docs-table-wrapper">
            <Table<KeyboardShortcutRow>
                columns={columns}
                rows={shortcuts}
                getRowId={(row) =>
                    `${Array.isArray(row.key) ? row.key.join('+') : row.key}-${row.action || row.description || ''}`
                }
            />
        </div>
    )
}
