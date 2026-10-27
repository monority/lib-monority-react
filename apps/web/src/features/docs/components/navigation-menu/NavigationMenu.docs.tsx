import { NavigationMenu } from '@monority/ui/navigation-menu'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { navigationMenuI18n } from './NavigationMenu.messages'
import {
    NavigationMenuDisabledExample,
    NavigationMenuWithIconsExample,
    NavigationMenuWithSubItemsExample,
} from './NavigationMenu.examples'

function NavigationMenuPlayground() {
    const [activeSection, setActiveSection] = useState<'none' | 'components' | 'solutions'>('none')

    const snippet = `<NavigationMenu value="${activeSection === 'none' ? '' : activeSection}">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#" description="Fields, buttons, and input controls">
          Forms
        </NavigationMenu.Link>
        <NavigationMenu.Link href="#" description="Tables, charts, and metrics">
          Visualization
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="solutions">
      <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#" description="For product teams and high-scale applications">
          Enterprise
        </NavigationMenu.Link>
        <NavigationMenu.Link href="#" description="Permissive MIT license for the community">
          Open Source
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    name: 'activeSection',
                    label: 'Open submenu',
                    value: activeSection,
                    options: [
                        { value: 'none', label: 'None (closed)' },
                        { value: 'components', label: 'Components' },
                        { value: 'solutions', label: 'Solutions' },
                    ],
                    onChange: (v) => setActiveSection(v as 'none' | 'components' | 'solutions'),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    minHeight: 260,
                    width: '100%',
                    paddingTop: 8,
                }}
            >
                <NavigationMenu
                    value={activeSection === 'none' ? '' : activeSection}
                    onValueChange={(v) =>
                        setActiveSection(v ? (v as 'components' | 'solutions') : 'none')
                    }
                >
                    <NavigationMenu.List>
                        <NavigationMenu.Item>
                            <NavigationMenu.Link href="#">Home</NavigationMenu.Link>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item value="components">
                            <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                            <NavigationMenu.Content>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Fields, buttons, and input controls"
                                >
                                    Forms
                                </NavigationMenu.Link>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Tables, charts, and metrics"
                                >
                                    Visualization
                                </NavigationMenu.Link>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item value="solutions">
                            <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
                            <NavigationMenu.Content>
                                <NavigationMenu.Link
                                    href="#"
                                    description="For product teams and high-scale applications"
                                >
                                    Enterprise
                                </NavigationMenu.Link>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Permissive MIT license for the community"
                                >
                                    Open Source
                                </NavigationMenu.Link>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item>
                            <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
                        </NavigationMenu.Item>
                    </NavigationMenu.List>
                </NavigationMenu>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'NavigationMenu',
    description:
        'A comprehensive application navigation menu with dropdown submenus, interactive indicators, and full keyboard navigation support.',
    importCode: "import { NavigationMenu } from '@monority/ui/navigation-menu'",
    usageCode: `<NavigationMenu>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/">Home</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="products">
      <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="/ui" description="Reusable React component system">
          Design System
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu>`,
    preview: () => <NavigationMenuPlayground />,
    examples: [
        {
            title: 'With icons',
            content: <NavigationMenuWithIconsExample />,
            code: `const items = [
  { label: 'Dashboard', href: '/dashboard' },
  {
    label: 'Workspace',
    items: [
      { label: 'Projects', href: '/projects', description: 'Active repositories and worktrees' },
      { label: 'Deployments', href: '/deploys', description: 'Production releases and logs' },
    ],
  },
]

<NavigationMenu items={items} />`,
        },
        {
            title: 'With sub-items',
            content: <NavigationMenuWithSubItemsExample />,
            code: `<NavigationMenu>
  <NavigationMenu.List>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="/docs/button" description="Interactive button primitive">
          Button
        </NavigationMenu.Link>
        <NavigationMenu.Link href="/docs/modal" description="Accessible modal overlay">
          Modal
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu>`,
        },
        {
            title: 'Disabled items',
            content: <NavigationMenuDisabledExample />,
            code: `const items = [
  { label: 'Overview', href: '/overview' },
  { label: 'Beta', href: '/beta', disabled: true },
  {
    label: 'Labs',
    disabled: true,
    items: [
      { label: 'Experimental grid', href: '/labs/grid', description: 'Coming soon.' },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
]

<NavigationMenu items={items} />`,
        },
    ],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Compound subcomponents: List, Item, Trigger, Content, Link',
        },
        {
            name: 'items',
            type: 'NavigationItem[]',
            defaultValue: '-',
            description: 'Optional shorthand items configuration for simple declarative navigation',
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
        '--mr-font-size-xs',
        '--mr-font-size-sm',
        '--mr-text-secondary',
        '--mr-text-primary',
        '--mr-bg-raised',
        '--mr-bg-surface-strong',
        '--mr-accent-subtle',
        '--mr-border-subtle',
        '--mr-shadow-xs',
        '--mr-shadow-md',
        '--mr-z-dropdown',
        '--mr-accent-solid',
    ],
    keyboardNavigation: [
        { key: 'Tab', action: 'Navigates between links and menu triggers' },
        { key: 'Enter', action: 'Opens the submenu or activates the selected link' },
        { key: 'Space', action: 'Opens the submenu' },
        {
            key: 'Escape',
            action: 'Closes the open submenu and returns focus to the trigger',
        },
    ],
    a11y: [
        'Root uses role="navigation" with aria-label="Main navigation".',
        'Trigger buttons use role="menuitem" with aria-haspopup and aria-expanded.',
        'Dropdown content uses role="menu".',
        'Sub-items use role="menuitem".',
        'Disabled items have aria-disabled and are not focusable (tabIndex=-1).',
        'Focus-visible outlines are provided for keyboard navigation.',
    ],
    i18n: navigationMenuI18n,
}

export function NavigationMenuDocs() {
    return <DocPage doc={docData} />
}
