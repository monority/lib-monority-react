import { DocPage, type DocPageData } from '../DocPage'
import {
  NavigationMenuBasicExample,
  NavigationMenuWithSubItemsExample,
  NavigationMenuWithIconsExample,
  NavigationMenuDisabledExample,
} from './NavigationMenu.examples'

const docData: DocPageData = {
  title: 'NavigationMenu',
  description: 'A multi-level navigation menu with dropdown submenus, viewport-based content, and indicator animation.',
  importCode: "import { NavigationMenu } from '@monority/ui'",
  usageCode: `const items = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    items: [
      { label: 'Analytics', href: '/products/analytics', description: 'Track metrics' },
      { label: 'Automation', href: '/products/automation', description: 'Automate workflows' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
]

<NavigationMenu items={items} />`,
  preview: () => <NavigationMenuBasicExample />,
  examples: [
    { title: 'With sub-items', content: <NavigationMenuWithSubItemsExample /> },
    { title: 'With icons', content: <NavigationMenuWithIconsExample /> },
    { title: 'Disabled items', content: <NavigationMenuDisabledExample /> },
  ],
  props: [
    { name: 'items', type: 'NavigationItem[]', defaultValue: '[]', description: 'Navigation item definitions' },
    { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled active item value' },
    { name: 'defaultValue', type: 'string', defaultValue: '-', description: 'Uncontrolled default active item' },
    { name: 'onValueChange', type: '(value: string) => void', defaultValue: '-', description: 'Callback when active item changes' },
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
    '--mr-spacing-1',
    '--mr-spacing-2',
    '--mr-spacing-3',
    '--mr-radius-sm',
    '--mr-radius-md',
    '--mr-radius-full',
    '--mr-text-xs',
    '--mr-text-sm',
    '--mr-fg-muted',
    '--mr-fg-default',
    '--mr-fg-accent',
    '--mr-bg-surface',
    '--mr-bg-surface-strong',
    '--mr-border-subtle',
    '--mr-shadow-lg',
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
