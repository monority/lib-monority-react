import { ButtonLink } from '@monority/ui/button-link'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ButtonLinkBasicPreview,
    ButtonLinkVariantsExample,
    ButtonLinkSizesExample,
    ButtonLinkStatesExample,
    ButtonLinkIconsExample,
    ButtonLinkFullWidthExample,
} from './ButtonLink.examples'

function ButtonLinkPlaygroundDemo(props: {
    variant: 'primary' | 'secondary' | 'ghost' | 'danger'
    size: 'sm' | 'md' | 'lg'
    fullWidth: boolean
    disabled: boolean
    label: string
}) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: props.fullWidth ? '100%' : 'auto',
                maxWidth: '360px',
                margin: '0 auto',
            }}
        >
            <ButtonLink
                href="#demo"
                variant={props.variant}
                size={props.size}
                fullWidth={props.fullWidth}
                disabled={props.disabled}
            >
                {props.label}
            </ButtonLink>
        </div>
    )
}

const buttonLinkPlayground = (
    <ComponentPlayground<{
        variant: 'primary' | 'secondary' | 'ghost' | 'danger'
        size: 'sm' | 'md' | 'lg'
        fullWidth: boolean
        disabled: boolean
        label: string
    }>
        componentName="ButtonLink"
        importCode="import { ButtonLink } from '@monority/ui/button-link'"
        getCode={(p) => {
            const propsStr = [
                '  href="/documentation"',
                p.variant !== 'secondary' ? `  variant="${p.variant}"` : '',
                p.size !== 'md' ? `  size="${p.size}"` : '',
                p.fullWidth ? '  fullWidth' : '',
                p.disabled ? '  disabled' : '',
            ]
                .filter(Boolean)
                .join('\n')

            return `import { ButtonLink } from '@monority/ui/button-link'\n\n<ButtonLink\n${propsStr}\n>\n  ${p.label}\n</ButtonLink>`
        }}
        controls={[
            {
                name: 'label',
                type: 'text',
                label: 'Libelle du lien',
                defaultValue: 'Consulter le guide',
            },
            {
                name: 'variant',
                type: 'select',
                label: 'Variante visuelle',
                defaultValue: 'primary',
                options: [
                    { value: 'primary', label: 'Primary' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'ghost', label: 'Ghost' },
                    { value: 'danger', label: 'Danger' },
                ],
            },
            {
                name: 'size',
                type: 'select',
                label: 'Dimension (size)',
                defaultValue: 'md',
                options: [
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                ],
            },
            {
                name: 'fullWidth',
                type: 'boolean',
                label: 'Pleine largeur (fullWidth)',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Desactive (disabled)',
                defaultValue: false,
            },
        ]}
        render={(props) => <ButtonLinkPlaygroundDemo {...props} />}
    />
)

const docData: DocPageData = {
    title: 'ButtonLink',
    description:
        'A navigation anchor styled consistently with Button. Combines link semantics with button visuals.',
    importCode: "import { ButtonLink } from '@monority/ui/button-link'",
    usageCode: '<ButtonLink href="/docs">Documentation</ButtonLink>',
    preview: () => <ButtonLinkBasicPreview />,
    playground: buttonLinkPlayground,
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
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Link content.',
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
        '--mr-radius-control-md',
        '--mr-size-control-sm',
        '--mr-size-control-md',
        '--mr-size-control-lg',
    ],
    keyboardNavigation: [
        {
            key: 'Enter',
            action: 'Active le lien hypertexte et declenche la navigation.',
            context: 'Lien focalise',
        },
        {
            key: 'Tab',
            action: 'Deplace le focus vers le lien ou element interactif suivant.',
            context: 'Navigation au clavier',
        },
    ],
    a11y: [
        'Native <a> element with href semantics.',
        'Uses aria-disabled="true" when disabled to keep it in focus order.',
        'Visible focus indicator via focus-visible.',
    ],
}

export function ButtonLinkDocs() {
    return <DocPage doc={docData} />
}
