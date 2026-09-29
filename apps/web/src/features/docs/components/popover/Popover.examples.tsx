import { Button } from '@monority/ui/button'
import { Input } from '@monority/ui/input'
import { Popover } from '@monority/ui/popover'

export function PopoverBasicExample() {
    return (
        <Popover trigger={<Button>Inspect token</Button>}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
                <div
                    style={{
                        color: 'var(--mr-text-primary)',
                        fontSize: 'var(--mr-fs-14)',
                        fontWeight: 600,
                    }}
                >
                    Surface token
                </div>
                <div
                    style={{
                        color: 'var(--mr-text-secondary)',
                        fontSize: 'var(--mr-fs-14)',
                        lineHeight: 1.5,
                    }}
                >
                    Use elevated surfaces for contextual panels, menus, and transient editing flows.
                </div>
            </div>
        </Popover>
    )
}

export function PopoverWithFormExample() {
    return (
        <Popover trigger={<Button variant="secondary">Quick edit</Button>}>
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 220 }}
            >
                <div
                    style={{
                        color: 'var(--mr-text-primary)',
                        fontSize: 'var(--mr-fs-14)',
                        fontWeight: 600,
                    }}
                >
                    Rename view
                </div>
                <label style={{ fontSize: '0.875rem', color: 'var(--mr-text-secondary)' }}>
                    Name
                    <Input style={{ marginTop: '0.375rem' }} placeholder="Quarterly health" />
                </label>
                <Button size="sm">Save</Button>
            </div>
        </Popover>
    )
}

export function PopoverAlignmentExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Popover trigger={<Button>Start</Button>} align="start">
                <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                    Aligned to start edge.
                </div>
            </Popover>
            <Popover trigger={<Button>Center</Button>} align="center">
                <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                    Centered for compact callouts.
                </div>
            </Popover>
            <Popover trigger={<Button>End</Button>} align="end">
                <div style={{ color: 'var(--mr-text-secondary)', fontSize: 'var(--mr-fs-14)' }}>
                    Aligned to end edge.
                </div>
            </Popover>
        </div>
    )
}
