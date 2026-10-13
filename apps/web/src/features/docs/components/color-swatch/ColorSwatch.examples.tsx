import { ColorSwatch } from '@monority/ui/color-swatch'

export function ColorSwatchBasicExample() {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <ColorSwatch value="var(--mr-accent)" label="Accent" />
            <ColorSwatch value="var(--mr-success-text)" label="Success" />
            <ColorSwatch value="var(--mr-warning-text)" label="Warning" />
            <ColorSwatch value="var(--mr-danger-text)" label="Danger" />
        </div>
    )
}

export function ColorSwatchSizesExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ColorSwatch value="var(--mr-accent)" size="sm" label="Small" />
            <ColorSwatch value="var(--mr-accent)" size="md" label="Medium" />
            <ColorSwatch value="var(--mr-accent)" size="lg" label="Large" />
        </div>
    )
}

export function ColorSwatchShapesExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <ColorSwatch value="var(--mr-accent)" shape="square" label="Square" />
            <ColorSwatch value="var(--mr-accent)" shape="rounded" label="Rounded" />
            <ColorSwatch value="var(--mr-accent)" shape="circle" label="Circle" />
        </div>
    )
}

export function ColorSwatchValuesExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <ColorSwatch value="var(--mr-bg-canvas)" label="Canvas" showValue />
            <ColorSwatch value="var(--mr-bg-surface)" label="Surface" showValue />
            <ColorSwatch value="var(--mr-accent)" label="Accent" showValue />
        </div>
    )
}
