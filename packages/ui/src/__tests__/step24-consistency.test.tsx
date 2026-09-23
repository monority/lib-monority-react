import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'

import { Tabs } from '../components/navigation/tabs/Tabs'
import { CommandPalette } from '../components/overlays/command-palette/CommandPalette'

let container: HTMLDivElement | null = null
let root: Root | null = null

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
    document.body.style.overflow = ''
    root = null
    container = null
})

// ─────────────────────────────────────────────────────────────────────────────
// Step 24 — variant, state & visual hierarchy consistency contracts.
// No public API renames: these tests lock the additive coherence fixes.
// ─────────────────────────────────────────────────────────────────────────────

describe('Step 24 · Tabs vertical keyboard parity with Accordion', () => {
    const items = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2' },
        { value: 'tab3', label: 'Tab 3' },
    ]

    it('navigates down with ArrowDown like ArrowRight', () => {
        let selected = 'tab1'
        const view = render(
            <Tabs items={items} value="tab1" onChange={(v) => { selected = v }} />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[0].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })
            )
        })
        expect(selected).toBe('tab2')
    })

    it('navigates up with ArrowUp like ArrowLeft', () => {
        let selected = 'tab2'
        const view = render(
            <Tabs items={items} value="tab2" onChange={(v) => { selected = v }} />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[1].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true })
            )
        })
        expect(selected).toBe('tab1')
    })
})

describe('Step 24 · Tabs per-item disabled skips like Accordion', () => {
    const items = [
        { value: 'tab1', label: 'Tab 1' },
        { value: 'tab2', label: 'Tab 2', disabled: true },
        { value: 'tab3', label: 'Tab 3' },
    ]

    it('marks the disabled item without disabling the whole tablist', () => {
        const view = render(<Tabs items={items} value="tab1" onChange={() => {}} />)
        const tabs = view.querySelectorAll('[role="tab"]')
        expect((tabs[1] as HTMLButtonElement).disabled).toBe(true)
        expect(tabs[1].getAttribute('data-disabled')).toBe('true')
        expect(tabs[1].getAttribute('aria-disabled')).toBe('true')
        expect((tabs[0] as HTMLButtonElement).disabled).toBe(false)
        expect((tabs[2] as HTMLButtonElement).disabled).toBe(false)
        expect(view.querySelector('[role="tablist"]')?.getAttribute('data-disabled')).toBeNull()
    })

    it('skips the disabled item on ArrowRight', () => {
        let selected = 'tab1'
        const view = render(
            <Tabs items={items} value="tab1" onChange={(v) => { selected = v }} />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[0].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
            )
        })
        expect(selected).toBe('tab3')
    })

    it('Home lands on first enabled and End on last enabled', () => {
        const edgeItems = [
            { value: 'tab1', label: 'Tab 1', disabled: true },
            { value: 'tab2', label: 'Tab 2' },
            { value: 'tab3', label: 'Tab 3', disabled: true },
        ]
        let selected = 'tab2'
        const view = render(
            <Tabs items={edgeItems} value="tab2" onChange={(v) => { selected = v }} />
        )
        act(() => {
            view.querySelectorAll('[role="tab"]')[1].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
            )
        })
        expect(selected).toBe('tab2')
        act(() => {
            view.querySelectorAll('[role="tab"]')[1].dispatchEvent(
                new KeyboardEvent('keydown', { key: 'End', bubbles: true })
            )
        })
        expect(selected).toBe('tab2')
    })
})

describe('Step 24 · CommandPalette Home/End parity with menus', () => {
    const sampleItems = [
        { value: 'a', label: 'Alpha' },
        { value: 'b', label: 'Beta' },
        { value: 'c', label: 'Gamma' },
    ]

    it('jumps to last item with End', () => {
        render(<CommandPalette open items={sampleItems} />)
        const panel = document.body.querySelector('[role="dialog"]')
        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
        })
        const items = document.body.querySelectorAll('.mr-command__item')
        expect(items[2]?.getAttribute('aria-selected')).toBe('true')
    })

    it('jumps to first item with Home', () => {
        render(<CommandPalette open items={sampleItems} />)
        const panel = document.body.querySelector('[role="dialog"]')
        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
        })
        act(() => {
            panel?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
        })
        const items = document.body.querySelectorAll('.mr-command__item')
        expect(items[0]?.getAttribute('aria-selected')).toBe('true')
    })

    it('uses the corrected French default empty label', () => {
        render(<CommandPalette open items={[]} />)
        expect(document.body.querySelector('.mr-command__empty')?.textContent).toBe(
            'Aucun résultat.'
        )
    })
})

describe('Step 24 · public variants still exported (no breaking change)', () => {
    it('keeps every audited family importable', async () => {
        const [
            buttonMod,
            iconButtonMod,
            badgeMod,
            alertMod,
            bannerMod,
            calloutMod,
            toastMod,
            modalMod,
            alertDialogMod,
            tabsMod,
            accordionMod,
        ] = await Promise.all([
            import('../components/actions/button/Button'),
            import('../components/actions/icon-button/IconButton'),
            import('../components/feedback/badge/Badge'),
            import('../components/feedback/inline-alert/InlineAlert'),
            import('../components/feedback/banner/Banner'),
            import('../components/feedback/callout/Callout'),
            import('../components/feedback/toast/Toast'),
            import('../components/overlays/modal/Modal'),
            import('../components/overlays/alert-dialog/AlertDialog'),
            import('../components/navigation/tabs/Tabs'),
            import('../components/display/accordion/Accordion'),
        ])
        expect(buttonMod.Button).toBeTruthy()
        expect(iconButtonMod.IconButton).toBeTruthy()
        expect(badgeMod.Badge).toBeTruthy()
        expect(alertMod.InlineAlert).toBeTruthy()
        expect(bannerMod.Banner).toBeTruthy()
        expect(calloutMod.Callout).toBeTruthy()
        expect(toastMod.Toast).toBeTruthy()
        expect(modalMod.Modal).toBeTruthy()
        expect(alertDialogMod.AlertDialog).toBeTruthy()
        expect(tabsMod.Tabs).toBeTruthy()
        expect(accordionMod.Accordion).toBeTruthy()
    })
})
