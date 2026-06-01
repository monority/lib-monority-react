export interface DocsComponentRegistryItem {
  category: string
  label: string
  path: string
  slug: string
  status: 'draft' | 'stable'
}

export const docsComponentRegistry: DocsComponentRegistryItem[] = [
  // Actions
  { category: 'actions', label: 'Button', path: '/docs/button', slug: 'button', status: 'stable' },
  { category: 'actions', label: 'Toggle', path: '/docs/toggle', slug: 'toggle', status: 'draft' },
  { category: 'actions', label: 'ToggleGroup', path: '/docs/toggle-group', slug: 'toggle-group', status: 'draft' },

  // Forms
  { category: 'forms', label: 'Calendar', path: '/docs/calendar', slug: 'calendar', status: 'draft' },
  { category: 'forms', label: 'Checkbox', path: '/docs/checkbox', slug: 'checkbox', status: 'draft' },
  { category: 'forms', label: 'Combobox', path: '/docs/combobox', slug: 'combobox', status: 'draft' },
  { category: 'forms', label: 'DatePicker', path: '/docs/date-picker', slug: 'date-picker', status: 'draft' },
  { category: 'forms', label: 'DateRangePicker', path: '/docs/date-range-picker', slug: 'date-range-picker', status: 'draft' },
  { category: 'forms', label: 'Field', path: '/docs/field', slug: 'field', status: 'draft' },
  { category: 'forms', label: 'FileUpload', path: '/docs/file-upload', slug: 'file-upload', status: 'draft' },
  { category: 'forms', label: 'FormSection', path: '/docs/form-section', slug: 'form-section', status: 'draft' },
  { category: 'forms', label: 'Input', path: '/docs/input', slug: 'input', status: 'stable' },
  { category: 'forms', label: 'RadioGroup', path: '/docs/radio-group', slug: 'radio-group', status: 'draft' },
  { category: 'forms', label: 'Select', path: '/docs/select', slug: 'select', status: 'draft' },
  { category: 'forms', label: 'Slider', path: '/docs/slider', slug: 'slider', status: 'draft' },
  { category: 'forms', label: 'Switch', path: '/docs/switch', slug: 'switch', status: 'draft' },
  { category: 'forms', label: 'Textarea', path: '/docs/textarea', slug: 'textarea', status: 'draft' },

  // Feedback
  { category: 'feedback', label: 'AsyncStateNotice', path: '/docs/async-state-notice', slug: 'async-state-notice', status: 'draft' },
  { category: 'feedback', label: 'Badge', path: '/docs/badge', slug: 'badge', status: 'stable' },
  { category: 'feedback', label: 'Banner', path: '/docs/banner', slug: 'banner', status: 'draft' },
  { category: 'feedback', label: 'Callout', path: '/docs/callout', slug: 'callout', status: 'draft' },
  { category: 'feedback', label: 'EmptyState', path: '/docs/empty-state', slug: 'empty-state', status: 'draft' },
  { category: 'feedback', label: 'InlineAlert', path: '/docs/inline-alert', slug: 'inline-alert', status: 'draft' },
  { category: 'feedback', label: 'Progress', path: '/docs/progress', slug: 'progress', status: 'draft' },
  { category: 'feedback', label: 'Skeleton', path: '/docs/skeleton', slug: 'skeleton', status: 'draft' },
  { category: 'feedback', label: 'Spinner', path: '/docs/spinner', slug: 'spinner', status: 'draft' },
  { category: 'feedback', label: 'Toast', path: '/docs/toast', slug: 'toast', status: 'draft' },

  // Overlays
  { category: 'overlays', label: 'AlertDialog', path: '/docs/alert-dialog', slug: 'alert-dialog', status: 'draft' },
  { category: 'overlays', label: 'CommandPalette', path: '/docs/command-palette', slug: 'command-palette', status: 'draft' },
  { category: 'overlays', label: 'ContextMenu', path: '/docs/context-menu', slug: 'context-menu', status: 'draft' },
  { category: 'overlays', label: 'Drawer', path: '/docs/drawer', slug: 'drawer', status: 'draft' },
  { category: 'overlays', label: 'DropdownMenu', path: '/docs/dropdown-menu', slug: 'dropdown-menu', status: 'draft' },
  { category: 'overlays', label: 'HoverCard', path: '/docs/hover-card', slug: 'hover-card', status: 'draft' },
  { category: 'overlays', label: 'Modal', path: '/docs/modal', slug: 'modal', status: 'stable' },
  { category: 'overlays', label: 'Popover', path: '/docs/popover', slug: 'popover', status: 'draft' },
  { category: 'overlays', label: 'Tooltip', path: '/docs/tooltip', slug: 'tooltip', status: 'draft' },

  // Navigation
  { category: 'navigation', label: 'Breadcrumb', path: '/docs/breadcrumb', slug: 'breadcrumb', status: 'draft' },
  { category: 'navigation', label: 'FilterBar', path: '/docs/filter-bar', slug: 'filter-bar', status: 'draft' },
  { category: 'navigation', label: 'Menubar', path: '/docs/menubar', slug: 'menubar', status: 'draft' },
  { category: 'navigation', label: 'NavigationMenu', path: '/docs/navigation-menu', slug: 'navigation-menu', status: 'draft' },
  { category: 'navigation', label: 'Pagination', path: '/docs/pagination', slug: 'pagination', status: 'draft' },
  { category: 'navigation', label: 'SidebarLayout', path: '/docs/sidebar-layout', slug: 'sidebar-layout', status: 'draft' },
  { category: 'navigation', label: 'Tabs', path: '/docs/tabs', slug: 'tabs', status: 'draft' },
  { category: 'navigation', label: 'Topbar', path: '/docs/topbar', slug: 'topbar', status: 'draft' },

  // Display
  { category: 'display', label: 'Accordion', path: '/docs/accordion', slug: 'accordion', status: 'draft' },
  { category: 'display', label: 'Avatar', path: '/docs/avatar', slug: 'avatar', status: 'draft' },
  { category: 'display', label: 'Card', path: '/docs/card', slug: 'card', status: 'stable' },
  { category: 'display', label: 'Carousel', path: '/docs/carousel', slug: 'carousel', status: 'draft' },
  { category: 'display', label: 'Collapsible', path: '/docs/collapsible', slug: 'collapsible', status: 'draft' },
  { category: 'display', label: 'MetricGrid', path: '/docs/metric-grid', slug: 'metric-grid', status: 'draft' },
  { category: 'display', label: 'StatCard', path: '/docs/stat-card', slug: 'stat-card', status: 'draft' },
  { category: 'display', label: 'Table', path: '/docs/table', slug: 'table', status: 'draft' },

  // Data Display
  { category: 'data-display', label: 'DataList', path: '/docs/data-list', slug: 'data-list', status: 'draft' },
  { category: 'data-display', label: 'DataTable', path: '/docs/data-table', slug: 'data-table', status: 'draft' },

  // Typography
  { category: 'typography', label: 'Kbd', path: '/docs/kbd', slug: 'kbd', status: 'draft' },
  { category: 'typography', label: 'Text', path: '/docs/text', slug: 'text', status: 'draft' },
  { category: 'typography', label: 'Title', path: '/docs/title', slug: 'title', status: 'draft' },

  // Layout
  { category: 'layout', label: 'AspectRatio', path: '/docs/aspect-ratio', slug: 'aspect-ratio', status: 'draft' },
  { category: 'layout', label: 'Container', path: '/docs/container', slug: 'container', status: 'draft' },
  { category: 'layout', label: 'Divider', path: '/docs/divider', slug: 'divider', status: 'draft' },
  { category: 'layout', label: 'Grid', path: '/docs/grid', slug: 'grid', status: 'draft' },
  { category: 'layout', label: 'PageHeader', path: '/docs/page-header', slug: 'page-header', status: 'draft' },
  { category: 'layout', label: 'Resizable', path: '/docs/resizable', slug: 'resizable', status: 'draft' },
  { category: 'layout', label: 'Section', path: '/docs/section', slug: 'section', status: 'draft' },
  { category: 'layout', label: 'ScrollArea', path: '/docs/scroll-area', slug: 'scroll-area', status: 'draft' },
  { category: 'layout', label: 'Separator', path: '/docs/separator', slug: 'separator', status: 'draft' },
  { category: 'layout', label: 'Stack', path: '/docs/stack', slug: 'stack', status: 'draft' },
  { category: 'layout', label: 'Toolbar', path: '/docs/toolbar', slug: 'toolbar', status: 'draft' },

  // Experimental
  { category: 'experimental', label: 'InfiniteScroll', path: '/docs/infinite-scroll', slug: 'infinite-scroll', status: 'draft' },

  // generator:component-registry
]
