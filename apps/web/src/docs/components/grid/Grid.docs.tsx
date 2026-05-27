import { DocPage, type DocPageData } from '../DocPage'
import { Grid } from '@monority/ui'
import { GridBasicExample } from './Grid.examples'

const docData: DocPageData = {
  title: 'Grid',
  description: "CSS grid container with configurable column count.",
  importCode: "import { Grid } from '@monority/ui'",
  usageCode: `<Grid columns={2}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>`,
  preview: () => <GridBasicExample />,
  props: [
    { name: 'columns', type: `1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'`, defaultValue: "2", description: "Number of grid columns." }
  ],
}

export function GridDocs() {
  return <DocPage doc={docData} />
}
