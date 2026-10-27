import { Grid } from '@monority/ui/grid'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { gridI18n } from './Grid.messages'
import { GridColumnsExample } from './Grid.examples'

function GridPlayground() {
    const [columns, setColumns] = useState<'1' | '2' | '3' | '4'>('3')
    const [itemCount, setItemCount] = useState<'4' | '6' | '8'>('6')

    const colsValue = Number(columns) as 1 | 2 | 3 | 4
    const count = Number(itemCount)

    const snippet = `<Grid columns={${colsValue}}>
${Array.from({ length: count }, (_, i) => `  <div className="card">Item ${i + 1}</div>`).join('\n')}
</Grid>`

    const itemStyle = {
        padding: '16px',
        background: 'var(--mr-bg-surface, #ffffff)',
        border: '1px solid var(--mr-border-subtle, #e2e8f0)',
        borderRadius: 8,
        textAlign: 'center' as const,
        fontSize: '0.875rem',
        fontWeight: 500,
        boxShadow: 'var(--mr-shadow-xs, 0 1px 2px rgba(0,0,0,0.05))',
    }

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    name: 'columns',
                    label: 'Columns',
                    value: columns,
                    options: [
                        { value: '1', label: '1 column' },
                        { value: '2', label: '2 columns' },
                        { value: '3', label: '3 columns' },
                        { value: '4', label: '4 columns' },
                    ],
                    onChange: (v) => setColumns(v as '1' | '2' | '3' | '4'),
                },
                {
                    type: 'select',
                    name: 'itemCount',
                    label: 'Item count',
                    value: itemCount,
                    options: [
                        { value: '4', label: '4 items' },
                        { value: '6', label: '6 items' },
                        { value: '8', label: '8 items' },
                    ],
                    onChange: (v) => setItemCount(v as '4' | '6' | '8'),
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
                }}
            >
                <Grid columns={colsValue}>
                    {Array.from({ length: count }, (_, i) => (
                        <div key={i} style={itemStyle}>
                            Item {i + 1}
                        </div>
                    ))}
                </Grid>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Grid',
    description: 'CSS grid container with configurable column count.',
    importCode: "import { Grid } from '@monority/ui/grid'",
    usageCode: `<Grid columns={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>`,
    preview: () => <GridPlayground />,
    examples: [{ title: 'Column counts', content: <GridColumnsExample /> }],
    props: [
        {
            name: 'columns',
            type: `1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'`,
            defaultValue: '2',
            description: 'Number of grid columns.',
        },
    ],
    cssHooks: ['.mr-grid', '[data-cols]', '[data-gap]'],
    tokens: ['--mr-space-*'],
    a11y: ['Structural layout component.', 'No interactive semantics by default.'],
    i18n: gridI18n,
}

export function GridDocs() {
    return <DocPage doc={docData} />
}
