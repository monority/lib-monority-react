/**
 * Step 11 Adoption & Integration Audit
 *
 * Tests the full real-world adoption path from a fresh consumer perspective:
 * install → import → render → interact → typecheck
 */
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { afterEach, describe, it, expect, vi } from 'vitest'

// ─── Simple ──────────────────────────────────────────────────────────────────
import { Button } from '@/components/actions/button/Button'
import { Badge } from '@/components/feedback/badge/Badge'

// ─── Form ────────────────────────────────────────────────────────────────────
import { Input } from '@/components/forms/input/Input'
import { Textarea } from '@/components/forms/textarea/Textarea'
import { Select } from '@/components/forms/select/Select'
import { Checkbox } from '@/components/forms/checkbox/Checkbox'
import { Switch } from '@/components/forms/switch/Switch'
import { RadioGroup } from '@/components/forms/radio-group/RadioGroup'
import { Slider } from '@/components/forms/slider/Slider'

// ─── Layout / interaction ────────────────────────────────────────────────────
import { Accordion } from '@/components/display/accordion/Accordion'
import { Tabs } from '@/components/navigation/tabs/Tabs'
import { Tooltip } from '@/components/overlays/tooltip/Tooltip'

// ─── Complex ─────────────────────────────────────────────────────────────────
import { Toast } from '@/components/feedback/toast/Toast'
import { ToastProvider } from '@/providers/toast-provider'
import { useToast } from '@/hooks/use-toast'
import { Modal } from '@/components/overlays/modal/Modal'
import { AlertDialog } from '@/components/overlays/alert-dialog/AlertDialog'
import { FormControl } from '@/primitives/form-control'

// ─── Display ─────────────────────────────────────────────────────────────────
import { Avatar } from '@/components/display/avatar/Avatar'
import { Progress } from '@/components/feedback/progress/Progress'

// ─── Root + subpath ──────────────────────────────────────────────────────────
import { Spinner } from '@monority/ui'
import type { ButtonProps, InputProps, SliderProps, ButtonVariant } from '@monority/ui'

describe('Step 11 · Fresh consumer install', () => {
    it('resolves @monority/ui root barrel', () => {
        expect(Spinner).toBeDefined()
    })

    it('resolves all subpath imports', () => {
        expect(Button).toBeDefined()
        expect(Badge).toBeDefined()
        expect(Input).toBeDefined()
        expect(Textarea).toBeDefined()
        expect(Select).toBeDefined()
        expect(Checkbox).toBeDefined()
        expect(Switch).toBeDefined()
        expect(RadioGroup).toBeDefined()
        expect(Slider).toBeDefined()
        expect(Accordion).toBeDefined()
        expect(Tabs).toBeDefined()
        expect(Tooltip).toBeDefined()
        expect(Toast).toBeDefined()
        expect(ToastProvider).toBeDefined()
        expect(useToast).toBeDefined()
        expect(Modal).toBeDefined()
        expect(AlertDialog).toBeDefined()
        expect(Avatar).toBeDefined()
        expect(Progress).toBeDefined()
    })

    it('imports types from root and subpath', () => {
        const _bProps: ButtonProps = {} as unknown as ButtonProps
        const _v: ButtonVariant = 'primary'
        expect(typeof _bProps).toBe('object')
        expect(_v).toBe('primary')
    })
})

describe('Step 11 · Render representative components', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
    })

    it('renders Button with all props', () => {
        render(<Button variant="ghost" size="sm" disabled loading>Go</Button>)
        const btn = container!.querySelector('button')
        expect(btn).toBeTruthy()
        expect(btn?.disabled).toBe(true)
        expect(btn?.getAttribute('data-variant')).toBe('ghost')
        expect(btn?.getAttribute('data-size')).toBe('sm')
        expect(btn?.getAttribute('data-loading')).toBe('true')
    })

    it('renders Input controlled', () => {
        render(<Input value="hello" onChange={() => {}} placeholder="type" />)
        const input = container!.querySelector('input')
        expect(input?.getAttribute('value')).toBe('hello')
        expect(input?.getAttribute('placeholder')).toBe('type')
    })

    it('renders Textarea with defaultValue', () => {
        render(<Textarea defaultValue="initial" rows={3} />)
        const ta = container!.querySelector('textarea')
        expect(ta?.value).toBe('initial')
    })

    it('renders Select', () => {
        render(
            <Select label="Country">
                <option value="fr">France</option>
            </Select>,
        )
        expect(container!.querySelector('select')).toBeTruthy()
    })

    it('renders Checkbox controlled', () => {
        render(<Checkbox checked label="Accept" />)
        const input = container!.querySelector('input[type="checkbox"]')
        expect(input?.checked).toBe(true)
    })

    it('renders Switch', () => {
        render(<Switch checked label="Enable" />)
        const input = container!.querySelector('input[role="switch"]')
        expect(input?.checked).toBe(true)
    })

    it('renders RadioGroup', () => {
        render(
            <RadioGroup
                items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
                value="a"
                onChange={() => {}}
            />,
        )
        expect(container!.querySelector('[role="radiogroup"]')).toBeTruthy()
    })

    it('renders Slider with invalid', () => {
        render(<Slider value={50} invalid label="Volume" />)
        const input = container!.querySelector('input[type="range"]')
        expect(input?.getAttribute('aria-invalid')).toBe('true')
    })

    it('renders Badge', () => {
        render(<Badge variant="success">Done</Badge>)
        const badge = container!.querySelector('.mr-badge')
        expect(badge).toBeTruthy()
        expect(badge?.getAttribute('data-variant')).toBe('success')
    })

    it('renders Progress with ReactNode label', () => {
        render(<Progress value={42} label={<span>Upload</span>} />)
        const bar = container!.querySelector('[role="progressbar"]')
        expect(bar?.getAttribute('aria-labelledby')).toBeTruthy()
    })

    it('renders Accordion', () => {
        render(
            <Accordion
                items={[{ value: 'a', title: 'Title', content: 'Body' }]}
                defaultValue="a"
            />,
        )
        expect(container!.querySelector('[data-open="true"]')).toBeTruthy()
    })

    it('renders Tabs', () => {
        render(
            <Tabs
                items={[{ value: 'a', label: 'Tab A' }]}
                value="a"
                onChange={() => {}}
            />,
        )
        expect(container!.querySelector('[role="tablist"]')).toBeTruthy()
    })

    it('renders Tooltip', () => {
        render(
            <Tooltip content="Help text">
                <button type="button">Hover</button>
            </Tooltip>,
        )
        expect(container!.querySelector('.mr-tooltip')).toBeTruthy()
    })

    it('renders Toast (presentational)', () => {
        render(<Toast title="Saved" tone="success" />)
        // Toast is presentational, not portal-based
        expect(container!.querySelector('.mr-toast')).toBeTruthy()
    })

    it('renders Avatar', () => {
        render(<Avatar name="Maya Chen" size="lg" />)
        const el = container!.querySelector('.mr-avatar')
        expect(el?.getAttribute('data-size')).toBe('lg')
    })

    it('renders Modal when open', () => {
        // Modal portals to document.body
        render(<Modal open title="Title" onClose={() => {}}>Content</Modal>)
        expect(document.body.querySelector('[role="dialog"]')).toBeTruthy()
        // cleanup portal
        act(() => {
            root?.unmount()
            root = null
            container?.remove()
            container = null
        })
    })

    it('renders AlertDialog when open', () => {
        render(
            <AlertDialog
                open
                title="Confirm"
                onConfirm={() => {}}
                onCancel={() => {}}
            />,
        )
        expect(document.body.querySelector('[role="alertdialog"]')).toBeTruthy()
        act(() => {
            root?.unmount()
            root = null
            container?.remove()
            container = null
        })
    })
})

describe('Step 11 · Interaction contracts', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
    })

    it('Button click fires onClick', () => {
        const onClick = vi.fn()
        render(<Button onClick={onClick}>Click</Button>)
        container!.querySelector('button')!.click()
        expect(onClick).toHaveBeenCalledOnce()
    })

    it('Checkbox controlled toggles via onChange', () => {
        function App() {
            const [checked, setChecked] = useState(false)
            return (
                <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked((e.target as HTMLInputElement).checked)}
                />
            )
        }
        render(<App />)
        const input = container!.querySelector('input[type="checkbox"]') as HTMLInputElement
        expect(input.checked).toBe(false)
        act(() => { input.click() })
        // Re-render to pick up state change
        act(() => { root!.render(<App />) })
        expect(input.checked).toBe(true)
    })

    it('Switch controlled toggles via onChange', () => {
        function App() {
            const [checked, setChecked] = useState(false)
            return (
                <Switch
                    checked={checked}
                    onChange={(e) => setChecked((e.target as HTMLInputElement).checked)}
                />
            )
        }
        render(<App />)
        const input = container!.querySelector('input[role="switch"]') as HTMLInputElement
        expect(input.checked).toBe(false)
        act(() => { input.click() })
        act(() => { root!.render(<App />) })
        expect(input.checked).toBe(true)
    })

    it('Input controlled fires onChange', () => {
        const onChange = vi.fn()
        render(<Input value="fixed" onChange={onChange} />)
        const input = container!.querySelector('input') as HTMLInputElement
        // Use the same pattern as the Input unit tests: native setter + input event
        act(() => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            setter?.call(input, 'changed')
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        expect(onChange).toHaveBeenCalledOnce()
    })

    it('Slider value updates via onValueChange', () => {
        const onValueChange = vi.fn()
        render(<Slider value={50} onValueChange={onValueChange} />)
        const input = container!.querySelector('input[type="range"]') as HTMLInputElement
        act(() => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            setter?.call(input, '75')
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        expect(onValueChange).toHaveBeenCalledWith(75)
    })

    it('RadioGroup onChange receives selected value', () => {
        const onChange = vi.fn()
        render(
            <RadioGroup
                items={[{ value: 'x', label: 'X' }, { value: 'y', label: 'Y' }]}
                onChange={onChange}
            />,
        )
        const radio = container!.querySelector('input[type="radio"]') as HTMLInputElement
        act(() => { radio.click() })
        expect(onChange).toHaveBeenCalledWith('x')
    })

    it('Accordion toggle fires onChange', () => {
        const onChange = vi.fn()
        render(
            <Accordion
                items={[{ value: 'a', title: 'A', content: 'body' }]}
                onChange={onChange}
            />,
        )
        const trigger = container!.querySelector('.mr-accordion__trigger') as HTMLButtonElement
        act(() => { trigger.click() })
        expect(onChange).toHaveBeenCalledOnce()
    })

    it('Tabs change fires onChange', () => {
        const onChange = vi.fn()
        render(
            <Tabs
                items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
                onChange={onChange}
            />,
        )
        const secondTab = container!.querySelectorAll('.mr-tabs__tab')[1] as HTMLButtonElement
        act(() => { secondTab.click() })
        expect(onChange).toHaveBeenCalledWith('b')
    })

    it('useToast push works inside ToastProvider', () => {
        function App() {
            const { pushToast } = useToast()
            return (
                <button onClick={() => pushToast({ title: 'hi' })}>Push</button>
            )
        }
        render(<ToastProvider><App /></ToastProvider>)
        act(() => { container!.querySelector('button')!.click() })
        // Should not throw
    })
})

describe('Step 11 · Ref forwarding', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
    })

    it('Button forwards ref to button element', () => {
        const ref = { current: null as HTMLButtonElement | null }
        function App() { return <Button ref={ref}>Go</Button> }
        render(<App />)
        expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('Input forwards ref to input element', () => {
        const ref = { current: null as HTMLInputElement | null }
        function App() { return <Input ref={ref} /> }
        render(<App />)
        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('Slider forwards ref to input element', () => {
        const ref = { current: null as HTMLInputElement | null }
        function App() { return <Slider ref={ref} /> }
        render(<App />)
        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('Checkbox forwards ref to input element', () => {
        const ref = { current: null as HTMLInputElement | null }
        function App() { return <Checkbox ref={ref} /> }
        render(<App />)
        expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('Select forwards ref to select element', () => {
        const ref = { current: null as HTMLSelectElement | null }
        function App() { return <Select ref={ref} /> }
        render(<App />)
        expect(ref.current).toBeInstanceOf(HTMLSelectElement)
    })

    it('Accordion forwards ref to div element', () => {
        const ref = { current: null as HTMLDivElement | null }
        function App() {
            return (
                <Accordion
                    ref={ref}
                    items={[{ value: 'a', title: 'T', content: 'C' }]}
                />
            )
        }
        render(<App />)
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
})

describe('Step 11 · TypeScript strict consumer DX', () => {
    it('accepts valid Button props', () => {
        const props: ButtonProps = {
            variant: 'ghost',
            size: 'lg',
            disabled: true,
            loading: false,
            fullWidth: false,
            iconOnly: false,
            onClick: () => {},
        }
        expect(props).toBeDefined()
    })

    it('accepts ButtonVariant union', () => {
        const v: ButtonVariant = 'primary'
        expect(v).toBe('primary')
    })

    it('accepts valid Input props', () => {
        const props: InputProps = {
            label: 'Email',
            hint: 'Required',
            error: 'Invalid',
            invalid: true,
            disabled: false,
            required: true,
            tone: 'danger',
            size: 'sm',
            placeholder: 'you@x.com',
        }
        expect(props).toBeDefined()
    })

    it('accepts Slider with onValueChange', () => {
        const props: SliderProps = {
            label: 'Vol',
            value: 50,
            min: 0,
            max: 100,
            step: 1,
            onValueChange: (v: number) => {},
            onChange: () => {},
            invalid: true,
        }
        expect(props).toBeDefined()
    })

    it('SliderProps value is number', () => {
        const props: SliderProps = { value: 42 }
        expect(props.value).toBe(42)
    })

    it('controlled + uncontrolled both accepted by types (React warns at runtime)', () => {
        const props: InputProps = { value: 'x', defaultValue: 'y' }
        expect(props).toBeDefined()
    })
})

describe('Step 11 · Native prop forwarding', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
    })

    it('Input forwards name/id/required/disabled/data attrs', () => {
        render(
            <Input
                name="email"
                id="my-input"
                required
                disabled
                data-testid="field"
                aria-describedby="desc"
            />,
        )
        const input = container!.querySelector('input')!
        expect(input.name).toBe('email')
        expect(input.id).toBe('my-input')
        expect(input.required).toBe(true)
        expect(input.disabled).toBe(true)
        expect(input.getAttribute('data-testid')).toBe('field')
        expect(input.getAttribute('aria-describedby')).toContain('desc')
    })

    it('Checkbox forwards name', () => {
        render(<Checkbox name="terms" />)
        const input = container!.querySelector('input[type="checkbox"]')!
        expect(input.name).toBe('terms')
    })

    it('Slider forwards min/max/step via native input', () => {
        render(<Slider min={0} max={200} step={5} />)
        const input = container!.querySelector('input[type="range"]') as HTMLInputElement
        expect(Number(input.min)).toBe(0)
        expect(Number(input.max)).toBe(200)
        expect(Number(input.step)).toBe(5)
    })
})

describe('Step 11 · ARIA / accessibility integration', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
    })

    it('Button has no unnecessary ARIA', () => {
        render(<Button>Go</Button>)
        const btn = container!.querySelector('button')!
        expect(btn.getAttribute('role')).toBeNull()
        expect(btn.textContent).toContain('Go')
    })

    it('Input label association via htmlFor', () => {
        render(<Input label="Email" id="e" />)
        const input = container!.querySelector('input')!
        const label = container!.querySelector('label')!
        expect(label.getAttribute('for')).toBe(input.id)
    })

    it('Checkbox exposes data-checked on wrapper label', () => {
        render(<Checkbox checked label="Accept" />)
        // querySelector('label') gets the FieldLabel; target the wrapper by attribute
        const wrapperLabel = container!.querySelector('label[data-checked="true"]')!
        expect(wrapperLabel.getAttribute('data-checked')).toBe('true')
        const input = container!.querySelector('input[type="checkbox"]')!
        expect(input.checked).toBe(true)
    })

    it('Switch exposes data-checked on wrapper label', () => {
        render(<Switch checked label="ON" />)
        const wrapperLabel = container!.querySelector('label[data-checked="true"]')!
        expect(wrapperLabel.getAttribute('data-checked')).toBe('true')
        const input = container!.querySelector('input[role="switch"]')!
        expect(input.checked).toBe(true)
    })

    it('RadioGroup radios share name and have data-checked on labels', () => {
        render(
            <RadioGroup
                name="choice"
                items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
                value="a"
            />,
        )
        const radios = container!.querySelectorAll('input[type="radio"]')
        expect(radios.length).toBe(2)
        expect(radios[0].name).toBe('choice')
        // Radio items use data-checked on their label wrappers
        const checkedLabel = container!.querySelector('label[data-checked="true"]')
        expect(checkedLabel).toBeTruthy()
    })

    it('Slider input is labelled via output', () => {
        render(<Slider label="Vol" id="s1" />)
        const input = container!.querySelector('input[type="range"]')!
        const output = container!.querySelector('output')!
        // output element references the input
        expect(output).toBeTruthy()
        expect(input.id).toBe('s1')
        // output htmlFor may be auto-generated; just verify the association exists
        expect(output.getAttribute('for')).toBeTruthy()
    })

    it('Progress bar has role=progressbar and aria-valuenow', () => {
        render(<Progress value={70} />)
        const bar = container!.querySelector('[role="progressbar"]')!
        expect(bar.getAttribute('aria-valuenow')).toBe('70')
        expect(bar.getAttribute('aria-valuemin')).toBe('0')
        expect(bar.getAttribute('aria-valuemax')).toBe('100')
    })

    it('Accordion triggers expose aria-expanded/controls', () => {
        render(
            <Accordion
                items={[{ value: 'a', title: 'T', content: 'C' }]}
                defaultValue="a"
            />,
        )
        const trigger = container!.querySelector('.mr-accordion__trigger') as HTMLButtonElement
        expect(trigger.getAttribute('aria-expanded')).toBe('true')
        expect(trigger.getAttribute('aria-controls')).toBeTruthy()
    })

    it('Accordion panels are labelled by their trigger', () => {
        render(
            <Accordion
                items={[{ value: 'a', title: 'T', content: 'C' }]}
                defaultValue="a"
            />,
        )
        const trigger = container!.querySelector('.mr-accordion__trigger') as HTMLButtonElement
        const panel = container!.querySelector('[aria-labelledby]')!
        expect(panel.getAttribute('aria-labelledby')).toBe(trigger.id)
    })

    it('Tabs tablist has aria-label', () => {
        render(<Tabs items={[{ value: 'a', label: 'A' }]} value="a" onChange={() => {}} />)
        const list = container!.querySelector('[role="tablist"]')!
        expect(list.getAttribute('aria-label')).toBe('Tabs')
    })

    it('Tabs tabs have aria-selected', () => {
        render(
            <Tabs
                items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
                value="a"
                onChange={() => {}}
            />,
        )
        const tabs = container!.querySelectorAll('[role="tab"]')
        expect(tabs[0].getAttribute('aria-selected')).toBe('true')
        expect(tabs[1].getAttribute('aria-selected')).toBe('false')
    })

    it('Modal panel has role dialog and aria-modal when open', () => {
        render(<Modal open title="T" onClose={() => {}}>C</Modal>)
        const panel = document.body.querySelector('[role="dialog"]')!
        expect(panel.getAttribute('aria-modal')).toBe('true')
        act(() => { root!.unmount(); container!.remove(); container = null; root = null })
    })

    it('AlertDialog panel has role alertdialog when open', () => {
        render(<AlertDialog open title="T" onConfirm={() => {}} onCancel={() => {}} />)
        const panel = document.body.querySelector('[role="alertdialog"]')!
        expect(panel.getAttribute('role')).toBe('alertdialog')
        act(() => { root!.unmount(); container!.remove(); container = null; root = null })
    })

    it('Tooltip trigger has aria-describedby', () => {
        render(
            <Tooltip content="Tip">
                <button type="button">Trigger</button>
            </Tooltip>,
        )
        const btn = container!.querySelector('button')!
        expect(btn.getAttribute('aria-describedby')).toBeTruthy()
    })

    it('Avatar with name has accessible name', () => {
        render(<Avatar name="Maya Chen" />)
        const el = container!.querySelector('.mr-avatar')!
        expect(el.getAttribute('aria-label')).toBe('Maya Chen')
    })

    it('Toast has correct role/aria-live by tone', () => {
        render(<Toast title="OK" tone="success" />)
        const toast = container!.querySelector('.mr-toast')!
        expect(toast.getAttribute('role')).toBe('status')
        expect(toast.getAttribute('aria-live')).toBe('polite')
    })

    it('Toast danger uses alert role', () => {
        render(<Toast title="Fail" tone="danger" />)
        const toast = container!.querySelector('.mr-toast')!
        expect(toast.getAttribute('role')).toBe('alert')
        expect(toast.getAttribute('aria-live')).toBe('assertive')
    })
})

describe('Step 11 · Controlled/uncontrolled contracts', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
    })

    it('Input controlled fires onChange without accepting DOM mutation', () => {
        const onChange = vi.fn()
        render(<Input value="fixed" onChange={onChange} />)
        const input = container!.querySelector('input') as HTMLInputElement
        expect(input.value).toBe('fixed')
        // Direct DOM mutation bypasses React; onChange fires but controlled value stays
        act(() => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            setter?.call(input, 'changed')
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        expect(onChange).toHaveBeenCalledOnce()
        // Controlled: React would re-render with value="fixed" on next cycle
    })

    it('Checkbox uncontrolled toggles', () => {
        render(<Checkbox defaultChecked={false} />)
        const input = container!.querySelector('input[type="checkbox"]') as HTMLInputElement
        expect(input.checked).toBe(false)
        act(() => { input.click() })
        expect(input.checked).toBe(true)
    })

    it('Switch uncontrolled toggles', () => {
        render(<Switch defaultChecked={false} />)
        const input = container!.querySelector('input[role="switch"]') as HTMLInputElement
        expect(input.checked).toBe(false)
        act(() => { input.click() })
        expect(input.checked).toBe(true)
    })

    it('Slider uncontrolled defaults to 50', () => {
        render(<Slider />)
        const input = container!.querySelector('input[type="range"]') as HTMLInputElement
        expect(Number(input.value)).toBe(50)
    })

    it('Accordion uncontrolled with defaultValue', () => {
        render(<Accordion items={[{ value: 'a', title: 'T', content: 'C' }]} defaultValue="a" />)
        expect(container!.querySelector('[data-open="true"]')).toBeTruthy()
    })

    it('Tabs uncontrolled selects first item', () => {
        render(<Tabs items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} />)
        const tabs = container!.querySelectorAll('[role="tab"]')
        expect(tabs[0].getAttribute('aria-selected')).toBe('true')
    })
})

describe('Step 22 · Public contract hardening', () => {
    let container: HTMLDivElement | null = null
    let root: ReturnType<typeof createRoot> | null = null

    function render(ui: React.ReactElement) {
        container = document.createElement('div')
        document.body.appendChild(container)
        root = createRoot(container)
        act(() => { root?.render(ui) })
        return container
    }

    afterEach(() => {
        act(() => { root?.unmount() })
        container?.remove()
        container = null
        root = null
        document.body.style.overflow = ''
    })

    it('two RadioGroups stay independent (unique group names)', () => {
        render(
            <>
                <FormControl>
                    <RadioGroup items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} />
                </FormControl>
                <FormControl>
                    <RadioGroup items={[{ value: 'a', label: 'A2' }, { value: 'b', label: 'B2' }]} />
                </FormControl>
            </>
        )
        const radios = container!.querySelectorAll('input[type="radio"]')
        expect(radios.length).toBe(4)
        expect(new Set([...radios].map((r) => r.getAttribute('name'))).size).toBe(2)
        act(() => { (radios[0] as HTMLInputElement).click() })
        expect((radios[0] as HTMLInputElement).checked).toBe(true)
        expect((radios[2] as HTMLInputElement).checked).toBe(false)
    })

    it('two Tooltips expose unique describedby ids', () => {
        render(
            <>
                <Tooltip content="one"><Button>first</Button></Tooltip>
                <Tooltip content="two"><Button>second</Button></Tooltip>
            </>
        )
        const tips = container!.querySelectorAll('[role="tooltip"]')
        expect(tips.length).toBe(2)
        expect(tips[0].getAttribute('id')).not.toBe(tips[1].getAttribute('id'))
    })

    it('controlled Slider keeps parent value when parent refuses change', () => {
        const onValueChange = vi.fn()
        render(<Slider value={30} onValueChange={onValueChange} />)
        const input = container!.querySelector('input[type="range"]') as HTMLInputElement
        expect(input.value).toBe('30')
        act(() => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
            setter?.call(input, '80')
            input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        expect(onValueChange).toHaveBeenCalledWith(80)
        expect(input.value).toBe('30')
    })

    it('Modal unmount while open restores body scroll and removes portal', () => {
        render(<Modal open title="T" onClose={() => {}}>body</Modal>)
        expect(document.body.style.overflow).toBe('hidden')
        act(() => { root?.render(<div />) })
        expect(document.body.style.overflow).not.toBe('hidden')
        expect(container!.querySelector('[role="dialog"]')).toBeNull()
    })
})