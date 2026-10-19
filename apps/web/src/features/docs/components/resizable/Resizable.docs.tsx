import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@monority/ui/resizable'
import { useState } from 'react'
import { ComponentPlayground } from '../../components/ComponentPlayground/ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    ResizableThreePanelsExample,
    ResizableVerticalExample,
    ResizableWithHandleExample,
} from './Resizable.examples'

function ResizablePlayground() {
    const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal')
    const [withHandle, setWithHandle] = useState(true)

    const snippet = `<ResizablePanelGroup direction="${direction}">
  <ResizablePanel defaultSize={35}>
    <div>Panneau 1 (35%)</div>
  </ResizablePanel>
  <ResizableHandle${withHandle ? ' withHandle' : ''} />
  <ResizablePanel defaultSize={65}>
    <div>Panneau 2 (65%)</div>
  </ResizablePanel>
</ResizablePanelGroup>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: 'Orientation',
                    value: direction,
                    options: [
                        { value: 'horizontal', label: 'Horizontal' },
                        { value: 'vertical', label: 'Vertical' },
                    ],
                    onChange: (v) => setDirection(v as 'horizontal' | 'vertical'),
                },
                {
                    type: 'boolean',
                    label: 'Poignée visuelle (withHandle)',
                    value: withHandle,
                    onChange: setWithHandle,
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    height: 200,
                    width: '100%',
                    border: '1px solid var(--mr-border-subtle, #e2e8f0)',
                    borderRadius: 8,
                    overflow: 'hidden',
                }}
            >
                <ResizablePanelGroup direction={direction}>
                    <ResizablePanel defaultSize={35}>
                        <div
                            style={{
                                padding: 16,
                                background: 'var(--mr-bg-sunken, #f8fafc)',
                                height: '100%',
                                fontSize: '0.875rem',
                            }}
                        >
                            <strong>Panneau A</strong>
                            <p
                                style={{
                                    margin: '8px 0 0',
                                    color: 'var(--mr-text-secondary, #64748b)',
                                }}
                            >
                                Redimensionnez avec la souris ou au clavier (flèches).
                            </p>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle={withHandle} />
                    <ResizablePanel defaultSize={65}>
                        <div
                            style={{
                                padding: 16,
                                background: 'var(--mr-bg-surface, #ffffff)',
                                height: '100%',
                                fontSize: '0.875rem',
                            }}
                        >
                            <strong>Panneau B</strong>
                            <p
                                style={{
                                    margin: '8px 0 0',
                                    color: 'var(--mr-text-secondary, #64748b)',
                                }}
                            >
                                Zone de contenu adaptative.
                            </p>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Resizable',
    description:
        'Panels with draggable resize handles, allowing users to resize horizontal or vertical panels.',
    importCode:
        "import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@monority/ui'",
    usageCode: `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={30}>
    <div>Left panel</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={70}>
    <div>Right panel</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
    preview: () => <ResizablePlayground />,
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
        '[data-direction]',
        '[data-dragging]',
        '[data-active]',
    ],
    tokens: [
        '--mr-bg-surface',
        '--mr-bg-surface-strong',
        '--mr-border-subtle',
        '--mr-text-secondary',
    ],
    keyboardNavigation: [
        { key: 'Flèche Gauche / Haut', action: 'Diminue la taille du panneau précédent de 1%' },
        { key: 'Flèche Droite / Bas', action: 'Augmente la taille du panneau précédent de 1%' },
        { key: 'Shift + Flèche', action: 'Ajuste la taille par pas de 10%' },
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
