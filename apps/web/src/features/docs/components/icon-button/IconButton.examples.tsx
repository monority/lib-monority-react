import { IconButton } from '@monority/ui/icon-button'

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

const CloseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
)

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
            d="M3 4H13M5 4V3C5 2.45 5.45 2 6 2H10C10.55 2 11 2.45 11 3V4M6 7V12M10 7V12M4 4L5 14H11L12 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
)

export function IconButtonBasicPreview() {
    return (
        <IconButton label="Search">
            <SearchIcon />
        </IconButton>
    )
}

export function IconButtonTonesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <IconButton label="Search" tone="neutral">
                <SearchIcon />
            </IconButton>
            <IconButton label="Confirm" tone="accent">
                <SearchIcon />
            </IconButton>
            <IconButton label="Delete item" tone="danger">
                <TrashIcon />
            </IconButton>
        </div>
    )
}

export function IconButtonSizesExample() {
    return (
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <IconButton label="Close small" size="sm">
                <CloseIcon />
            </IconButton>
            <IconButton label="Close medium" size="md">
                <CloseIcon />
            </IconButton>
            <IconButton label="Close large" size="lg">
                <CloseIcon />
            </IconButton>
        </div>
    )
}

export function IconButtonStatesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <IconButton label="Disabled search" disabled>
                <SearchIcon />
            </IconButton>
            <IconButton label="Loading search" loading>
                <SearchIcon />
            </IconButton>
        </div>
    )
}
