import { DocPage, type DocPageData } from '../DocPage'
import {
  ResizableHorizontalExample,
  ResizableVerticalExample,
  ResizableWithHandleExample,
  ResizableThreePanelsExample,
} from './Resizable.examples'

const docData: DocPageData = {
  title: 'Resizable',
  description: 'Panels with draggable resize handles, allowing users to resize horizontal or vertical panels.',
  importCode: "import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@monority/ui'",
  usageCode: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30}>
    <div>Left panel</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>
    <div>Right panel</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
  preview: () => <ResizableHorizontalExample />,
  examples: [
    { title: 'Vertical panels', content: <ResizableVerticalExample /> },
    { title: 'With handle indicator', content: <ResizableWithHandleExample /> },
    { title: 'Three panels', content: <ResizableThreePanelsExample /> },
  ],
  props: [
    {
      name: 'direction',
      type: "'horizontal' | 'vertical'",
      defaultValue: "'horizontal'",
      description: 'Layout direction of the panel group.',
    },
    {
      name: 'defaultSize',
      type: 'number',
      defaultValue: '50',
      description: 'Initial size of the panel as a percentage.',
    },
    {
      name: 'minSize',
      type: 'number',
      defaultValue: '10',
      description: 'Minimum size of the panel as a percentage.',
    },
    {
      name: 'maxSize',
      type: 'number',
      defaultValue: '90',
      description: 'Maximum size of the panel as a percentage.',
    },
    {
      name: 'withHandle',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Show a visual grip indicator on the handle.',
    },
  ],
  cssHooks: [
    '.mr-resizable',
    '.mr-resizable--horizontal',
    '.mr-resizable--vertical',
    '.mr-resizable--dragging',
    '.mr-resizable__panel',
    '.mr-resizable__handle',
    '.mr-resizable__handle--horizontal',
    '.mr-resizable__handle--vertical',
    '.mr-resizable__handle--active',
    '.mr-resizable__handle-indicator',
  ],
  tokens: [
    '--mr-bg-surface',
    '--mr-bg-surface-strong',
    '--mr-border-subtle',
    '--mr-fg-muted',
  ],
  a11y: [
    'Handles use role="separator" with aria-orientation matching the group direction.',
    'Handles are keyboard-focusable (tabIndex=0) and respond to arrow keys.',
    'Shift+Arrow keys resize by 10% steps, regular arrows by 1%.',
    'aria-valuenow reflects the current size percentage of the preceding panel.',
    'Dragging disables text selection on the group via mr-resizable--dragging class.',
  ],
}

export function ResizableDocs() {
  return <DocPage doc={docData} />
}
