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
import { Collapsible } from '@/components/display/collapsible'
import { Accordion } from '@/components/display/accordion'
import { DropdownMenu } from '@/components/overlays/dropdown-menu'
import { Popover } from '@/components/overlays/popover'
import { AlertDialog } from '@/components/overlays/alert-dialog'
import { Toast } from '@/components/feedback/toast'
import { Card } from '@/components/display/card'
import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Stack } from '@/components/layout/stack'
import { Skeleton } from '@/components/feedback/skeleton'
import { Tabs } from '@/components/navigation/tabs'
import { Kbd } from '@/components/typography/kbd'
import { PreCode } from '@/components/typography/pre-code'
import { Separator } from '@/components/layout/separator'
import { DataList } from '@/components/data/data-list'
import { Combobox } from '@/components/forms/combobox'
import { DatePicker } from '@/components/forms/date-picker'
import { HoverCard } from '@/components/overlays/hover-card'
import { Carousel } from '@/components/display/carousel'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/layout/resizable'

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

/**
 * Vague C1 (overlays / interactions / états composés). DropdownMenu et Popover
 * portaient en plus des element modifiers `__content--side` redondants avec
 * `data-side` / `data-align` de la racine : ces derniers sont désormais l'unique
 * source de vérité.
 */
const C1_CASES: Array<{ name: string; element: ReactElement; hook: string }> = [
    {
        name: 'Collapsible',
        element: <Collapsible title="Section">Contenu</Collapsible>,
        hook: 'data-size',
    },
    {
        name: 'Collapsible ouvert',
        element: (
            <Collapsible title="Section" open>
                Contenu
            </Collapsible>
        ),
        hook: 'data-state',
    },
    {
        name: 'Accordion',
        element: (
            <Accordion>
                <Accordion.Item title="A">A</Accordion.Item>
            </Accordion>
        ),
        hook: 'data-size',
    },
    {
        name: 'AlertDialog',
        element: (
            <AlertDialog open title="T" description="D" onCancel={() => {}} onConfirm={() => {}}>
                Contenu
            </AlertDialog>
        ),
        hook: 'data-tone',
    },
    {
        name: 'Toast',
        element: <Toast title="T" tone="success" onClose={() => {}} />,
        hook: 'data-tone',
    },
    {
        name: 'DropdownMenu',
        element: <DropdownMenu trigger="Ouvrir">Contenu</DropdownMenu>,
        hook: 'data-align',
    },
    {
        name: 'DropdownMenu aligné',
        element: (
            <DropdownMenu trigger="Ouvrir" align="center" side="top">
                Contenu
            </DropdownMenu>
        ),
        hook: 'data-side',
    },
    { name: 'Popover', element: <Popover trigger="Ouvrir">Contenu</Popover>, hook: 'data-align' },
]

/**
 * Vague B2 (layout & structurels). Card expose `data-padding`/`data-interactive`,
 * Grid `data-columns`, Stack `data-gap`/`data-direction`/`data-align`/
 * `data-justify`, Skeleton `data-size`/`data-rounded`, Tabs `data-tone`/`data-size`
 * et conserve intégralement ses rôles et attributs ARIA (§8 du brief).
 */
const B2_CASES: Array<{ name: string; element: ReactElement; hook: string }> = [
    { name: 'Card', element: <Card>Contenu</Card>, hook: 'data-padding' },
    {
        name: 'Card interactive',
        element: <Card interactive>Contenu</Card>,
        hook: 'data-interactive',
    },
    { name: 'Container', element: <Container>Contenu</Container>, hook: 'data-size' },
    { name: 'Grid', element: <Grid>Contenu</Grid>, hook: 'data-columns' },
    { name: 'Stack', element: <Stack>Contenu</Stack>, hook: 'data-gap' },
    { name: 'Skeleton', element: <Skeleton />, hook: 'data-size' },
    { name: 'Skeleton arrondi', element: <Skeleton rounded />, hook: 'data-rounded' },
    {
        name: 'Tabs',
        element: (
            <Tabs
                items={[
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                ]}
            />
        ),
        hook: 'data-tone',
    },
]

/**
 * Vague C2 (composants restants). Kbd expose désormais `data-size`, PreCode
 * `data-size`/`data-wrap`, Separator `data-orientation`, DataList `data-columns`,
 * Combobox `data-tone`/`data-size`, DatePicker `data-size`/`data-tone`, HoverCard
 * `data-side`/`data-align`, Carousel `data-orientation` et Resizable
 * `data-direction`/`data-dragging`.
 *
 * ScrollArea et FileTrigger sont volontairement ABSENTS : `mr-scroll-area--hide`
 * et `mr-file-trigger--default` sont des exceptions C2 légitimes, mais le
 * détecteur de ce test ne voit que les BEM de racine et les déclarerait en
 * régression. Le test garde sa convention actuelle ; il n'est pas élargi aux
 * BEM d'élément ni transformé en inventaire exhaustif.
 */
const C2_CASES: Array<{ name: string; element: ReactElement; hook: string }> = [
    // `size` / `columns` sont fournis explicitement : sans prop, le composant
    // n'émet volontairement aucune variante (comportement historique conservé).
    { name: 'Kbd', element: <Kbd size="md">F1</Kbd>, hook: 'data-size' },
    { name: 'PreCode', element: <PreCode>code</PreCode>, hook: 'data-size' },
    { name: 'Separator', element: <Separator />, hook: 'data-orientation' },
    {
        name: 'DataList',
        element: <DataList items={[]} columns="split" />,
        hook: 'data-columns',
    },
    { name: 'Combobox', element: <Combobox />, hook: 'data-tone' },
    { name: 'DatePicker', element: <DatePicker />, hook: 'data-size' },
    {
        name: 'HoverCard',
        element: <HoverCard content="contenu">survol</HoverCard>,
        hook: 'data-side',
    },
    {
        name: 'Carousel',
        element: <Carousel slides={[<div key="0">A</div>]} />,
        hook: 'data-orientation',
    },
    {
        name: 'Resizable',
        element: (
            <ResizablePanelGroup>
                <ResizablePanel>Panneau</ResizablePanel>
                <ResizableHandle />
            </ResizablePanelGroup>
        ),
        hook: 'data-direction',
    },
]

describe('modifiers BEM → data-* (vague A1)', () => {
    for (const { name, element, hook } of [
        ...CASES,
        ...B1_CASES,
        ...C1_CASES,
        ...B2_CASES,
        ...C2_CASES,
    ]) {
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
