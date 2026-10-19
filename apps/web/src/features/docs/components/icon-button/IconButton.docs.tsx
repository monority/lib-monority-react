import { IconButton } from '@monority/ui/icon-button'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    IconButtonSizesExample,
    IconButtonStatesExample,
    IconButtonTonesExample,
} from './IconButton.examples'

function IconButtonPlayground() {
    const [tone, setTone] = useState<'neutral' | 'accent' | 'danger'>('neutral')
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [iconType, setIconType] = useState<'search' | 'close' | 'trash'>('search')

    const iconSvg =
        iconType === 'search' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path
                    d="M11 11L14.5 14.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ) : iconType === 'close' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                    d="M3 4H13M5 4V3C5 2.45 5.45 2 6 2H10C10.55 2 11 2.45 11 3V4M6 7V12M10 7V12M4 4L5 14H11L12 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        )

    const label =
        iconType === 'search' ? 'Rechercher' : iconType === 'close' ? 'Fermer' : 'Supprimer'
    const iconName =
        iconType === 'search'
            ? '<SearchIcon />'
            : iconType === 'close'
              ? '<CloseIcon />'
              : '<TrashIcon />'

    const snippet = `<IconButton
  tone="${tone}"
  size="${size}"
  label="${label}"${disabled ? '\n  disabled' : ''}${loading ? '\n  loading' : ''}
>
  ${iconName}
</IconButton>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Tone',
                    value: tone,
                    options: [
                        { value: 'neutral', label: 'Neutral' },
                        { value: 'accent', label: 'Accent' },
                        { value: 'danger', label: 'Danger' },
                    ],
                    onChange: (v) => setTone(v as 'neutral' | 'accent' | 'danger'),
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
                    type: 'select',
                    label: 'Icône',
                    value: iconType,
                    options: [
                        { value: 'search', label: 'Recherche' },
                        { value: 'close', label: 'Fermer' },
                        { value: 'trash', label: 'Supprimer' },
                    ],
                    onChange: (v) => setIconType(v as 'search' | 'close' | 'trash'),
                },
                {
                    type: 'boolean',
                    label: 'Disabled',
                    value: disabled,
                    onChange: setDisabled,
                },
                {
                    type: 'boolean',
                    label: 'Loading',
                    value: loading,
                    onChange: setLoading,
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
                <IconButton
                    tone={tone}
                    size={size}
                    label={label}
                    disabled={disabled}
                    loading={loading}
                >
                    {iconSvg}
                </IconButton>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'IconButton',
    description:
        'A compact, square button designed exclusively for icon triggers with mandatory accessible labels.',
    importCode: "import { IconButton } from '@monority/ui/icon-button'",
    usageCode: '<IconButton label="Close"><CloseIcon /></IconButton>',
    preview: () => <IconButtonPlayground />,
    examples: [
        { title: 'Tones', content: <IconButtonTonesExample /> },
        { title: 'Sizes', content: <IconButtonSizesExample /> },
        { title: 'States', content: <IconButtonStatesExample /> },
    ],
    props: [
        {
            name: 'label',
            type: 'string',
            defaultValue: '-',
            description: 'Required accessible label passed directly to aria-label.',
        },
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'The icon element to render inside the button.',
        },
        {
            name: 'tone',
            type: "'neutral' | 'accent' | 'danger'",
            defaultValue: "'neutral'",
            description: 'Visual semantic tone of the button.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Dimensions and padding density.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Disables user interactions.',
        },
        {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Displays a loading indicator and marks the button busy.',
        },
    ],
    cssHooks: ['.mr-btn', '[data-tone]', '[data-size]'],
    tokens: ['--mr-radius-md', '--mr-space-2', '--mr-space-3', '--mr-border-base'],
    keyboardNavigation: [
        { key: 'Enter', action: 'Active le bouton' },
        { key: 'Space', action: 'Active le bouton' },
        { key: 'Tab', action: 'Déplace le focus vers le bouton' },
    ],
    a11y: [
        'Requires a descriptive label prop mapped to aria-label.',
        'Icon contents should have aria-hidden="true" to avoid screen reader clutter.',
        'Visible focus indicator conforms to WCAG 2.4.7.',
    ],
}

export function IconButtonDocs() {
    return <DocPage doc={docData} />
}
