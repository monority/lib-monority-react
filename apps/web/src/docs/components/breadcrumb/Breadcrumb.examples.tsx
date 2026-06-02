import { Breadcrumb } from '@monority/ui/breadcrumb'

export function BreadcrumbBasicExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Monority UI' },
      ]}
    />
  )
}

export function BreadcrumbManyItemsExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Workspace', href: '/' },
        { label: 'Docs', href: '/docs' },
        { label: 'Navigation', href: '/docs/components/navigation' },
        { label: 'Shell', href: '/docs/components/navigation/shell' },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}

export function BreadcrumbSingleItemExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Dashboard' },
      ]}
    />
  )
}
