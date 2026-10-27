import { Text, type TextSize, type TextTone } from '@monority/ui/text'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { textI18n } from './Text.messages'
import { TextAsExample, TextSizesExample, TextTonesExample } from './Text.examples'

function TextPlayground() {
    return (
        <ComponentPlayground
            componentName="Text"
            controls={[
                {
                    type: 'select',
                    name: 'size',
                    prop: 'size',
                    label: 'Size',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                        { value: 'lg', label: 'Large (lg)' },
                    ],
                },
                {
                    type: 'select',
                    name: 'tone',
                    prop: 'tone',
                    label: 'Tone',
                    defaultValue: 'base',
                    options: [
                        { value: 'base', label: 'Base (default)' },
                        { value: 'muted', label: 'Muted' },
                        { value: 'strong', label: 'Strong' },
                        { value: 'accent', label: 'Primary accent' },
                        { value: 'success', label: 'Success' },
                        { value: 'warning', label: 'Warning' },
                        { value: 'danger', label: 'Danger' },
                    ],
                },
                {
                    type: 'select',
                    name: 'as',
                    prop: 'as',
                    label: 'HTML element (as)',
                    defaultValue: 'p',
                    options: ['p', 'span', 'div'],
                },
                {
                    type: 'text',
                    name: 'content',
                    prop: 'content',
                    label: 'Text content',
                    defaultValue:
                        'The Monority design system unifies CSS tokens, fluid motion, and typographic rigor.',
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
    i18n: textI18n,
}

export function TextDocs() {
    return <DocPage doc={docData} />
}
