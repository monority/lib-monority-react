import { useState } from 'react'
import { CopyButton } from '@monority/ui/copy-button'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    CopyButtonBasicPreview,
    CopyButtonVariantsExample,
    CopyButtonSizesExample,
    CopyButtonCustomFeedbackExample,
    CopyButtonDisabledExample,
} from './CopyButton.examples'

function CopyButtonPlayground() {
    const [variant, setVariant] = useState<'subtle' | 'outline' | 'solid'>('subtle')
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
    const [label, setLabel] = useState('Copier le lien')
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
                    label: 'Variante',
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
                    label: 'Size',
                    value: size,
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                    onChange: (v) => setSize(v as 'sm' | 'md' | 'lg'),
                },
                {
                    type: 'text',
                    label: 'Label',
                    value: label,
                    onChange: setLabel,
                },
                {
                    type: 'boolean',
                    label: 'Disabled',
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
        { key: 'Enter', action: 'Copie la valeur dans le presse-papiers' },
        { key: 'Space', action: 'Copie la valeur dans le presse-papiers' },
        { key: 'Tab', action: 'Déplace le focus sur le bouton' },
    ],
    a11y: [
        'Native button element with keyboard activation (Space and Enter).',
        'Clear feedback text upon successful copy.',
        'Accessible focus indicators via focus-visible.',
    ],
}

export function CopyButtonDocs() {
    return <DocPage doc={docData} />
}
