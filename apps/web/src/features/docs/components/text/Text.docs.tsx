import { Text, type TextSize, type TextTone } from '@monority/ui/text'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { TextAsExample, TextSizesExample, TextTonesExample } from './Text.examples'

function TextPlayground() {
    return (
        <ComponentPlayground
            componentName="Text"
            controls={[
                {
                    type: 'select',
                    prop: 'size',
                    label: 'Taille (size)',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Petite (sm)' },
                        { value: 'md', label: 'Moyenne (md)' },
                        { value: 'lg', label: 'Grande (lg)' },
                    ],
                },
                {
                    type: 'select',
                    prop: 'tone',
                    label: 'Nuance (tone)',
                    defaultValue: 'base',
                    options: [
                        { value: 'base', label: 'Base (défaut)' },
                        { value: 'muted', label: 'Atténuée (muted)' },
                        { value: 'strong', label: 'Accentuation (strong)' },
                        { value: 'accent', label: 'Accent primaire (accent)' },
                        { value: 'success', label: 'Succès (success)' },
                        { value: 'warning', label: 'Avertissement (warning)' },
                        { value: 'danger', label: 'Danger (danger)' },
                    ],
                },
                {
                    type: 'select',
                    prop: 'as',
                    label: 'Élément HTML (as)',
                    defaultValue: 'p',
                    options: ['p', 'span', 'div'],
                },
                {
                    type: 'text',
                    prop: 'content',
                    label: 'Contenu textuel',
                    defaultValue:
                        'Le design system Monority unifie tokens CSS, fluidité et rigueur typographique.',
                },
            ]}
            renderCode={(props) => `<Text
  as="${props.as}"
  size="${props.size}"
  tone="${props.tone}"
>
  ${props.content}
</Text>`}
        >
            {(props) => (
                <div style={{ maxWidth: 540 }}>
                    <Text
                        as={props.as as 'p' | 'span' | 'div'}
                        size={props.size as TextSize}
                        tone={props.tone as TextTone}
                    >
                        {props.content as string}
                    </Text>
                </div>
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Text',
    description:
        'Polymorphic text component with tone and size variants. Combine with Title for rich typographic layouts.',
    importCode: "import { Text } from '@monority/ui/text'",
    usageCode: `<Text as="p" tone="base" size="md">
  Body text for paragraphs and descriptions.
</Text>
<Text as="span" tone="muted" size="sm">
  Captions and secondary information
</Text>`,
    playground: <TextPlayground />,
    preview: () => <TextPlayground />,
    examples: [
        { title: 'Sizes', content: <TextSizesExample /> },
        { title: 'Tones', content: <TextTonesExample /> },
        { title: 'As prop', content: <TextAsExample /> },
    ],
    props: [
        {
            name: 'as',
            type: "'p' | 'span' | 'div'",
            defaultValue: "'p'",
            description: 'Polymorphic element type.',
        },
        {
            name: 'tone',
            type: "'muted' | 'base' | 'strong'",
            defaultValue: '-',
            description: 'Text tone / emphasis level.',
        },
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: '-',
            description: 'Text size preset.',
        },
        { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Text content.' },
    ],
    cssHooks: ['.mr-text', '[data-size]', '[data-tone]'],
    tokens: ['--mr-text-primary', '--mr-text-secondary', '--mr-text-*'],
    a11y: [
        'Use concise text.',
        'Tone variants use color -- avoid color-only meaning for critical states.',
    ],
}

export function TextDocs() {
    return <DocPage doc={docData} />
}
