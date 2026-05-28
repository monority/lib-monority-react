import { DocPage, type DocPageData } from '../DocPage'
import {
  BreadcrumbBasicExample,
  BreadcrumbManyItemsExample,
  BreadcrumbSingleItemExample,
} from './Breadcrumb.examples'

const docData: DocPageData = {
  title: 'Breadcrumb',
  description: 'Breadcrumb trail with nav and ordered list semantics. Displays the current page location within a hierarchy.',
  importCode: "import { Breadcrumb } from '@monority/ui/breadcrumb'",
  usageCode: `<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Monority UI' },
  ]}
/>`,
  preview: () => <BreadcrumbBasicExample />,
  examples: [
    { title: 'Many Items', content: <BreadcrumbManyItemsExample /> },
    { title: 'Single Item', content: <BreadcrumbSingleItemExample /> },
  ],
  props: [
    { name: 'items', type: '{ label: ReactNode; href?: string }[]', defaultValue: '[]', description: 'Ordered breadcrumb trail items. Last item is rendered as current page (no href).' },
    { name: 'className', type: 'string', defaultValue: '-', description: 'Additional CSS class names.' },
  ],
  cssHooks: [
    '.mr-breadcrumb', '.mr-breadcrumb__list', '.mr-breadcrumb__item',
    '.mr-breadcrumb__link', '.mr-breadcrumb__current', '.mr-breadcrumb__separator',
  ],
  tokens: [
    '--mr-fg-muted', '--mr-fg-base', '--mr-text-sm',
    '--mr-space-*', '--mr-radius-sm',
  ],
  a11y: [
    'Renders as <nav> with aria-label="Breadcrumb".',
    'Last item uses aria-current="page".',
    'Separators are hidden from screen readers via aria-hidden.',
    'Semantic <ol> / <li> structure for ordered navigation.',
  ],
}

export function BreadcrumbDocs() {
  return <DocPage doc={docData} />
}
