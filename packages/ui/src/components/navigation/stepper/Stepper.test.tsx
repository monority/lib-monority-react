import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type { ReactElement } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import { Stepper } from './Stepper'

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
    root = null
    container = null
})

const sampleSteps = [
    { title: 'Panier', description: 'Verification des articles' },
    { title: 'Livraison', description: 'Choix du transporteur' },
    { title: 'Paiement', description: 'Validation securisee' },
]

describe('Stepper', () => {
    it('renders steps with automatic statuses based on activeStep', () => {
        const view = render(<Stepper steps={sampleSteps} activeStep={1} />)

        const list = view.querySelector('ol')
        expect(list !== null).toBe(true)

        const stepItems = view.querySelectorAll('li.mr-stepper__item')
        expect(stepItems.length).toBe(3)

        expect(stepItems[0].getAttribute('data-status')).toBe('completed')
        expect(stepItems[1].getAttribute('data-status')).toBe('active')
        expect(stepItems[1].getAttribute('aria-current')).toBe('step')
        expect(stepItems[2].getAttribute('data-status')).toBe('upcoming')
    })

    it('supports compound Stepper.Step API', () => {
        const view = render(
            <Stepper activeStep={0} orientation="vertical">
                <Stepper.Step title="Compte" description="Identifiants" />
                <Stepper.Step title="Profil" description="Informations personnelles" />
            </Stepper>
        )

        const list = view.querySelector('ol')
        expect(list?.getAttribute('data-orientation')).toBe('vertical')

        expect(view.textContent?.includes('Compte')).toBe(true)
        expect(view.textContent?.includes('Profil')).toBe(true)
    })
})
