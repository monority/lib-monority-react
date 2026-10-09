import { DocPage, type DocPageData } from '../DocPage'
import {
    ButtonLinkBasicPreview,
    ButtonLinkVariantsExample,
    ButtonLinkSizesExample,
    ButtonLinkStatesExample,
    ButtonLinkIconsExample,
    ButtonLinkFullWidthExample,
} from './ButtonLink.examples'

const docData: DocPageData = {
    title: 'ButtonLink',
    description:
        'A navigation anchor styled consistently with Button. Combines link semantics with button visuals.',
    importCode: "import { ButtonLink } from '@monority/ui/button-link'",
    usageCode: '<ButtonLink href="/docs">Documentation</ButtonLink>',
    preview: () => <ButtonLinkBasicPreview />,
    examples: [
        { title: 'Variants', content: <ButtonLinkVariantsExample /> },
        { title: 'Sizes', content: <ButtonLinkSizesExample /> },
        { title: 'States', content: <ButtonLinkStatesExample /> },
        { title: 'With Icons', content: <ButtonLinkIconsExample /> },
        { title: 'Full Width', content: <ButtonLinkFullWidthExample /> },
    ],
    props: [
        {
            name: 'href',
            type: 'string',
            defaultValue: '-',
            description: 'Destination URL for navigation.',
        },
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'ghost' | 'danger'",
            defaultValue: "'secondary'",
            description: 'Visual intent.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Control density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables navigation and sets aria-disabled.',
        },
        {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables navigation and sets aria-busy.',
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Stretches the anchor to container width.',
        },
        {
            name: 'iconLeading',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Icon displayed before the label.',
        },
        {
            name: 'iconTrailing',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Icon displayed after the label.',
        },
    ],
    cssHooks: [
        '.mr-btn',
        '[data-variant]',
        '[data-size]',
        '[data-disabled]',
        '[data-loading]',
        '[data-full-width]',
    ],
    tokens: [
        '--mr-bg-accent',
        '--mr-fg-on-accent',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
        '--mr-space-4',
    ],
    a11y: [
        'Native anchor semantics with href attribute.',
        'Uses aria-disabled and aria-busy when disabled or loading.',
        'Prevents default navigation on click and Enter key when disabled.',
        'Visible focus ring via focus-visible.',
    ],
}

export function ButtonLinkDocs() {
    return <DocPage doc={docData} />
}
