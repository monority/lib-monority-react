import { NavigationMenu } from '@monority/ui'
import { useState } from 'react'

export function NavigationMenuBasicExample() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ]
  return <NavigationMenu items={items} />
}

export function NavigationMenuWithSubItemsExample() {
  const items = [
    { label: 'Home', href: '/' },
    {
      label: 'Products',
      items: [
        { label: 'Analytics', href: '/products/analytics', description: 'Track your metrics' },
        { label: 'Automation', href: '/products/automation', description: 'Automate workflows' },
        { label: 'Integrations', href: '/products/integrations', description: 'Connect your tools' },
      ],
    },
    {
      label: 'Resources',
      items: [
        { label: 'Documentation', href: '/docs', description: 'API reference and guides' },
        { label: 'Blog', href: '/blog', description: 'Latest news and updates' },
      ],
    },
    { label: 'Pricing', href: '/pricing' },
  ]
  return <NavigationMenu items={items} />
}

export function NavigationMenuWithIconsExample() {
  const items = [
    { label: 'Dashboard', href: '/dashboard', icon: <span>📊</span> },
    { label: 'Projects', href: '/projects', icon: <span>📁</span> },
    {
      label: 'Settings',
      icon: <span>⚙️</span>,
      items: [
        { label: 'General', href: '/settings/general', icon: <span>🔧</span>, description: 'General settings' },
        { label: 'Security', href: '/settings/security', icon: <span>🔒</span>, description: 'Password and 2FA' },
      ],
    },
  ]
  return <NavigationMenu items={items} />
}

export function NavigationMenuDisabledExample() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Beta', href: '/beta', disabled: true },
    {
      label: 'Features',
      disabled: true,
      items: [
        { label: 'New Feature', href: '/features/new', description: 'Coming soon' },
      ],
    },
    { label: 'Pricing', href: '/pricing' },
  ]
  return <NavigationMenu items={items} />
}
