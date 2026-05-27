import { DocPage, type DocPageData } from '../DocPage'
import { SearchInput } from '@monority/ui'
import { SearchInputBasicExample } from './SearchInput.examples'

const docData: DocPageData = {
  title: 'SearchInput',
  description: "Search input with search icon and clear button.",
  importCode: "import { SearchInput } from '@monority/ui'",
  usageCode: `<SearchInput label="Search" placeholder="Search..." />`,
  preview: () => <SearchInputBasicExample />,
  props: [
    { name: 'label', type: `ReactNode`, defaultValue: "-", description: "Field label." },
    { name: 'hint', type: `ReactNode`, defaultValue: "-", description: "Helpful description." },
    { name: 'error', type: `ReactNode`, defaultValue: "-", description: "Error message." },
    { name: 'value', type: `string`, defaultValue: "-", description: "Controlled value." },
    { name: 'defaultValue', type: `string`, defaultValue: "-", description: "Default value." },
    { name: 'placeholder', type: `string`, defaultValue: "-", description: "Input placeholder." },
    { name: 'required', type: `boolean`, defaultValue: "false", description: "Required field indicator." }
  ],
}

export function SearchInputDocs() {
  return <DocPage doc={docData} />
}
