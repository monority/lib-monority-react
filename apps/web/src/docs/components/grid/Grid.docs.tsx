import { DocPage, type DocPageData } from '../DocPage'
import { GridBasicExample, GridColumnsExample } from './Grid.examples'

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
    preview: () => <GridBasicExample />,
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
