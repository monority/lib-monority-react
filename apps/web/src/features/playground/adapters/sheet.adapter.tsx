import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Sheet } from '@monority/ui/sheet'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    title: 'Parametres avances',
    description: 'Ajustez les options du panneau.',
    side: 'right',
}

function SheetDemo(props: PlaygroundProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir le volet (Sheet)</Button>
            <Sheet
                open={open}
                title={String(props.title ?? 'Parametres avances')}
                description={String(props.description ?? '')}
                side={props.side as 'right'}
                onClose={() => setOpen(false)}
            >
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Contenu interactif du volet coulissant sur le bord{' '}
                    {String(props.side ?? 'right')}.
                </p>
            </Sheet>
        </>
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<Sheet open={open} title="${String(props.title ?? 'Parametres')}" side="${String(props.side ?? 'right')}" onClose={() => setOpen(false)}>
  <p>Contenu du volet</p>
</Sheet>`
}

export const sheetPlayground: PlaygroundDefinition = {
    slug: 'sheet',
    label: 'Sheet',
    docsPath: '/docs/sheet',
    importStatement: "import { Sheet } from '@monority/ui/sheet'",
    controls: [
        {
            name: 'side',
            type: 'select',
            options: ['right', 'left', 'top', 'bottom'],
        },
        { name: 'title', type: 'text', placeholder: 'Titre du volet' },
        { name: 'description', type: 'text', placeholder: 'Description optionnelle' },
    ],
    defaultProps: defaults,
    render: (props) => <SheetDemo {...props} />,
    generateCode: codeFor,
}
