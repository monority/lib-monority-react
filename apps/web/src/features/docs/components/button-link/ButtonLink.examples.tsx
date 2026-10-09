import { ButtonLink } from '@monority/ui/button-link'

export function ButtonLinkBasicPreview() {
    return <ButtonLink href="#preview">Navigate</ButtonLink>
}

export function ButtonLinkVariantsExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <ButtonLink href="#primary" variant="primary">
                Primary Link
            </ButtonLink>
            <ButtonLink href="#secondary" variant="secondary">
                Secondary Link
            </ButtonLink>
            <ButtonLink href="#ghost" variant="ghost">
                Ghost Link
            </ButtonLink>
            <ButtonLink href="#danger" variant="danger">
                Danger Link
            </ButtonLink>
        </div>
    )
}

export function ButtonLinkSizesExample() {
    return (
        <div
            style={{
                display: 'flex',
                gap: 'var(--mr-space-2)',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >
            <ButtonLink href="#sm" size="sm">
                Small
            </ButtonLink>
            <ButtonLink href="#md" size="md">
                Medium
            </ButtonLink>
            <ButtonLink href="#lg" size="lg">
                Large
            </ButtonLink>
        </div>
    )
}

export function ButtonLinkStatesExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <ButtonLink href="#disabled" disabled>
                Disabled
            </ButtonLink>
            <ButtonLink href="#loading" loading>
                Loading
            </ButtonLink>
        </div>
    )
}

export function ButtonLinkIconsExample() {
    return (
        <div style={{ display: 'flex', gap: 'var(--mr-space-2)', flexWrap: 'wrap' }}>
            <ButtonLink href="#leading" iconLeading={<span>&rarr;</span>}>
                Explore
            </ButtonLink>
            <ButtonLink href="#trailing" iconTrailing={<span>&rarr;</span>}>
                Continue
            </ButtonLink>
        </div>
    )
}

export function ButtonLinkFullWidthExample() {
    return (
        <ButtonLink href="#full-width" fullWidth>
            Full Width ButtonLink
        </ButtonLink>
    )
}
