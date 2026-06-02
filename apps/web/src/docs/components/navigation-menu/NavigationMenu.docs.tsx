import { DocPage, type DocPageData } from '../DocPage'
import {
    NavigationMenuBasicExample,
    NavigationMenuWithSubItemsExample,
    NavigationMenuWithIconsExample,
    NavigationMenuDisabledExample,
} from './NavigationMenu.examples'

const docData: DocPageData = {
    title: 'NavigationMenu',
    description:
        'A surfaced product navigation menu for top-level sections, grouped destinations, and richer submenu content.',
    importCode: "import { NavigationMenu } from '@monority/ui'",
    usageCode: `const items = [
  { label: 'Overview', href: '/overview' },
  {
    label: 'Components',
    items: [
      { label: 'Inputs', href: '/components/inputs', description: 'Fields and validation patterns' },
      { label: 'Navigation', href: '/components/navigation', description: 'Menus, tabs, and shells' },
    ],
  },
  { label: 'Changelog', href: '/changelog' },
]

<NavigationMenu items={items} />`,
    preview: () => <NavigationMenuBasicExample />,
    examples: [
        { title: 'With sub-items', content: <NavigationMenuWithSubItemsExample /> },
        { title: 'With icons', content: <NavigationMenuWithIconsExample /> },
        { title: 'Disabled items', content: <NavigationMenuDisabledExample /> },
    ],
    props: [
        {
            name: 'items',
            type: 'NavigationItem[]',
            defaultValue: '[]',
            description: 'Navigation item definitions',
        },
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Controlled active item value',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: '-',
            description: 'Uncontrolled default active item',
        },
        {
            name: 'onValueChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Callback when active item changes',
        },
    ],
    cssHooks: [
        '.mr-nav-menu',
        '.mr-nav-menu__list',
        '.mr-nav-menu__item',
        '.mr-nav-menu__item--active',
        '.mr-nav-menu__item--disabled',
        '.mr-nav-menu__trigger',
        '.mr-nav-menu__link',
        '.mr-nav-menu__link--disabled',
        '.mr-nav-menu__content',
        '.mr-nav-menu__sub-list',
        '.mr-nav-menu__sub-item',
        '.mr-nav-menu__sub-icon',
        '.mr-nav-menu__sub-text',
        '.mr-nav-menu__sub-label',
        '.mr-nav-menu__sub-desc',
        '.mr-nav-menu__chevron',
        '.mr-nav-menu__icon',
        '.mr-nav-menu__indicator',
        '[data-active]',
        '[data-disabled]',
    ],
    tokens: [
        '--mr-space-1',
        '--mr-space-2',
        '--mr-space-3',
        '--mr-radius-sm',
        '--mr-radius-md',
        '--mr-radius-full',
        '--mr-text-xs',
        '--mr-text-sm',
        '--mr-fg-muted',
        '--mr-fg-base',
        '--mr-bg-surface-elevated',
        '--mr-bg-surface-strong',
        '--mr-bg-accent-soft',
        '--mr-border-subtle',
        '--mr-shadow-xs',
        '--mr-shadow-md',
        '--mr-z-dropdown',
        '--mr-accent',
    ],
    a11y: [
        'Root uses role="navigation" with aria-label="Main navigation".',
        'Trigger buttons use role="menuitem" with aria-haspopup and aria-expanded.',
        'Dropdown content uses role="menu".',
        'Sub-items use role="menuitem".',
        'Disabled items have aria-disabled and are not focusable (tabIndex=-1).',
        'Focus-visible outlines are provided for keyboard navigation.',
    ],
}

export function NavigationMenuDocs() {
    return <DocPage doc={docData} />
}
