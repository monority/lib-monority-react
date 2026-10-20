import { NavigationMenu } from '@monority/ui/navigation-menu'
import { useState } from 'react'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    NavigationMenuDisabledExample,
    NavigationMenuWithIconsExample,
    NavigationMenuWithSubItemsExample,
} from './NavigationMenu.examples'

function NavigationMenuPlayground() {
    const [activeSection, setActiveSection] = useState<'none' | 'components' | 'solutions'>(
        'components'
    )

    const snippet = `<NavigationMenu value="${activeSection === 'none' ? '' : activeSection}">
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="#">Accueil</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Composants</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#" description="Champs, boutons et contrôles de saisie">
          Formulaires
        </NavigationMenu.Link>
        <NavigationMenu.Link href="#" description="Tableaux, graphiques et métriques">
          Visualisation
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="solutions">
      <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link href="#" description="Pour les équipes produit et scale-ups">
          Entreprise
        </NavigationMenu.Link>
        <NavigationMenu.Link href="#" description="Licence permissive MIT pour la communauté">
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
                    label: 'Sous-menu ouvert',
                    value: activeSection,
                    options: [
                        { value: 'none', label: 'Aucun (fermé)' },
                        { value: 'components', label: 'Composants' },
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
                            <NavigationMenu.Link href="#">Accueil</NavigationMenu.Link>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item value="components">
                            <NavigationMenu.Trigger>Composants</NavigationMenu.Trigger>
                            <NavigationMenu.Content>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Champs, boutons et contrôles de saisie"
                                >
                                    Formulaires
                                </NavigationMenu.Link>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Tableaux, graphiques et métriques"
                                >
                                    Visualisation
                                </NavigationMenu.Link>
                            </NavigationMenu.Content>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item value="solutions">
                            <NavigationMenu.Trigger>Solutions</NavigationMenu.Trigger>
                            <NavigationMenu.Content>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Pour les équipes produit et scale-ups"
                                >
                                    Entreprise
                                </NavigationMenu.Link>
                                <NavigationMenu.Link
                                    href="#"
                                    description="Licence permissive MIT pour la communauté"
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
        'A surfaced product navigation menu for top-level sections, grouped destinations, and richer submenu content.',
    importCode: "import { NavigationMenu } from '@monority/ui/navigation-menu'",
    usageCode: `<NavigationMenu>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/overview">Overview</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link
          href="/components/inputs"
          description="Fields and validation patterns"
        >
          Inputs
        </NavigationMenu.Link>
        <NavigationMenu.Link
          href="/components/navigation"
          description="Menus, tabs, and shells"
        >
          Navigation
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/changelog">Changelog</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu>`,
    preview: () => <NavigationMenuPlayground />,
    examples: [
        {
            title: 'With sub-items',
            content: <NavigationMenuWithSubItemsExample />,
            code: `<NavigationMenu>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/overview">Overview</NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="components">
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link
          href="/components/inputs"
          description="Fields, validation, and entry patterns."
        >
          Inputs
        </NavigationMenu.Link>
        <NavigationMenu.Link
          href="/components/navigation"
          description="Menus, tabs, pagination, and shells."
        >
          Navigation
        </NavigationMenu.Link>
        <NavigationMenu.Link
          href="/components/feedback"
          description="Banners, callouts, toasts, and empty states."
        >
          Feedback
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="resources">
      <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link
          href="/guidelines"
          description="Layout, spacing, and content hierarchy rules."
        >
          Guidelines
        </NavigationMenu.Link>
        <NavigationMenu.Link
          href="/examples"
          description="Reference compositions for product surfaces."
        >
          Examples
        </NavigationMenu.Link>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/changelog">Changelog</NavigationMenu.Link>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu>`,
        },
        {
            title: 'With icons',
            content: <NavigationMenuWithIconsExample />,
            code: `<NavigationMenu>
  <NavigationMenu.List>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/library" icon={<Text.Span>L</Text.Span>}>
        Library
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Link href="/themes" icon={<Text.Span>T</Text.Span>}>
        Themes
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item value="settings">
      <NavigationMenu.Trigger icon={<Text.Span>S</Text.Span>}>
        Settings
      </NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <NavigationMenu.Link
          href="/settings/brand"
          icon={<Text.Span>B</Text.Span>}
          description="Logos, color roles, and typography."
        >
          Brand
        </NavigationMenu.Link>
        <NavigationMenu.Link
          href="/settings/publishing"
          icon={<Text.Span>P</Text.Span>}
          description="Release flow, versions, and package visibility."
        >
          Publishing
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
        { key: 'Tab', action: 'Navigue entre les liens et déclencheurs de menu' },
        { key: 'Enter', action: 'Ouvre le sous-menu ou active le lien sélectionné' },
        { key: 'Space', action: 'Ouvre le sous-menu' },
        {
            key: 'Escape',
            action: 'Ferme le sous-menu ouvert et replace le focus sur le déclencheur',
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
}

export function NavigationMenuDocs() {
    return <DocPage doc={docData} />
}
