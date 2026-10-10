import { useState } from 'react'
import { Drawer } from '@monority/ui/drawer'
import { Button } from '@monority/ui/button'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const defaults: PlaygroundProps = {
    title: 'Panneau lateral',
    side: 'right',
}

function DrawerDemo(props: PlaygroundProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir le tiroir (Drawer)</Button>
            <Drawer
                open={open}
                title={String(props.title ?? 'Panneau lateral')}
                side={props.side as 'right' | 'left'}
                onClose={() => setOpen(false)}
            >
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Contenu du tiroir lateral ancre sur le bord {String(props.side ?? 'right')}.
                </p>
            </Drawer>
        </>
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<Drawer open={open} title="${String(props.title ?? 'Panneau')}" side="${String(props.side ?? 'right')}" onClose={() => setOpen(false)}>\n  <p>Contenu du tiroir</p>\n</Drawer>`
}

export const drawerPlayground: PlaygroundDefinition = {
    slug: 'drawer',
    label: 'Drawer',
    docsPath: '/docs/drawer',
    importStatement: "import { Drawer } from '@monority/ui/drawer'",
    controls: [
        { name: 'side', type: 'select', options: ['right', 'left'] },
        { name: 'title', type: 'text', placeholder: 'Titre du tiroir' },
    ],
    defaultProps: defaults,
    render: (props) => <DrawerDemo {...props} />,
    generateCode: codeFor,
}
