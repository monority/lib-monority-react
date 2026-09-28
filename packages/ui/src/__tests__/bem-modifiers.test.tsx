import { act, createRef, type ReactElement } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, describe, expect, it } from 'vitest'
import { Avatar } from '@/components/display/avatar'
import { Section } from '@/components/layout/section'
import { AsyncStateNotice } from '@/components/feedback/async-state-notice'
import { Badge } from '@/components/feedback/badge'
import { Banner } from '@/components/feedback/banner'
import { Callout } from '@/components/feedback/callout'
import { InlineAlert } from '@/components/feedback/inline-alert'
import { Progress } from '@/components/feedback/progress'
import { Spinner } from '@/components/feedback/spinner'
import { Drawer } from '@/components/overlays/drawer'
import { Text } from '@/components/typography/text'
import { Title } from '@/components/typography/title'
import { Checkbox } from '@/components/forms/checkbox'
import { Input } from '@/components/forms/input'
import { NumberInput } from '@/components/forms/number-input'
import { PasswordInput } from '@/components/forms/password-input'
import { RadioGroup } from '@/components/forms/radio-group'
import { Slider } from '@/components/forms/slider'
import { Textarea } from '@/components/forms/textarea'
import { Toggle } from '@/components/actions/toggle'
import { ToggleGroup } from '@/components/actions/toggle-group'
import { Switch } from '@/components/forms/switch'

/**
 * Vague A1 de la migration BEM → `data-*` : ces composants portaient leurs
 * variantes, tailles et états à la fois en classes BEM (`mr-x--variant`) et en
 * attributs `data-*`. Les modifiers BEM ont été supprimés ; ce test verrouille
 * l'absence de réintroduction et la présence du hook `data-*` correspondant.
 */
let container: HTMLDivElement | null = null
let root: ReturnType<typeof createRoot> | null = null

function render(ui: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    act(() => {
        root?.render(ui)
    })
    return container
}

afterEach(() => {
    act(() => {
        root?.unmount()
    })
    container?.remove()
    container = null
    root = null
})

const CASES: Array<{ name: string; element: ReactElement; hook: string }> = [
    { name: 'AsyncStateNotice', element: <AsyncStateNotice isLoading />, hook: 'data-state' },
    { name: 'Avatar', element: <Avatar />, hook: 'data-size' },
    { name: 'Badge', element: <Badge>New</Badge>, hook: 'data-variant' },
    { name: 'Banner', element: <Banner>Message</Banner>, hook: 'data-tone' },
    { name: 'Callout', element: <Callout>Message</Callout>, hook: 'data-tone' },
    {
        name: 'Drawer',
        element: (
            <Drawer open title="T" onClose={() => {}}>
                Contenu
            </Drawer>
        ),
        hook: 'data-side',
    },
    { name: 'InlineAlert', element: <InlineAlert>Message</InlineAlert>, hook: 'data-tone' },
    { name: 'Progress', element: <Progress value={50} />, hook: 'data-tone' },
    { name: 'Section', element: <Section>Contenu</Section>, hook: 'data-spacing' },
    { name: 'Spinner', element: <Spinner />, hook: 'data-size' },
    { name: 'Text', element: <Text>Texte</Text>, hook: 'data-tone' },
    { name: 'Title', element: <Title>Title</Title>, hook: 'data-size' },
]

/**
 * Vague B1 (contrôles de formulaire). Le motif de détection ignore
 * volontairement les modifiers d'**élément** (`mr-x__y--z`) : ils conservent
 * une fonction structurelle (boutons incrémentaux, item actif d'un groupe).
 */
const B1_CASES: Array<{ name: string; element: ReactElement; hook: string }> = [
    { name: 'Input', element: <Input label="Nom" />, hook: 'data-size' },
    { name: 'Textarea', element: <Textarea label="Bio" />, hook: 'data-size' },
    { name: 'NumberInput', element: <NumberInput label="Quantité" />, hook: 'data-size' },
    { name: 'PasswordInput', element: <PasswordInput label="Mot de passe" />, hook: 'data-size' },
    { name: 'Checkbox', element: <Checkbox label="Accepter" />, hook: 'data-tone' },
    { name: 'RadioGroup', element: <RadioGroup />, hook: 'data-size' },
    { name: 'Switch', element: <Switch label="Actif" />, hook: 'data-size' },
    { name: 'Toggle', element: <Toggle>Toggle</Toggle>, hook: 'data-size' },
    {
        name: 'ToggleGroup',
        element: (
            <ToggleGroup
                orientation="vertical"
                items={[
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                ]}
            />
        ),
        hook: 'data-orientation',
    },
    { name: 'Slider', element: <Slider />, hook: 'data-size' },
]

describe('modifiers BEM → data-* (vague A1)', () => {
    for (const { name, element, hook } of [...CASES, ...B1_CASES]) {
        it(`${name} n’émet aucun modifier BEM et expose ${hook}`, () => {
            const view = render(element)
            const scope = [view, document]
            const modifiers = scope
                .flatMap((root) => [...root.querySelectorAll('[class*="mr-"]')])
                .flatMap((el) => (el.getAttribute('class') ?? '').split(/\s+/))
                .filter((className) => /^mr-[a-z0-9-]+--[a-z0-9-]+$/.test(className))

            expect([...new Set(modifiers)], `${name} émet : ${modifiers.join(', ')}`).toEqual([])
            expect(document.querySelector(`[${hook}]`), `${name} : ${hook} absent`).toBeTruthy()
        })
    }

    it('conserve les classes structurelles et les refs', () => {
        const ref = createRef<HTMLSpanElement>()
        const view = render(<Spinner ref={ref} />)
        expect(view.querySelector('.mr-spinner')).toBeTruthy()
        expect(ref.current).toBeTruthy()
    })
})
