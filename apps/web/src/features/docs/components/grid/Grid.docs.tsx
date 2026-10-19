import { Grid } from '@monority/ui/grid'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { GridColumnsExample } from './Grid.examples'

function GridPlayground() {
    const [columns, setColumns] = useState<'1' | '2' | '3' | '4'>('3')
    const [itemCount, setItemCount] = useState<'4' | '6' | '8'>('6')

    const colsValue = Number(columns) as 1 | 2 | 3 | 4
    const count = Number(itemCount)

    const snippet = `<Grid columns={${colsValue}}>
${Array.from({ length: count }, (_, i) => `  <div className="card">Élément ${i + 1}</div>`).join('\n')}
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
                    label: 'Nombre de colonnes',
                    value: columns,
                    options: [
                        { value: '1', label: '1 colonne' },
                        { value: '2', label: '2 colonnes' },
                        { value: '3', label: '3 colonnes' },
                        { value: '4', label: '4 colonnes' },
                    ],
                    onChange: (v) => setColumns(v as '1' | '2' | '3' | '4'),
                },
                {
                    type: 'select',
                    label: 'Nombre de blocs',
                    value: itemCount,
                    options: [
                        { value: '4', label: '4 blocs' },
                        { value: '6', label: '6 blocs' },
                        { value: '8', label: '8 blocs' },
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
                            Élément {i + 1}
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
    importCode: "import { Grid } from '@monority/ui'",
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
}

export function GridDocs() {
    return <DocPage doc={docData} />
}
