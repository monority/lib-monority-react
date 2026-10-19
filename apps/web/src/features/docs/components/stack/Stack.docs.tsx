import { Stack } from '@monority/ui/stack'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { StackGapExample, StackHorizontalExample } from './Stack.examples'

function StackPlayground() {
    const [direction, setDirection] = useState<'vertical' | 'horizontal'>('horizontal')
    const [gap, setGap] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md')
    const [align, setAlign] = useState<'stretch' | 'start' | 'center' | 'end'>('center')
    const [justify, setJustify] = useState<'start' | 'center' | 'end' | 'between'>('center')

    const snippet = `<Stack
  direction="${direction}"
  gap="${gap}"
  align="${align}"
  justify="${justify}"
>
  <div className="box">Bloc 1</div>
  <div className="box">Bloc 2</div>
  <div className="box">Bloc 3</div>
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
                        { value: 'horizontal', label: 'Horizontal (ligne)' },
                        { value: 'vertical', label: 'Vertical (colonne)' },
                    ],
                    onChange: (v) => setDirection(v as 'vertical' | 'horizontal'),
                },
                {
                    type: 'select',
                    label: 'Espacement (gap)',
                    value: gap,
                    options: [
                        { value: 'xs', label: 'Très compact (xs)' },
                        { value: 'sm', label: 'Compact (sm)' },
                        { value: 'md', label: 'Normal (md)' },
                        { value: 'lg', label: 'Généreux (lg)' },
                        { value: 'xl', label: 'Très spacieux (xl)' },
                    ],
                    onChange: (v) => setGap(v as 'xs' | 'sm' | 'md' | 'lg' | 'xl'),
                },
                {
                    type: 'select',
                    label: 'Alignement secondaire (align)',
                    value: align,
                    options: [
                        { value: 'center', label: 'Centre (center)' },
                        { value: 'start', label: 'Début (start)' },
                        { value: 'end', label: 'Fin (end)' },
                        { value: 'stretch', label: 'Étiré (stretch)' },
                    ],
                    onChange: (v) => setAlign(v as 'stretch' | 'start' | 'center' | 'end'),
                },
                {
                    type: 'select',
                    label: 'Distribution principale (justify)',
                    value: justify,
                    options: [
                        { value: 'center', label: 'Centre (center)' },
                        { value: 'start', label: 'Début (start)' },
                        { value: 'end', label: 'Fin (end)' },
                        { value: 'between', label: 'Espace réparti (between)' },
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
                    <div style={itemStyle}>Bloc 1</div>
                    <div style={itemStyle}>Bloc 2</div>
                    <div style={itemStyle}>Bloc 3</div>
                </Stack>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Stack',
    description:
        'Flex layout primitive for vertical or horizontal grouping, spacing, alignment, and framed content blocks.',
    importCode: "import { Stack } from '@monority/ui'",
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
}

export function StackDocs() {
    return <DocPage doc={docData} />
}
