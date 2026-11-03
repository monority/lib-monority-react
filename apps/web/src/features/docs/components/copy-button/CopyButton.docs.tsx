import { CopyButton } from '@monority/ui/copy-button'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    CopyButtonCustomFeedbackExample,
    CopyButtonDisabledExample,
    CopyButtonSizesExample,
    CopyButtonVariantsExample,
} from './CopyButton.examples'
import { copyButtonI18n } from './CopyButton.messages'

function CopyButtonPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [variant, setVariant] = useState<'subtle' | 'outline' | 'solid'>('subtle')
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
    const [label, setLabel] = useState(isFr ? 'Copier le lien' : 'Copy link')
    const [disabled, setDisabled] = useState(false)

    const snippet = `<CopyButton
  value="https://monority.dev/components"
  variant="${variant}"
  size="${size}"
  label="${label}"${disabled ? '\n  disabled' : ''}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: isFr ? 'Variante' : 'Variant',
                    value: variant,
                    options: [
                        { value: 'subtle', label: 'Subtle' },
                        { value: 'outline', label: 'Outline' },
                        { value: 'solid', label: 'Solid' },
                    ],
                    onChange: (v) => setVariant(v as 'subtle' | 'outline' | 'solid'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Taille' : 'Size',
                    value: size,
                    options: [
                        { value: 'sm', label: isFr ? 'Petite (sm)' : 'Small (sm)' },
                        { value: 'md', label: isFr ? 'Moyenne (md)' : 'Medium (md)' },
                        { value: 'lg', label: isFr ? 'Grande (lg)' : 'Large (lg)' },
                    ],
                    onChange: (v) => setSize(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'text',
                    label: isFr ? 'Libellé' : 'Label',
                    value: label,
                    onChange: setLabel,
                },
                {
                    type: 'boolean',
                    label: isFr ? 'Désactivé' : 'Disabled',
                    value: disabled,
                    onChange: setDisabled,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 96,
                }}
            >
                <CopyButton
                    value="https://monority.dev/components"
                    variant={variant}
                    size={size}
                    label={label}
                    disabled={disabled}
                />
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'CopyButton',
    description:
        'A dedicated action button that copies text to the clipboard with accessible visual feedback.',
    importCode: "import { CopyButton } from '@monority/ui/copy-button'",
    usageCode: '<CopyButton value="https://example.com" label="Share Link" />',
    preview: () => <CopyButtonPlayground />,
    examples: [
        { title: 'Variants', content: <CopyButtonVariantsExample /> },
        { title: 'Sizes', content: <CopyButtonSizesExample /> },
        { title: 'Custom Feedback', content: <CopyButtonCustomFeedbackExample /> },
        { title: 'Disabled', content: <CopyButtonDisabledExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'The text copied to the clipboard when clicked.',
        },
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Initial label displayed on the button.',
        },
        {
            name: 'copiedLabel',
            type: 'string',
            defaultValue: "'Copied!'",
            description: 'Label displayed temporarily after copying.',
        },
        {
            name: 'duration',
            type: 'number',
            defaultValue: '2000',
            description: 'Duration in milliseconds for the copied state.',
        },
        {
            name: 'variant',
            type: "'subtle' | 'outline' | 'solid'",
            defaultValue: "'subtle'",
            description: 'Visual presentation variant.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Button size density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables button interactions.',
        },
    ],
    cssHooks: ['.mr-btn', '[data-variant]', '[data-size]'],
    tokens: [
        '--mr-bg-accent',
        '--mr-fg-on-accent',
        '--mr-border-base',
        '--mr-radius-md',
        '--mr-space-2',
    ],
    keyboardNavigation: [
        { key: 'Enter', action: 'Copies value to clipboard.' },
        { key: 'Space', action: 'Copies value to clipboard.' },
        { key: 'Tab', action: 'Moves focus to the button.' },
    ],
    a11y: [
        'Native button element with keyboard activation (Space and Enter).',
        'Clear feedback text upon successful copy.',
        'Accessible focus indicators via focus-visible.',
    ],
    i18n: copyButtonI18n,
}

export function CopyButtonDocs() {
    return <DocPage doc={docData} />
}
