/**
 * generate-docs-from-registry.cjs
 * 
 * Creates structured doc directories from the registry.
 * Run from workspace root: node apps/web/scripts/generate-docs-from-registry.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC_DOCS = path.join(ROOT, 'src', 'docs', 'components');
const REGISTRY_PATH = path.join(SRC_DOCS, 'registry.ts');

// Read registry
const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');
const registryEntries = [];
const registryRegex = /\{\s*category:\s*'([^']+)'.*?label:\s*'([^']+)'.*?path:\s*'\/docs\/([^']+)'.*?slug:\s*'([^']+)'.*?status:\s*'([^']+)'/gs;
let m;
while ((m = registryRegex.exec(registryContent)) !== null) {
  registryEntries.push({
    category: m[1],
    label: m[2],
    path: m[3],
    slug: m[4],
    status: m[5],
  });
}

function toPascalCase(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function toCamelCase(slug) {
  const pascal = toPascalCase(slug);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// Component data extracted from the original componentDocs.tsx
const componentData = {
  button: {
    description: 'Accessible action primitive for forms, navigation, dialogs, and async operations.',
    importCode: "import { Button } from '@monority/ui/button'",
    usageCode: `<Button variant="primary" size="md">Save changes</Button>\n<Button variant="secondary">Preview</Button>\n<Button variant="ghost">Cancel</Button>`,
    props: [
      { name: 'variant', type: `'primary' | 'secondary' | 'muted' | 'ghost' | 'subtle' | 'danger'`, defaultValue: "'primary'", description: 'Visual intent.' },
      { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: 'Control density.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Disables action and marks busy state.' },
      { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Stretches button to container width.' },
    ],
    cssHooks: ['.mr-btn', '.mr-btn--primary', '.mr-btn--danger', '[data-variant]', '[data-size]', '[data-loading]'],
    tokens: ['--mr-accent', '--mr-accent-contrast', '--mr-space-*', '--mr-duration-fast'],
    a11y: ['Native button semantics by default.', 'Supports aria-busy during loading.', 'Visible focus ring via shared focus tokens.'],
  },
  input: {
    description: 'Form field primitive with label, hint, error, required, and disabled state hooks.',
    importCode: "import { Input } from '@monority/ui/input'",
    usageCode: `<Input\n  label="Email"\n  hint="Use your work email."\n  placeholder="you@company.com"\n/>`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Visible label rendered through Field.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description linked with aria-describedby.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Invalid message and visual error state.' },
      { name: 'inputClassName', type: 'string', defaultValue: '-', description: 'Class hook for input element.' },
    ],
    cssHooks: ['.mr-input', '.mr-input--error', '[data-invalid]', '[data-required]', '[data-disabled]'],
    tokens: ['--mr-input-height', '--mr-input-radius', '--mr-border-subtle', '--mr-shadow-focus'],
    a11y: ['Label uses htmlFor.', 'Hint/error IDs feed aria-describedby.', 'Errors set aria-invalid.'],
  },
  badge: {
    description: 'Compact status label for metadata, lifecycle states, and small categorization.',
    importCode: "import { Badge } from '@monority/ui/badge'",
    usageCode: `<Badge>Draft</Badge>\n<Badge variant="success">Live</Badge>`,
    props: [
      { name: 'variant', type: `'default' | 'primary' | 'success' | 'danger'`, defaultValue: "'default'", description: 'Semantic tone.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Short label text.' },
    ],
    cssHooks: ['.mr-badge', '.mr-badge--primary', '.mr-badge--success', '.mr-badge--danger', '[data-variant]'],
    tokens: ['--mr-radius-sm', '--mr-text-xs', '--mr-accent', '--mr-success', '--mr-danger'],
    a11y: ['Use concise text.', 'Avoid color-only meaning for critical states.'],
  },
  card: {
    description: 'Surface primitive for grouping related content without owning internal layout.',
    importCode: "import { Card } from '@monority/ui/card'",
    usageCode: `<Card padding="lg" interactive>\n  <h3>Project health</h3>\n  <p>Stable release candidate.</p>\n</Card>`,
    props: [
      { name: 'padding', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: 'Interior spacing.' },
      { name: 'interactive', type: 'boolean', defaultValue: 'false', description: 'Adds hover affordance for clickable cards.' },
    ],
    cssHooks: ['.mr-card', '.mr-card--sm', '.mr-card--md', '.mr-card--lg', '[data-padding]', '[data-interactive]'],
    tokens: ['--mr-radius-lg', '--mr-border-subtle', '--mr-shadow-sm', '--mr-space-*'],
    a11y: ['Card is layout only.', 'Use a button/link inside or wrap carefully for interactive cards.'],
  },
  modal: {
    description: 'Focused dialog pattern with scroll lock, focus trap, Escape handling, backdrop close, and labelled title.',
    importCode: "import { Modal } from '@monority/ui/modal'",
    usageCode: `<Modal open={open} title="Confirm action" onClose={() => setOpen(false)}>\n  Dialog content\n</Modal>`,
    props: [
      { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controls mounted dialog state.' },
      { name: 'title', type: 'string', defaultValue: '-', description: 'Dialog label.' },
      { name: 'onClose', type: '() => void', defaultValue: '-', description: 'Called from backdrop, close button, and Escape.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Dialog body content.' },
    ],
    cssHooks: ['.mr-modal', '.mr-modal__backdrop', '.mr-modal__panel', '.mr-modal__header', '.mr-modal__body', '[data-open]'],
    tokens: ['--mr-z-overlay', '--mr-radius-lg', '--mr-shadow-md', '--mr-space-*'],
    a11y: ['role="dialog" and aria-modal set.', 'Title ID drives aria-labelledby.', 'Focus is trapped while open.'],
  },
  accordion: {
    description: 'Expandable and collapsible sections for showing/hiding content.',
    importCode: "import { Accordion } from '@monority/ui'",
    usageCode: `<Accordion items={[\n  { label: 'Section 1', content: <p>Content</p> },\n  { label: 'Section 2', content: <p>Content</p> },\n]} />`,
    props: [
      { name: 'items', type: `{ value?: string; label: string; content: ReactNode }[]`, defaultValue: '[]', description: 'Accordion sections.' },
      { name: 'defaultValue', type: 'string | string[]', defaultValue: '-', description: 'Default expanded value(s).' },
      { name: 'value', type: 'string | string[]', defaultValue: '-', description: 'Controlled expanded value(s).' },
      { name: 'onChange', type: '(value: string | string[]) => void', defaultValue: '-', description: 'Expand change callback.' },
      { name: 'allowMultiple', type: 'boolean', defaultValue: 'false', description: 'Allow multiple sections open.' },
      { name: 'collapsible', type: 'boolean', defaultValue: 'true', description: 'Allow closing the active section.' },
    ],
  },
  'alert-dialog': {
    description: 'Confirmation dialog with role="alertdialog" for destructive or important actions.',
    importCode: "import { AlertDialog } from '@monority/ui'",
    usageCode: `<AlertDialog\n  open={open}\n  title="Delete item?"\n  description="This action cannot be undone."\n  onConfirm={handleConfirm}\n  onCancel={handleCancel}\n/>`,
    props: [
      { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controls open state.' },
      { name: 'title', type: 'string', defaultValue: '-', description: 'Dialog title.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Dialog description.' },
      { name: 'confirmLabel', type: 'string', defaultValue: "'Confirmer'", description: 'Confirm button label.' },
      { name: 'cancelLabel', type: 'string', defaultValue: "'Annuler'", description: 'Cancel button label.' },
      { name: 'tone', type: `'danger' | 'default'`, defaultValue: "'danger'", description: 'Visual tone.' },
      { name: 'onConfirm', type: '() => void', defaultValue: '-', description: 'Confirm callback.' },
      { name: 'onCancel', type: '() => void', defaultValue: '-', description: 'Cancel callback.' },
    ],
  },
  avatar: {
    description: 'A visual representation of a user or entity, typically using an image or initials.',
    importCode: "import { Avatar } from '@monority/ui'",
    usageCode: `<Avatar size="sm" name="Alice B" />\n<Avatar size="md" name="Alice B" />\n<Avatar size="lg" name="Alice B" />`,
    props: [
      { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: 'Size of the avatar' },
      { name: 'src', type: 'string', defaultValue: '-', description: 'Image source URL' },
      { name: 'alt', type: 'string', defaultValue: '-', description: 'Alt text for image' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Initials or fallback content' },
    ],
  },
  banner: {
    description: 'Top-of-page notification with eyebrow, title, description, and optional actions.',
    importCode: "import { Banner } from '@monority/ui'",
    usageCode: `<Banner tone="info" title="Scheduled maintenance" description="Service may be briefly unavailable." />`,
    props: [
      { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: "'info'", description: 'Visual tone.' },
      { name: 'eyebrow', type: 'string', defaultValue: '-', description: 'Small text above title.' },
      { name: 'title', type: 'string', defaultValue: '-', description: 'Banner title.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Banner description.' },
      { name: 'actions', type: 'ReactNode', defaultValue: '-', description: 'Action buttons.' },
    ],
  },
  breadcrumb: {
    description: 'Breadcrumb trail with nav and ordered list semantics.',
    importCode: "import { Breadcrumb } from '@monority/ui'",
    usageCode: `<Breadcrumb items={[\n  { label: 'Home', href: '/' },\n  { label: 'Projects' },\n]} />`,
    props: [
      { name: 'items', type: `{ label: string; href?: string }[]`, defaultValue: '[]', description: 'Breadcrumb trail items.' },
    ],
  },
  callout: {
    description: 'Styled callout box for notes, tips, and contextual highlights.',
    importCode: "import { Callout } from '@monority/ui'",
    usageCode: `<Callout title="Note" tone="info">\n  <p>This is an informational callout.</p>\n</Callout>`,
    props: [
      { name: 'title', type: 'string', defaultValue: '-', description: 'Callout title.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Callout description.' },
      { name: 'tone', type: `'neutral' | 'info' | 'success' | 'warning' | 'danger'`, defaultValue: "'neutral'", description: 'Visual tone.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Custom content.' },
    ],
  },
  checkbox: {
    description: 'A control that allows users to select one or more options from a set.',
    importCode: "import { Checkbox } from '@monority/ui'",
    usageCode: `<Checkbox label="Option 1" />\n<Checkbox label="Option 2" defaultChecked />`,
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Checkbox label' },
      { name: 'checked', type: 'boolean', defaultValue: 'false', description: 'Checked state' },
      { name: 'onChange', type: 'function', defaultValue: '-', description: 'Change callback' },
    ],
  },
  combobox: {
    description: 'Autocomplete select with portal dropdown, keyboard navigation, and client-side filtering.',
    importCode: "import { Combobox } from '@monority/ui'",
    usageCode: `const [value, setValue] = useState('')\nconst items = [\n  { value: 'react', label: 'React' },\n  { value: 'vue', label: 'Vue' },\n]\n\n<Combobox\n  items={items}\n  value={value}\n  onChange={setValue}\n  placeholder="Search..."\n  label="Framework"\n/>`,
    props: [
      { name: 'items', type: '{ value: string; label: string; description?: string; keywords?: string[] }[]', defaultValue: '[]', description: 'Items for the dropdown.' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled selected value.' },
      { name: 'defaultValue', type: 'string', defaultValue: '-', description: 'Default selected value.' },
      { name: 'onChange', type: '(value: string) => void', defaultValue: '-', description: 'Selection callback.' },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Input placeholder.' },
      { name: 'emptyLabel', type: 'string', defaultValue: '-', description: 'Label when no results match.' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
    ],
  },
  'command-palette': {
    description: 'Cmd+K style command palette for quick actions and navigation.',
    importCode: "import { CommandPalette } from '@monority/ui'",
    usageCode: `<CommandPalette\n  open={open}\n  onClose={() => setOpen(false)}\n  items={[\n    { value: 'home', label: 'Go to Home' },\n    { value: 'settings', label: 'Open Settings' },\n  ]}\n/>`,
    props: [
      { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controls open state.' },
      { name: 'onClose', type: '() => void', defaultValue: '-', description: 'Close callback.' },
      { name: 'items', type: '{ value: string; label: string; description?: string; keywords?: string[]; group?: string; shortcut?: string; onSelect?: () => void }[]', defaultValue: '[]', description: 'Command items.' },
      { name: 'title', type: 'string', defaultValue: '-', description: 'Palette title.' },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Search placeholder.' },
      { name: 'emptyLabel', type: 'string', defaultValue: '-', description: 'Empty results message.' },
    ],
  },
  container: {
    description: 'Width-constrained container for centering page content.',
    importCode: "import { Container } from '@monority/ui'",
    usageCode: `<Container size="md">\n  <p>Constrained content goes here.</p>\n</Container>`,
    props: [
      { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, defaultValue: '-', description: 'Container max-width preset.' },
    ],
  },
  'copy-button': {
    description: 'Button that copies text to clipboard with configurable labels and duration.',
    importCode: "import { CopyButton } from '@monority/ui'",
    usageCode: `<CopyButton value="Text to copy" />\n<CopyButton value="Another text" label="Copier" copiedLabel="Copie !" />`,
    props: [
      { name: 'value', type: 'string', defaultValue: '-', description: 'Text to copy to clipboard.' },
      { name: 'label', type: 'string', defaultValue: "'Copier'", description: 'Default button label.' },
      { name: 'copiedLabel', type: 'string', defaultValue: "'Copie !'", description: 'Label shown after copy.' },
      { name: 'duration', type: 'number', defaultValue: '2000', description: 'Duration (ms) the copied label is shown.' },
    ],
  },
  'data-list': {
    description: 'Definition list for key-value data with auto or split column layout.',
    importCode: "import { DataList } from '@monority/ui'",
    usageCode: `<DataList items={[\n  { label: 'Email', value: 'john@example.com' },\n  { label: 'Role', value: 'Developer' },\n]} />`,
    props: [
      { name: 'items', type: '{ key?: string; label: string; value: ReactNode }[]', defaultValue: '[]', description: 'Key-value pairs.' },
      { name: 'columns', type: `'auto' | 'split'`, defaultValue: '-', description: 'Column layout mode.' },
      { name: 'className', type: 'string', defaultValue: '-', description: 'Additional class name.' },
    ],
  },
  'data-table': {
    description: 'Full-featured data table with sorting, selection, caption, and empty state.',
    importCode: "import { DataTable } from '@monority/ui'",
    usageCode: `<DataTable\n  columns={[\n    { key: 'name', header: 'Name', sortable: true },\n    { key: 'email', header: 'Email' },\n  ]}\n  rows={[\n    { name: 'John Doe', email: 'john@example.com' },\n  ]}\n  sortable\n/>`,
    props: [
      { name: 'columns', type: 'Column[]', defaultValue: '[]', description: 'Column definitions with optional sortable.' },
      { name: 'rows', type: 'Record<string, ReactNode>[]', defaultValue: '[]', description: 'Table data.' },
      { name: 'sortable', type: 'boolean', defaultValue: '-', description: 'Enable column sorting.' },
      { name: 'selectable', type: 'boolean', defaultValue: '-', description: 'Enable row selection.' },
      { name: 'caption', type: 'string', defaultValue: '-', description: 'Table caption for accessibility.' },
      { name: 'emptyState', type: 'ReactNode', defaultValue: '-', description: 'Custom empty state content.' },
    ],
  },
  'date-picker': {
    description: 'Native HTML date/time input wrapped in a Field with label, hint, and error support.',
    importCode: "import { DatePicker } from '@monority/ui'",
    usageCode: `<DatePicker type="date" label="Start date" />\n<DatePicker type="time" label="Time" />`,
    props: [
      { name: 'type', type: `'date' | 'datetime-local' | 'time'`, defaultValue: "'date'", description: 'Native input type.' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
    ],
  },
  'date-range-picker': {
    description: 'Two native date inputs (from / to) wrapped in a single Field group.',
    importCode: "import { DateRangePicker } from '@monority/ui'",
    usageCode: `<DateRangePicker label="Period" />`,
    props: [
      { name: 'fromLabel', type: 'string', defaultValue: "'Du'", description: 'Label for the "from" input.' },
      { name: 'toLabel', type: 'string', defaultValue: "'Au'", description: 'Label for the "to" input.' },
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
      { name: 'fromProps', type: 'object', defaultValue: '-', description: 'Props forwarded to the from DatePicker.' },
      { name: 'toProps', type: 'object', defaultValue: '-', description: 'Props forwarded to the to DatePicker.' },
    ],
  },
  divider: {
    description: 'Horizontal rule divider for visual separation of content.',
    importCode: "import { Divider } from '@monority/ui'",
    usageCode: `<Divider />`,
    props: [],
  },
  drawer: {
    description: 'Slide-in panel overlay from any side with focus trap and backdrop.',
    importCode: "import { Drawer } from '@monority/ui'",
    usageCode: `<Drawer open={open} title="Details" side="right" onClose={() => setOpen(false)}>\n  <p>Drawer content</p>\n</Drawer>`,
    props: [
      { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controls open state.' },
      { name: 'title', type: 'string', defaultValue: '-', description: 'Drawer title.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Drawer content.' },
      { name: 'side', type: `'left' | 'right' | 'top' | 'bottom'`, defaultValue: "'right'", description: 'Slide-in direction.' },
      { name: 'onClose', type: '() => void', defaultValue: '-', description: 'Close callback.' },
    ],
  },
  'dropdown-menu': {
    description: 'Menu dropdown with keyboard navigation and item variants.',
    importCode: "import { DropdownMenu } from '@monority/ui'",
    usageCode: `<DropdownMenu\n  trigger={<Button>Actions</Button>}\n  items={[\n    { value: 'edit', label: 'Edit' },\n    { type: 'separator' },\n    { value: 'delete', label: 'Delete', danger: true },\n  ]}\n/>`,
    props: [
      { name: 'trigger', type: 'ReactNode', defaultValue: '-', description: 'Element that opens the menu.' },
      { name: 'items', type: '{ value: string; label: string; type?: string; disabled?: boolean; danger?: boolean; onSelect?: () => void }[]', defaultValue: '[]', description: 'Menu items.' },
      { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled open state.' },
      { name: 'defaultOpen', type: 'boolean', defaultValue: '-', description: 'Default open state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '-', description: 'Open state change callback.' },
      { name: 'align', type: `'start' | 'center' | 'end'`, defaultValue: '-', description: 'Alignment relative to trigger.' },
      { name: 'side', type: `'top' | 'bottom' | 'left' | 'right'`, defaultValue: '-', description: 'Side to render the menu.' },
    ],
  },
  'empty-state': {
    description: 'Placeholder for empty data views with icon, description, and optional actions.',
    importCode: "import { EmptyState } from '@monority/ui'",
    usageCode: `<EmptyState title="No results found" description="Try adjusting your filters." />`,
    props: [
      { name: 'title', type: 'string', defaultValue: '-', description: 'Main empty state heading.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Supporting description.' },
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Optional icon.' },
      { name: 'action', type: 'ReactNode', defaultValue: '-', description: 'Primary action button.' },
      { name: 'secondaryAction', type: 'ReactNode', defaultValue: '-', description: 'Secondary action.' },
    ],
  },
  field: {
    description: 'Building block for form fields — wraps children with label, hint, and error markup.',
    importCode: "import { Field } from '@monority/ui'",
    usageCode: `<Field label="Full name" hint="As shown on your ID." error="">\n  <input className="mr-input" />\n</Field>`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description linked via aria-describedby.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message with aria-invalid.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required indicator.' },
      { name: 'htmlFor', type: 'string', defaultValue: '-', description: 'ID of the controlled input.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Input element.' },
    ],
  },
  'file-upload': {
    description: 'Drag-and-drop file upload area with action label and description.',
    importCode: "import { FileUpload } from '@monority/ui'",
    usageCode: `<FileUpload label="Attachment" actionLabel="Choose a file" />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'accept', type: 'string', defaultValue: '-', description: 'Accepted MIME types.' },
      { name: 'multiple', type: 'boolean', defaultValue: '-', description: 'Allow multiple files.' },
      { name: 'actionLabel', type: 'string', defaultValue: "'Choisir un fichier'", description: 'Action button label.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Helper description inside the drop zone.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
    ],
  },
  'filter-bar': {
    description: 'Simple wrapper for filter controls in a horizontal bar layout.',
    importCode: "import { FilterBar } from '@monority/ui'",
    usageCode: `<FilterBar>\n  <Select />\n  <Input placeholder="Search..." />\n</FilterBar>`,
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Filter controls.' },
    ],
  },
  'form-section': {
    description: 'Form section grouping using Card with title, description, meta, and actions.',
    importCode: "import { FormSection } from '@monority/ui'",
    usageCode: `<FormSection\n  title="Profile"\n  description="Update your personal information."\n>\n  <Input label="Full name" />\n</FormSection>`,
    props: [
      { name: 'title', type: 'ReactNode', defaultValue: '-', description: 'Section title.' },
      { name: 'description', type: 'ReactNode', defaultValue: '-', description: 'Section description.' },
      { name: 'meta', type: 'ReactNode', defaultValue: '-', description: 'Metadata rendered next to title.' },
      { name: 'actions', type: 'ReactNode', defaultValue: '-', description: 'Action buttons in the header.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Form fields.' },
    ],
  },
  grid: {
    description: 'CSS grid container with configurable column count.',
    importCode: "import { Grid } from '@monority/ui'",
    usageCode: `<Grid columns={2}>\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n  <div>Item 4</div>\n</Grid>`,
    props: [
      { name: 'columns', type: `1 | 2 | 3 | 4 | 'auto-fit' | 'auto-fill'`, defaultValue: '2', description: 'Number of grid columns.' },
    ],
  },
  'icon-button': {
    description: 'Icon-only button with an accessible aria-label.',
    importCode: "import { IconButton } from '@monority/ui'",
    usageCode: `<IconButton label="Close panel">\n  <XIcon />\n</IconButton>`,
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Accessible aria-label for the button.' },
    ],
  },
  'inline-alert': {
    description: 'Inline contextual message with tone and optional action.',
    importCode: "import { InlineAlert } from '@monority/ui'",
    usageCode: `<InlineAlert tone="warning" title="Storage almost full" description="Delete unused files." />`,
    props: [
      { name: 'tone', type: `'info' | 'success' | 'warning' | 'danger'`, defaultValue: '-', description: 'Visual tone.' },
      { name: 'title', type: 'string', defaultValue: '-', description: 'Alert title.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Alert description.' },
      { name: 'actionLabel', type: 'string', defaultValue: '-', description: 'Action button label.' },
      { name: 'onAction', type: '() => void', defaultValue: '-', description: 'Action callback.' },
    ],
  },
  'metric-grid': {
    description: 'Grid layout for StatCard items — renders a responsive grid of KPI cards.',
    importCode: "import { MetricGrid } from '@monority/ui'",
    usageCode: `<MetricGrid items={[\n  { label: 'Revenue', value: '$12,340', trend: '+12%', trendTone: 'success' },\n  { label: 'Users', value: '1,234', trend: '+8%', trendTone: 'success' },\n]} />`,
    props: [
      { name: 'items', type: '{ key?: string; label: string; value: string; trend?: string; trendTone?: string; description?: string; icon?: ReactNode; footer?: ReactNode }[]', defaultValue: '[]', description: 'KPI card data.' },
    ],
  },
  'number-input': {
    description: 'Number input with increment and decrement buttons.',
    importCode: "import { NumberInput } from '@monority/ui'",
    usageCode: `<NumberInput label="Quantity" min={0} max={100} step={1} />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'value', type: 'number', defaultValue: '-', description: 'Controlled value.' },
      { name: 'defaultValue', type: 'number', defaultValue: '-', description: 'Default value.' },
      { name: 'min', type: 'number', defaultValue: '-', description: 'Minimum value.' },
      { name: 'max', type: 'number', defaultValue: '-', description: 'Maximum value.' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Step increment.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
      { name: 'incrementLabel', type: 'string', defaultValue: '-', description: 'Accessible label for increment button.' },
      { name: 'decrementLabel', type: 'string', defaultValue: '-', description: 'Accessible label for decrement button.' },
    ],
  },
  'page-header': {
    description: 'Simple page header wrapper for title and description content.',
    importCode: "import { PageHeader } from '@monority/ui'",
    usageCode: `<PageHeader>\n  <h1>Page Title</h1>\n</PageHeader>`,
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Header content.' },
    ],
  },
  pagination: {
    description: 'Page navigation with prev/next buttons and numbered page buttons.',
    importCode: "import { Pagination } from '@monority/ui'",
    usageCode: `<Pagination page={1} totalPages={10} onPageChange={setPage} />`,
    props: [
      { name: 'page', type: 'number', defaultValue: '1', description: 'Current page.' },
      { name: 'totalPages', type: 'number', defaultValue: '1', description: 'Total page count.' },
      { name: 'onPageChange', type: '(page: number) => void', defaultValue: '-', description: 'Page change callback.' },
    ],
  },
  'password-input': {
    description: 'Password input with show/hide toggle button.',
    importCode: "import { PasswordInput } from '@monority/ui'",
    usageCode: `<PasswordInput label="Password" />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
      { name: 'showLabel', type: 'string', defaultValue: '-', description: 'Accessible label for show button.' },
      { name: 'hideLabel', type: 'string', defaultValue: '-', description: 'Accessible label for hide button.' },
    ],
  },
  popover: {
    description: 'Floating content panel triggered by an element.',
    importCode: "import { Popover } from '@monority/ui'",
    usageCode: `<Popover trigger={<Button>Open</Button>}>\n  <div style={{ padding: 16 }}>Popover content</div>\n</Popover>`,
    props: [
      { name: 'trigger', type: 'ReactNode', defaultValue: '-', description: 'Element that opens the popover.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Popover content.' },
      { name: 'open', type: 'boolean', defaultValue: '-', description: 'Controlled open state.' },
      { name: 'defaultOpen', type: 'boolean', defaultValue: '-', description: 'Default open state.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', defaultValue: '-', description: 'Open state change callback.' },
      { name: 'align', type: `'start' | 'center' | 'end'`, defaultValue: '-', description: 'Alignment relative to trigger.' },
      { name: 'side', type: `'top' | 'bottom' | 'left' | 'right'`, defaultValue: '-', description: 'Side to render the popover.' },
    ],
  },
  progress: {
    description: 'Horizontal progress bar with value display and semantic tones.',
    importCode: "import { Progress } from '@monority/ui'",
    usageCode: `<Progress value={75} label="Upload progress" />`,
    props: [
      { name: 'value', type: 'number', defaultValue: '0', description: 'Progress value (0–100).' },
      { name: 'label', type: 'string', defaultValue: '-', description: 'Accessible label.' },
      { name: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Show percentage text.' },
      { name: 'tone', type: `'neutral' | 'success' | 'warning' | 'danger'`, defaultValue: '-', description: 'Progress bar tone.' },
      { name: 'barClassName', type: 'string', defaultValue: '-', description: 'Class for the bar element.' },
    ],
  },
  'radio-group': {
    description: 'Radio button group with label, hint, error, and accessible keyboard navigation.',
    importCode: "import { RadioGroup } from '@monority/ui'",
    usageCode: `const items = [\n  { value: 'sm', label: 'Small' },\n  { value: 'md', label: 'Medium' },\n  { value: 'lg', label: 'Large', disabled: true },\n]\n\n<RadioGroup label="Size" items={items} />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Group label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'items', type: '{ value: string; label: string; description?: string; disabled?: boolean }[]', defaultValue: '[]', description: 'Radio options.' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled value.' },
      { name: 'defaultValue', type: 'string', defaultValue: '-', description: 'Default value.' },
      { name: 'onChange', type: '(value: string) => void', defaultValue: '-', description: 'Change callback.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
      { name: 'name', type: 'string', defaultValue: '-', description: 'HTML name attribute.' },
    ],
  },
  'search-input': {
    description: 'Search input with search icon and clear button.',
    importCode: "import { SearchInput } from '@monority/ui'",
    usageCode: `<SearchInput label="Search" placeholder="Search..." />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Controlled value.' },
      { name: 'defaultValue', type: 'string', defaultValue: '-', description: 'Default value.' },
      { name: 'placeholder', type: 'string', defaultValue: '-', description: 'Input placeholder.' },
      { name: 'clearLabel', type: 'string', defaultValue: '-', description: 'Accessible label for clear button.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
    ],
  },
  section: {
    description: 'Content section with configurable spacing.',
    importCode: "import { Section } from '@monority/ui'",
    usageCode: `<Section spacing="lg">\n  <h2>Content section</h2>\n</Section>`,
    props: [
      { name: 'spacing', type: `'sm' | 'md' | 'lg' | 'xl'`, defaultValue: '-', description: 'Vertical spacing preset.' },
    ],
  },
  select: {
    description: 'A dropdown menu that allows users to select one option from a list.',
    importCode: "import { Select } from '@monority/ui'",
    usageCode: `const [value, setValue] = useState('')\n\n<Select value={value} onChange={(e) => setValue(e.target.value)}>\n    <option value="">Select an option...</option>\n    <option value="option1">Option 1</option>\n    <option value="option2">Option 2</option>\n</Select>`,
    props: [
      { name: 'value', type: 'string', defaultValue: '-', description: 'Selected value' },
      { name: 'onChange', type: 'function', defaultValue: '-', description: 'Change callback' },
      { name: 'label', type: 'string', defaultValue: '-', description: 'Field label' },
    ],
  },
  'sidebar-layout': {
    description: 'Two-column layout with sidebar and main content area.',
    importCode: "import { SidebarLayout } from '@monority/ui'",
    usageCode: `<SidebarLayout sidebar={<nav>...</nav>}>\n  <main>Main content</main>\n</SidebarLayout>`,
    props: [
      { name: 'sidebar', type: 'ReactNode', defaultValue: '-', description: 'Sidebar content.' },
      { name: 'header', type: 'ReactNode', defaultValue: '-', description: 'Optional header content.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Main content.' },
      { name: 'sidebarWidth', type: `'sm' | 'md' | 'lg'`, defaultValue: '-', description: 'Sidebar width preset.' },
    ],
  },
  skeleton: {
    description: 'Placeholder loading skeleton that extends HTML div attributes.',
    importCode: "import { Skeleton } from '@monority/ui'",
    usageCode: `<Skeleton style={{ width: 200, height: 20 }} />`,
    props: [],
  },
  slider: {
    description: 'Range slider with optional value display.',
    importCode: "import { Slider } from '@monority/ui'",
    usageCode: `<Slider label="Brightness" value={value} onChange={setValue} />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'value', type: 'number', defaultValue: '-', description: 'Controlled value.' },
      { name: 'defaultValue', type: 'number', defaultValue: '50', description: 'Default value.' },
      { name: 'min', type: 'number', defaultValue: '0', description: 'Minimum value.' },
      { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value.' },
      { name: 'step', type: 'number', defaultValue: '1', description: 'Step increment.' },
      { name: 'showValue', type: 'boolean', defaultValue: 'true', description: 'Show current value display.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
    ],
  },
  spinner: {
    description: 'A visual indicator that an action is in progress.',
    importCode: "import { Spinner } from '@monority/ui'",
    usageCode: `<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />`,
    props: [
      { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: "'md'", description: 'Size of the spinner' },
    ],
  },
  stack: {
    description: 'Flexbox column layout with controlled gap between children.',
    importCode: "import { Stack } from '@monority/ui'",
    usageCode: `<Stack gap="md">\n  <div>Item 1</div>\n  <div>Item 2</div>\n</Stack>`,
    props: [
      { name: 'gap', type: `'xs' | 's' | 'sm' | 'm' | 'md' | 'l' | 'lg' | 'xl'`, defaultValue: "'m'", description: 'Gap between children.' },
    ],
  },
  'stat-card': {
    description: 'KPI / statistic card with label, value, trend, icon, and footer.',
    importCode: "import { StatCard } from '@monority/ui'",
    usageCode: `<StatCard label="Revenue" value="$12,340" trend="+12%" trendTone="success" />`,
    props: [
      { name: 'label', type: 'string', defaultValue: '-', description: 'Metric label.' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Metric value.' },
      { name: 'trend', type: 'string', defaultValue: '-', description: 'Trend indicator text.' },
      { name: 'trendTone', type: 'string', defaultValue: '-', description: 'Trend visual tone.' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Supporting description.' },
      { name: 'icon', type: 'ReactNode', defaultValue: '-', description: 'Optional icon.' },
      { name: 'footer', type: 'ReactNode', defaultValue: '-', description: 'Optional footer content.' },
    ],
  },
  table: {
    description: 'A structured display of data in rows and columns with sorting and filtering capabilities.',
    importCode: "import { Table } from '@monority/ui'",
    usageCode: `const columns = [\n    { key: 'name', header: 'Name' },\n    { key: 'email', header: 'Email' },\n]\n\nconst rows = [\n    { name: 'John Doe', email: 'john@example.com' },\n    { name: 'Jane Smith', email: 'jane@example.com' },\n]\n\n<Table columns={columns} rows={rows} />`,
    props: [
      { name: 'columns', type: 'Column[]', defaultValue: '[]', description: 'Column definitions' },
      { name: 'rows', type: 'Record<string, ReactNode>[]', defaultValue: '[]', description: 'Table data' },
      { name: 'emptyState', type: 'ReactNode', defaultValue: 'Built-in empty state', description: 'Custom empty state content' },
    ],
  },
  tabs: {
    description: 'A set of layered sections of content that display one panel at a time.',
    importCode: "import { Tabs } from '@monority/ui'",
    usageCode: `const [value, setValue] = useState('tab1')\n\n<Tabs\n    items={[\n        { value: 'tab1', label: 'Tab 1' },\n        { value: 'tab2', label: 'Tab 2' },\n    ]}\n    value={value}\n    onChange={setValue}\n/>`,
    props: [
      { name: 'items', type: `{ value: string; label: string }[]`, defaultValue: '[]', description: 'Tab definitions' },
      { name: 'value', type: 'string', defaultValue: '-', description: 'Currently selected value' },
      { name: 'onChange', type: 'function', defaultValue: '-', description: 'Tab change callback' },
    ],
  },
  text: {
    description: 'Polymorphic text component with tone and size variants.',
    importCode: "import { Text } from '@monority/ui'",
    usageCode: `<Text as="p" tone="muted" size="md">Muted paragraph text</Text>\n<Text as="span" tone="strong">Strong span text</Text>`,
    props: [
      { name: 'as', type: `'p' | 'span' | 'div'`, defaultValue: "'p'", description: 'Polymorphic element type.' },
      { name: 'tone', type: `'muted' | 'base' | 'strong'`, defaultValue: '-', description: 'Text tone / emphasis.' },
      { name: 'size', type: `'sm' | 'md' | 'lg'`, defaultValue: '-', description: 'Text size preset.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Text content.' },
    ],
  },
  textarea: {
    description: 'Multi-line text input with Field wrapper for label, hint, and error.',
    importCode: "import { Textarea } from '@monority/ui'",
    usageCode: `<Textarea label="Description" rows={5} />`,
    props: [
      { name: 'label', type: 'ReactNode', defaultValue: '-', description: 'Field label.' },
      { name: 'hint', type: 'ReactNode', defaultValue: '-', description: 'Helpful description.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error message.' },
      { name: 'required', type: 'boolean', defaultValue: 'false', description: 'Required field indicator.' },
      { name: 'rows', type: 'number', defaultValue: '5', description: 'Number of visible rows.' },
    ],
  },
  title: {
    description: 'Polymorphic heading component with size variants.',
    importCode: "import { Title } from '@monority/ui'",
    usageCode: `<Title as="h1" size="display">Display Title</Title>\n<Title as="h2" size="lg">Large Heading</Title>`,
    props: [
      { name: 'as', type: `'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'`, defaultValue: "'h2'", description: 'Heading level.' },
      { name: 'size', type: `'sm' | 'md' | 'lg' | 'display'`, defaultValue: '-', description: 'Title size preset.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Heading content.' },
    ],
  },
  toast: {
    description: 'A notification that appears temporarily to inform users of important events.',
    importCode: "import { useToast } from '@monority/ui'",
    usageCode: `import { useToast, Button } from '@monority/ui'\n\nfunction MyComponent() {\n    const { pushToast } = useToast()\n\n    return (\n        <Button onClick={() => pushToast({\n            title: 'Success',\n            description: 'Action completed',\n        })}>\n            Show Toast\n        </Button>\n    )\n}`,
    props: [
      { name: 'title', type: 'string', defaultValue: '-', description: 'Toast title' },
      { name: 'description', type: 'string', defaultValue: '-', description: 'Toast description' },
      { name: 'tone', type: `'neutral' | 'success' | 'danger'`, defaultValue: "'neutral'", description: 'Visual tone of the toast' },
    ],
  },
  toolbar: {
    description: 'Toolbar wrapper for grouping action controls in a horizontal layout.',
    importCode: "import { Toolbar } from '@monority/ui'",
    usageCode: `<Toolbar>\n  <Button>Save</Button>\n  <Button variant="ghost">Cancel</Button>\n</Toolbar>`,
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Toolbar content.' },
    ],
  },
  tooltip: {
    description: 'CSS-based tooltip that appears on hover.',
    importCode: "import { Tooltip } from '@monority/ui'",
    usageCode: `<Tooltip content="Tooltip text">\n  <Button>Hover me</Button>\n</Tooltip>`,
    props: [
      { name: 'content', type: 'ReactNode', defaultValue: '-', description: 'Tooltip content.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Trigger element.' },
    ],
  },
  topbar: {
    description: 'Top header bar wrapper using the HTML <header> element.',
    importCode: "import { Topbar } from '@monority/ui'",
    usageCode: `<Topbar>\n  <span>Logo</span>\n  <nav>Navigation</nav>\n</Topbar>`,
    props: [
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'Header content.' },
    ],
  },
  'async-state-notice': {
    description: 'Displays loading or error state notices for async operations.',
    importCode: "import { AsyncStateNotice } from '@monority/ui'",
    usageCode: `<AsyncStateNotice isLoading={loading} isError={error} />`,
    props: [
      { name: 'isLoading', type: 'boolean', defaultValue: '-', description: 'Show loading state.' },
      { name: 'isError', type: 'boolean', defaultValue: '-', description: 'Show error state.' },
      { name: 'loadingMessage', type: 'string', defaultValue: '-', description: 'Loading message text.' },
      { name: 'errorMessage', type: 'string', defaultValue: '-', description: 'Error message text.' },
      { name: 'loadingContent', type: 'ReactNode', defaultValue: '-', description: 'Custom loading content.' },
    ],
  },
  'infinite-scroll': {
    description: 'Infinite scroll container with IntersectionObserver-based loading, loader, end message, and error states.',
    importCode: "import { InfiniteScroll } from '@monority/ui/infinite-scroll'",
    usageCode: `<InfiniteScroll onLoadMore={handleLoadMore} hasMore={hasMore}>\n  {items.map((item) => (\n    <div key={item}>{item}</div>\n  ))}\n</InfiniteScroll>`,
    props: [
      { name: 'onLoadMore', type: '() => void', defaultValue: '-', description: 'Callback triggered when sentinel enters viewport.' },
      { name: 'hasMore', type: 'boolean', defaultValue: 'true', description: 'Whether more items can be loaded.' },
      { name: 'loader', type: 'ReactNode', defaultValue: '-', description: 'Content shown while loading.' },
      { name: 'endMessage', type: 'ReactNode', defaultValue: '-', description: 'Content shown when all items are loaded.' },
      { name: 'error', type: 'ReactNode', defaultValue: '-', description: 'Error content shown on load failure.' },
      { name: 'onRetry', type: '() => void', defaultValue: '-', description: 'Retry callback for error state.' },
      { name: 'children', type: 'ReactNode', defaultValue: '-', description: 'List items to render.' },
    ],
    a11y: ['IntersectionObserver-based loading', 'Sentinel is aria-hidden', 'Loading/error states announced via aria-live'],
  },
};

// Generate directories
let created = 0;
let skipped = 0;

for (const entry of registryEntries) {
  const { slug, label, category, status } = entry;
  const pascalName = toPascalCase(slug);
  const camelName = toCamelCase(slug);
  const dirPath = path.join(SRC_DOCS, slug);
  
  // Skip if directory already exists
  if (fs.existsSync(dirPath)) {
    console.log(`  [SKIP] ${slug} (exists)`);
    skipped++;
    continue;
  }
  
  fs.mkdirSync(dirPath, { recursive: true });
  
  const data = componentData[slug] || {
    description: `${label} component.`,
    importCode: `import { ${pascalName} } from '@monority/ui'`,
    usageCode: `<${pascalName} />`,
    props: [],
  };
  
  // Generate index.ts
  const indexContent = `export { ${pascalName}Docs } from './${pascalName}.docs'
export { ${pascalName}BasicExample } from './${pascalName}.examples'
export { ${camelName}Meta } from './${pascalName}.meta'
`;
  fs.writeFileSync(path.join(dirPath, 'index.ts'), indexContent);
  
  // Generate Component.meta.ts
  const metaContent = `export const ${camelName}Meta = {
  title: '${label}',
  status: '${status}',
  package: '@monority/ui/${slug}',
  import: "${data.importCode.replace(/'/g, "\\'")}",
  category: '${category}',
  anatomy: ['root'],
  accessibility: ['See component source'],
}
`;
  fs.writeFileSync(path.join(dirPath, `${pascalName}.meta.ts`), metaContent);
  
  // Generate Component.examples.tsx
  const importPath = data.importCode.match(/from\s+'([^']+)'/)?.[1] || '@monority/ui';
  const exampleContent = `import { ${pascalName} } from '${importPath}'

export function ${pascalName}BasicExample() {
  return (
    <>
      <${pascalName}>Example</${pascalName}>
    </>
  )
}
`;
  fs.writeFileSync(path.join(dirPath, `${pascalName}.examples.tsx`), exampleContent);
  
  // Generate Component.docs.tsx
  const propsBlock = data.props.length > 0 ? `
  props: [
${data.props.map(p => `    { name: '${p.name}', type: \`${p.type}\`, defaultValue: ${JSON.stringify(p.defaultValue)}, description: ${JSON.stringify(p.description)} }`).join(',\n')}
  ],` : '';
  
  const cssHooksBlock = data.cssHooks && data.cssHooks.length > 0 ? `
  cssHooks: [${data.cssHooks.map(h => `'${h}'`).join(', ')}],` : '';
  
  const tokensBlock = data.tokens && data.tokens.length > 0 ? `
  tokens: [${data.tokens.map(t => `'${t}'`).join(', ')}],` : '';
  
  const a11yBlock = data.a11y && data.a11y.length > 0 ? `
  a11y: [${data.a11y.map(a => JSON.stringify(a)).join(', ')}],` : '';
  
  const docsContent = `import { DocPage, type DocPageData } from '../DocPage'
import { ${pascalName} } from '${importPath}'
import { ${pascalName}BasicExample } from './${pascalName}.examples'

const docData: DocPageData = {
  title: '${label}',
  description: ${JSON.stringify(data.description)},
  importCode: ${JSON.stringify(data.importCode)},
  usageCode: \`${data.usageCode.replace(/`/g, '\\`')}\`,
  preview: () => <${pascalName}BasicExample />,${propsBlock}${cssHooksBlock}${tokensBlock}${a11yBlock}
}

export function ${pascalName}Docs() {
  return <DocPage doc={docData} />
}
`;
  fs.writeFileSync(path.join(dirPath, `${pascalName}.docs.tsx`), docsContent);
  
  created++;
}

console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
console.log(`Total structured directories: ${created + skipped}`);
