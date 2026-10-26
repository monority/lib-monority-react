import { Button, type ButtonSize, type ButtonVariant } from '@monority/ui/button'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { buttonI18n } from './Button.messages'
import {
    ButtonBasicPreview,
    ButtonCopyExample,
    ButtonFullWidthExample,
    ButtonIconOnlyExample,
    ButtonIconsExample,
    ButtonLoadingExample,
    ButtonSizesExample,
    ButtonVariantsExample,
} from './Button.examples'

const buttonPlayground = (
    <ComponentPlayground<{
        variant: ButtonVariant
        size: ButtonSize
        disabled: boolean
        loading: boolean
        children: string
    }>
        componentName="Button"
        importCode="import { Button } from '@monority/ui/button'"
        controls={[
            {
                name: 'variant',
                type: 'select',
                label: 'Variant',
                options: ['primary', 'secondary', 'muted', 'ghost', 'subtle', 'danger', 'warning'],
                defaultValue: 'primary',
            },
            {
                name: 'size',
                type: 'select',
                label: 'Size',
                options: ['sm', 'md', 'lg'],
                defaultValue: 'md',
            },
            {
                name: 'loading',
                type: 'boolean',
                label: 'Loading',
                defaultValue: false,
            },
            {
                name: 'disabled',
                type: 'boolean',
                label: 'Disabled',
                defaultValue: false,
            },
            {
                name: 'children',
                type: 'text',
                label: 'Button label',
                defaultValue: 'Run an action',
            },
        ]}
        render={(props) => (
            <Button
                variant={props.variant}
                size={props.size}
                loading={props.loading}
                disabled={props.disabled}
            >
                {props.children}
            </Button>
        )}
    />
)

const docData: DocPageData = {
    title: 'Button',
    description:
        'A unified action component. Supports text, icons, loading, copy-to-clipboard, and icon-only modes.',
    importCode: "import { Button } from '@monority/ui/button'",
    usageCode: '<Button>Button</Button>',
    preview: () => <ButtonBasicPreview />,
    playground: buttonPlayground,
    examples: [
        { title: 'Variants', content: <ButtonVariantsExample /> },
        { title: 'Sizes', content: <ButtonSizesExample /> },
        { title: 'Loading', content: <ButtonLoadingExample /> },
        { title: 'With Icons', content: <ButtonIconsExample /> },
        { title: 'Copy Mode', content: <ButtonCopyExample /> },
        { title: 'Icon Only', content: <ButtonIconOnlyExample /> },
        { title: 'Full Width', content: <ButtonFullWidthExample /> },
    ],
    props: [
        {
            name: 'variant',
            type: "'primary' | 'secondary' | 'muted' | 'ghost' | 'subtle' | 'danger' | 'warning'",
            defaultValue: "'primary'",
            description: 'Visual intent.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Control density.',
        },
        {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables action and marks busy state.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Native disabled state (independent of loading).',
        },
        {
            name: 'fullWidth',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Stretches button to container width.',
        },
        {
            name: 'as',
            type: 'ElementType',
            defaultValue: "'button'",
            description: 'Render as a different element (a, span, etc.).',
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
        {
            name: 'type',
            type: "'button' | 'submit' | 'reset'",
            defaultValue: "'button'",
            description: 'Native button type attribute.',
        },
        {
            name: 'copyValue',
            type: 'string',
            defaultValue: '-',
            description: 'Enables copy mode. Copies this text on click.',
        },
        {
            name: 'copiedLabel',
            type: 'string',
            defaultValue: "'Copied!'",
            description: 'Label shown briefly after copying.',
        },
        {
            name: 'duration',
            type: 'number',
            defaultValue: '2000',
            description: 'Duration (ms) to show copied label.',
        },
        {
            name: 'iconOnly',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Icon-only mode: fixed w/h, requires aria-label.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Button label content.',
        },
    ],
    cssHooks: [
        '.mr-btn',
        '.mr-btn__icon',
        '.mr-btn__label',
        '[data-variant]',
        '[data-size]',
        '[data-loading]',
        '[data-disabled]',
        '[data-full-width]',
        '[data-copied]',
        '[data-icon-only]',
    ],
    tokens: [
        '--mr-accent-solid',
        '--mr-accent-contrast',
        '--mr-accent-strong',
        '--mr-border-subtle',
        '--mr-bg-surface-strong',
        '--mr-bg-surface',
        '--mr-accent-subtle',
        '--mr-bg-raised',
        '--mr-text-primary',
        '--mr-text-primary',
        '--mr-danger',
        '--mr-success',
        '--mr-space-*',
        '--mr-text-*',
        '--mr-radius-sm',
        '--mr-dur-150',
        '--mr-ease-in-out',
    ],
    keyboardNavigation: [
        {
            key: 'Space',
            action: 'Activates the button on key release.',
            context: 'Focus on the button',
        },
        {
            key: 'Enter',
            action: 'Triggers the action associated with the button immediately.',
            context: 'Focus on the button',
        },
        {
            key: 'Tab',
            action: 'Moves focus sequentially into or out of the button.',
            context: 'Global navigation',
        },
    ],
    a11y: [
        'Native <button> semantics by default.',
        'Supports aria-busy during loading.',
        'Icon-only mode REQUIRES an aria-label for screen readers.',
        'Visible focus ring via shared focus tokens.',
    ],
    i18n: buttonI18n,
}

export function ButtonDocs() {
    return <DocPage doc={docData} />
}
