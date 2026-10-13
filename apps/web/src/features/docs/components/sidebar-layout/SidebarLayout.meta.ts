export const sidebarLayoutMeta = {
    title: 'SidebarLayout',
    status: 'stable',
    package: '@monority/ui/sidebar-layout',
    import: "import { SidebarLayout } from '@monority/ui'",
    category: 'navigation',
    anatomy: ['root', 'sidebar', 'main', 'header', 'content'],
    accessibility: [
        'nav landmark for sidebar navigation',
        'main landmark for primary content',
        'Supports collapse and expand state with aria-expanded',
    ],
}
