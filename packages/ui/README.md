# @monority/ui

Modern, accessible, and themeable React 19 component library powered by standard CSS layers and design tokens.

## Features

- Built for React 19: Standard `ref` prop support, zero deprecated `forwardRef` wrappers.
- CSS Layer Architecture: Built-in cascade ordering via `@layer mr.*`. Your application styles always take precedence without `!important` or selector specificity wars.
- 83 Production-Ready Components: Comprehensive suite covering layout, overlays, forms, data display, navigation, and typography.
- Runtime Theming: 7 built-in themes (Light, Dark, Slate, OLED, Ocean, Night, High-Contrast) plus dynamic brand hue resolution.
- Accessibility First: Conforms to WAI-ARIA authoring practices and WCAG 2.1 AA criteria with full keyboard navigation and focus management.
- Tree-Shakeable: Granular subpath exports for every component (`@monority/ui/button`, `@monority/ui/dialog`, etc.).
- Server-Safe: Zero flash of unstyled content (FOUC) with lightweight inline theme detection.

## Installation

```bash
pnpm add @monority/ui
# or
npm install @monority/ui
# or
yarn add @monority/ui
```

## Quick Start

Import the stylesheet once at your application entry point, then import and compose components:

```tsx
import { Button, Card, Stack, Title, Text } from '@monority/ui'
import '@monority/ui/styles.css'

export function App() {
  return (
    <Card>
      <Stack gap="md">
        <Title as="h2" size="lg">Welcome to Monority</Title>
        <Text tone="muted">Accessible, token-driven interface primitives.</Text>
        <Button variant="primary">Get Started</Button>
      </Stack>
    </Card>
  )
}
```

## CSS Layer Architecture

Monority UI structures its CSS within standard CSS cascade layers prefixed with `mr.` to prevent collisions with host application layers:

```css
@layer mr.reset, mr.base, mr.tokens, mr.themes, mr.components, mr.utilities;
```

Any unlayered CSS in your host application (such as Tailwind CSS utilities, CSS Modules, or vanilla stylesheets) naturally wins over library styles, guaranteeing seamless customizability.

### Integrating with Tailwind CSS

To position Monority UI within your own layer hierarchy:

```css
@layer theme, base, mr, components, utilities;

@import 'tailwindcss';
@import '@monority/ui/styles.css' layer(mr);
```

## Theming and Dark Mode

Monority UI supports runtime theme switching via standard DOM data attributes on `:root` or any subtree:

```html
<!-- Dark theme -->
<html data-theme="dark">

<!-- Ocean theme -->
<html data-theme="ocean">

<!-- High-contrast theme -->
<html data-theme="high-contrast">
```

Supported themes:
- `light`
- `dark`
- `slate`
- `oled`
- `ocean`
- `night`
- `high-contrast`

### Preventing Theme Flash in SSR (Next.js / Remix / Astro)

Inject the theme script in your HTML document head before rendering React:

```tsx
import { getThemeScript } from '@monority/ui/get-theme-script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## Subpath Exports and Tree-Shaking

Every component can be imported either from the root package or via its direct subpath for fine-grained bundle optimization:

```tsx
// Root import
import { Button, Input, Modal } from '@monority/ui'

// Direct subpath imports
import { Button } from '@monority/ui/button'
import { Input } from '@monority/ui/input'
import { Modal } from '@monority/ui/modal'
```

## Catalog of Components (83 Components)

### Actions
- `Button`: Primary, secondary, outline, danger, ghost, quiet, and subtle action button.
- `ButtonLink`: Semantic anchor styled as a button with accessible routing support.
- `CopyButton`: Clipboard action button with animated feedback and timeout management.
- `IconButton`: Compact icon-only button with accessible tooltip and aria-label.
- `Toggle`: Two-state toggle button with pressed state indicators.
- `ToggleGroup`: Single or multi-select group of coordinated toggle buttons.

### Forms and Inputs
- `Calendar`: Month grid calendar with keyboard navigation and date formatting.
- `Checkbox`: Accessible checkbox with indeterminate state support.
- `Combobox`: Searchable autocomplete input with keyboard navigation and floating menu.
- `DatePicker`: Single date input with floating calendar popover and locale awareness.
- `DateRangePicker`: Coordinated start and end date pickers with range validation.
- `Field`: Comprehensive form field wrapper with label, hint, and error messaging.
- `FileUpload`: File upload zone with drag-and-drop, triggers, and file list management.
- `FormSection`: Structured form section container with header and description.
- `Input`: Single-line text input with leading/trailing adornments and clear button.
- `InputOTP`: Segmented one-time password and pin code verification input.
- `NumberInput`: Numeric stepper input with increment/decrement buttons and bounds clamping.
- `PasswordInput`: Secure password field with reveal/hide toggle and strength indicators.
- `RadioGroup`: Mutually exclusive options group with arrow key navigation.
- `Rating`: Star-based rating selector with hover previews and keyboard controls.
- `Select`: Accessible dropdown select control.
- `Slider`: Range slider input with custom track, thumb, and tooltip value display.
- `Switch`: Binary toggle switch with smooth animated state transitions.
- `Textarea`: Multi-line text input with automatic height expansion.

### Overlays and Floating
- `AlertDialog`: High-priority modal dialog for confirmations and destructive actions.
- `CommandPalette`: Keyboard-first command search and action palette (Ctrl/Cmd + K).
- `ContextMenu`: Right-click contextual menu with nested items and keyboard traversal.
- `Drawer`: Slide-in sheet overlay from screen edge with gesture dismissal.
- `DropdownMenu`: Floating action and navigation menu with submenus and separators.
- `HoverCard`: Delayed preview card triggered on pointer hover.
- `Modal`: General-purpose modal dialog with focus trapping and backdrop dismissal.
- `Popover`: Floating content panel anchored to an interactive trigger.
- `Sheet`: Deep slide-over drawer panel for secondary tasks and side navigation.
- `Tooltip`: Accessible tooltip label displayed on hover and focus.

### Navigation
- `Breadcrumb`: Hierarchical navigation path with customizable separators.
- `FilterBar`: Search and filter toolbar with removable filter chips and counter.
- `Menubar`: Horizontal desktop application menubar with cascading dropdowns.
- `NavigationMenu`: Complex site navigation menu with animated active indicators.
- `Pagination`: Page navigation control with page buttons, ellipses, and previous/next actions.
- `SegmentedControl`: Inline segmented switch for selecting among alternate view modes.
- `SidebarLayout`: Master application layout with collapsible sidebar and content area.
- `Stepper`: Multi-step progress indicator for sequential workflows.
- `Tabs`: Tabbed interface with keyboard arrow navigation and animated active indicator.
- `Topbar`: Top application bar for brand identity, actions, and search.

### Layout
- `AspectRatio`: Enforces fixed proportional dimensions on embedded media or containers.
- `Container`: Viewport-constrained wrapper with responsive max-width scales.
- `Divider`: Visual separator line with optional center label and horizontal/vertical orientation.
- `Grid`: CSS Grid layout primitive with responsive column and gap controls.
- `PageHeader`: Standardized page title header with description and action slot.
- `Resizable`: Resizable multi-panel layout with draggable splitter handles.
- `ScrollArea`: Custom scrollable viewport with native scrolling mechanics and stylized scrollbars.
- `Section`: Semantic page section container with vertical spacing rhythm.
- `Separator`: Accessible thematic line break.
- `Stack`: Flexbox layout primitive for linear vertical or horizontal alignment.
- `Toolbar`: Accessible group container for arranging buttons, switches, and inputs.

### Feedback and Status
- `AsyncStateNotice`: Inline status card displaying loading, error, or empty states.
- `Badge`: Compact status indicator with color tones and variant styles.
- `BadgeDelta`: Metric change pill displaying numeric deltas and trend direction arrows.
- `Banner`: Full-width prominent notification banner with dismiss action.
- `Callout`: Highlighted message box for warnings, hints, and supplementary info.
- `EmptyState`: Placeholder container with iconography and call-to-action for missing data.
- `InlineAlert`: Inline status alert banner for form errors and operation feedback.
- `Progress`: Determinate or indeterminate progress bar with custom color fills.
- `Skeleton`: Animated placeholder loading shimmer matching text and container geometry.
- `Spinner`: Smooth rotating activity indicator for asynchronous loading.
- `Toast`: Transient popup toast notification with timer and action dismiss.

### Data Display
- `Accordion`: Vertically stacked disclosure panels with smooth expand/collapse.
- `Avatar`: User avatar component with image fallback, initials, and status badge.
- `Card`: Surface container with header, content, and footer subcomponents.
- `Carousel`: Horizontal scrolling slide deck with controls, dots, and loop support.
- `Collapsible`: Expandable disclosure container for toggling visibility of content.
- `ColorSwatch`: Color preview pill with contrast border and accessible label.
- `DataList`: Key-value pair list for inspecting metadata and configuration items.
- `DataTable`: Rich data grid with sortable columns, row selection, and pagination.
- `MetricGrid`: Responsive dashboard grid specifically calibrated for KPI cards.
- `StatCard`: Key metric presentation card with trend indicators, sparkline slots, and icons.
- `Table`: Clean semantic HTML table with styled headers, alternating rows, and hover states.
- `Timeline`: Chronological event sequence with milestone markers and detail summaries.

### Typography
- `Kbd`: Inline keyboard shortcut key cap badge.
- `PreCode`: Formatted syntax-highlighted code block with line numbering and copy action.
- `Text`: Fluid typographic body text with variant tones and sizing scales.
- `Title`: Semantic headings (h1 to h6) with calibrated typographic hierarchy.

### Utilities and Icons
- `InfiniteScroll`: Viewport-based infinite scrolling boundary with automatic loading.
- `Icons`: Built-in SVG icon primitives designed to match typography line heights.

## License

MIT © Monority
