import { DocPage, type DocPageData } from '../DocPage'
import { Accordion } from '@monority/ui'
import { AccordionBasicExample } from './Accordion.examples'

const docData: DocPageData = {
  title: 'Accordion',
  description: "Expandable and collapsible sections for showing/hiding content.",
  importCode: "import { Accordion } from '@monority/ui'",
  usageCode: `<Accordion items={[
  { title: 'Section 1', content: <p>Content</p> },
  { title: 'Section 2', content: <p>Content</p> },
]} />`,
  preview: () => <AccordionBasicExample />,
  props: [
    { name: 'items', type: `{ value: string; title: ReactNode; content: ReactNode }[]`, defaultValue: "[]", description: "Accordion sections." },
    { name: 'defaultValue', type: `string | string[]`, defaultValue: "-", description: "Default expanded value(s)." },
    { name: 'value', type: `string | string[]`, defaultValue: "-", description: "Controlled expanded value(s)." },
    { name: 'onChange', type: `(value: string | string[]) => void`, defaultValue: "-", description: "Expand change callback." },
    { name: 'allowMultiple', type: `boolean`, defaultValue: "false", description: "Allow multiple sections open." },
    { name: 'collapsible', type: `boolean`, defaultValue: "false", description: "Allow closing the active section." }
  ],
}

export function AccordionDocs() {
  return <DocPage doc={docData} />
}
