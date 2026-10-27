import { Stack } from '@monority/ui/stack'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { StackGapExample, StackHorizontalExample } from './Stack.examples'
import { stackI18n } from './Stack.messages'

function StackPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [direction, setDirection] = useState<'vertical' | 'horizontal'>('horizontal')
    const [gap, setGap] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
    const [align, setAlign] = useState<'stretch' | 'start' | 'center' | 'end'>('center')
    const [justify, setJustify] = useState<'start' | 'center' | 'end' | 'between'>('center')

    const block1 = isFr ? 'Bloc 1' : 'Block 1'
    const block2 = isFr ? 'Bloc 2' : 'Block 2'
    const block3 = isFr ? 'Bloc 3' : 'Block 3'

    const snippet = `<Stack
  direction="${direction}"
  gap="${gap}"
  align="${align}"
  justify="${justify}"
>
  <div className="box">${block1}</div>
  <div className="box">${block2}</div>
  <div className="box">${block3}</div>
</Stack>`

    const itemStyle = {
        padding: '12px 20px',
        background: 'var(--mr-accent-subtle, #e0e7ff)',
        border: '1px solid var(--mr-border-default, #c7d2fe)',
        borderRadius: 6,
        color: 'var(--mr-text-primary, #1e1b4b)',
        fontWeight: 500,
        fontSize: '0.875rem',
    }

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Direction',
                    value: direction,
                    options: [
                        {
                            value: 'horizontal',
                            label: isFr ? 'Horizontal (ligne)' : 'Horizontal (row)',
                        },
                        {
                            value: 'vertical',
                            label: isFr ? 'Vertical (colonne)' : 'Vertical (column)',
                        },
                    ],
                    onChange: (v) => setDirection(v as 'vertical' | 'horizontal'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Espacement (gap)' : 'Spacing (gap)',
                    value: gap,
                    options: [
                        { value: 'xs', label: isFr ? 'Très compact (xs)' : 'Extra small (xs)' },
                        { value: 'sm', label: isFr ? 'Compact (sm)' : 'Small (sm)' },
                        { value: 'md', label: isFr ? 'Normal (md)' : 'Medium (md)' },
                        { value: 'lg', label: isFr ? 'Généreux (lg)' : 'Large (lg)' },
                        { value: 'xl', label: isFr ? 'Très spacieux (xl)' : 'Extra large (xl)' },
                    ],
                    onChange: (v) => setGap(v as 'xs' | 'sm' | 'md' | 'lg' | 'xl'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Alignement secondaire (align)' : 'Cross-axis alignment (align)',
                    value: align,
                    options: [
                        { value: 'center', label: isFr ? 'Centre (center)' : 'Center' },
                        { value: 'start', label: isFr ? 'Début (start)' : 'Start' },
                        { value: 'end', label: isFr ? 'Fin (end)' : 'End' },
                        { value: 'stretch', label: isFr ? 'Étiré (stretch)' : 'Stretch' },
                    ],
                    onChange: (v) => setAlign(v as 'stretch' | 'start' | 'center' | 'end'),
                },
                {
                    type: 'select',
                    label: isFr
                        ? 'Distribution principale (justify)'
                        : 'Main-axis distribution (justify)',
                    value: justify,
                    options: [
                        { value: 'center', label: isFr ? 'Centre (center)' : 'Center' },
                        { value: 'start', label: isFr ? 'Début (start)' : 'Start' },
                        { value: 'end', label: isFr ? 'Fin (end)' : 'End' },
                        {
                            value: 'between',
                            label: isFr ? 'Espace réparti (between)' : 'Space between (between)',
                        },
                    ],
                    onChange: (v) => setJustify(v as 'start' | 'center' | 'end' | 'between'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    width: '100%',
                    minHeight: 140,
                    padding: 16,
                    background: 'var(--mr-bg-sunken, #f8fafc)',
                    borderRadius: 8,
                    display: 'flex',
                }}
            >
                <Stack
                    direction={direction}
                    gap={gap}
                    align={align}
                    justify={justify}
                    style={{ width: '100%' }}
                >
                    <div style={itemStyle}>{block1}</div>
                    <div style={itemStyle}>{block2}</div>
                    <div style={itemStyle}>{block3}</div>
                </Stack>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Stack',
    description:
        'Flex layout primitive for vertical or horizontal grouping, spacing, alignment, and framed content blocks.',
    importCode: "import { Stack } from '@monority/ui/stack'",
    usageCode: `<Stack gap="md" direction="vertical">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>`,
    preview: () => <StackPlayground />,
    examples: [
        { title: 'Gap sizes', content: <StackGapExample /> },
        { title: 'Horizontal', content: <StackHorizontalExample /> },
    ],
    props: [
        {
            name: 'gap',
            type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
            defaultValue: "'md'",
            description: 'Gap between children.',
        },
        {
            name: 'direction',
            type: `'vertical' | 'horizontal'`,
            defaultValue: "'vertical'",
            description: 'Main axis direction.',
        },
        {
            name: 'align',
            type: `'stretch' | 'start' | 'center' | 'end'`,
            defaultValue: "'stretch'",
            description: 'Cross-axis alignment.',
        },
        {
            name: 'justify',
            type: `'start' | 'center' | 'end' | 'between'`,
            defaultValue: "'start'",
            description: 'Main-axis distribution.',
        },
    ],
    cssHooks: ['.mr-stack', '[data-gap]', '[data-align]', '[data-justify]'],
    tokens: ['--mr-space-*'],
    a11y: ['Structural layout component.', 'No interactive semantics by default.'],
    i18n: stackI18n,
}

export function StackDocs() {
    return <DocPage doc={docData} />
}
