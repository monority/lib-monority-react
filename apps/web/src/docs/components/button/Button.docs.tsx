import { DocPage, type DocPageData } from '../DocPage'
import {
  ButtonBasicPreview,
  ButtonVariantsExample,
  ButtonSizesExample,
  ButtonLoadingExample,
  ButtonIconsExample,
  ButtonCopyExample,
  ButtonIconOnlyExample,
  ButtonFullWidthExample,
} from './Button.examples'

const docData: DocPageData = {
  title: 'Button',
  description: 'A unified action component. Supports text, icons, loading, copy-to-clipboard, and icon-only modes.',
  importCode: "import { Button } from '@monority/ui/button'",
  usageCode: '<Button>Button</Button>',
  previewLabel: 'button.tsx',
  preview: () => <ButtonBasicPreview />,
  examples: [
    { title: 'Variants', content: <ButtonVariantsExample /> },
    { title: 'Sizes', content: <ButtonSizesExample /> },
    { title: 'Loading', content: <ButtonLoadingExample /> },
    { title: 'With Icons', content: <ButtonIconsExample /> },
    { title: 'Copy Mode', content: <ButtonCopyExample /> },
    { title: 'Icon Only', content: <ButtonIconOnlyExample /> },
    { title: 'Full Width', content: <ButtonFullWidthExample /> },
  ],
  props: [
    { name: 'variant', type: "'primary' | 'secondary' | 'muted' | 'ghost' | 'subtle' | 'danger'", defaultValue: "'primary'", description: 'Visual intent.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Control density.' },
    { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Disables action and marks busy state.' },
    { name: 'fullWidth', type: 'boolean', defaultValue: 'false', description: 'Stretches button to container width.' },
    { name: 'as', type: 'ElementType', defaultValue: "'button'", description: 'Render as a different element (a, span, etc.).' },
    { name: 'iconLeading', type: 'ReactNode', defaultValue: '-', description: 'Icon displayed before the label.' },
    { name: 'iconTrailing', type: 'ReactNode', defaultValue: '-', description: 'Icon displayed after the label.' },
    { name: 'type', type: "'button' | 'submit' | 'reset'", defaultValue: "'button'", description: 'Native button type attribute.' },
    { name: 'copyValue', type: 'string', defaultValue: '-', description: 'Enables copy mode. Copies this text on click.' },
    { name: 'copiedLabel', type: 'string', defaultValue: "'Copied!'", description: 'Label shown briefly after copying.' },
    { name: 'duration', type: 'number', defaultValue: '2000', description: 'Duration (ms) to show copied label.' },
    { name: 'iconOnly', type: 'boolean', defaultValue: 'false', description: 'Icon-only mode: fixed w/h, requires aria-label.' },
  ],
  cssHooks: [
    '.mr-btn', '.mr-btn--icon-only', '.mr-btn--copied',
    '[data-variant]', '[data-size]', '[data-loading]',
    '[data-disabled]', '[data-full-width]', '[data-copied]', '[data-icon-only]',
  ],
  tokens: [
    '--mr-accent', '--mr-accent-contrast', '--mr-accent-strong',
    '--mr-border-subtle', '--mr-bg-surface-strong', '--mr-bg-control',
    '--mr-bg-accent-soft', '--mr-bg-surface-elevated',
    '--mr-fg-base', '--mr-fg-strong',
    '--mr-danger', '--mr-success',
    '--mr-space-*', '--mr-text-*', '--mr-radius-sm',
    '--mr-dur-150', '--mr-ease-in-out',
  ],
  a11y: [
    'Native <button> semantics by default.',
    'Supports aria-busy during loading.',
    'Icon-only mode REQUIRES an aria-label for screen readers.',
    'Visible focus ring via shared focus tokens.',
  ],
}

export function ButtonDocs() {
  return <DocPage doc={docData} />
}
