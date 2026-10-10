import { DropdownMenu } from '@monority/ui/dropdown-menu'
import { Button } from '@monority/ui/button'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const sampleItems = [
    { value: 'profile', label: 'Mon profil' },
    { value: 'settings', label: 'Parametres du compte' },
    { value: 'sep1', type: 'separator' as const },
    { value: 'logout', label: 'Se deconnecter', danger: true },
]

const defaults: PlaygroundProps = {
    align: 'end',
    side: 'bottom',
}

function DropdownMenuDemo(props: PlaygroundProps) {
    return (
        <DropdownMenu
            trigger={<Button variant="secondary">Actions du compte</Button>}
            items={sampleItems}
            align={props.align as 'end' | 'center' | 'start'}
            side={props.side as 'bottom' | 'top'}
        />
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<DropdownMenu trigger={<Button>Actions</Button>} items={items} align="${String(props.align ?? 'end')}" />`
}

export const dropdownMenuPlayground: PlaygroundDefinition = {
    slug: 'dropdown-menu',
    label: 'DropdownMenu',
    docsPath: '/docs/dropdown-menu',
    importStatement: "import { DropdownMenu } from '@monority/ui/dropdown-menu'",
    controls: [
        { name: 'align', type: 'select', options: ['start', 'center', 'end'] },
        { name: 'side', type: 'select', options: ['bottom', 'top'] },
    ],
    defaultProps: defaults,
    render: (props) => <DropdownMenuDemo {...props} />,
    generateCode: codeFor,
}
