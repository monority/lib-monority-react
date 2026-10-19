import { act } from 'react'
import type { ReactElement } from 'react'
import { type Root, createRoot } from 'react-dom/client'
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

    it('supports Stepper.Title and Stepper.Description subcomponents', () => {
        const view = render(
            <Stepper activeStep={1}>
                <Stepper.Step>
                    <Stepper.Title>Panier</Stepper.Title>
                    <Stepper.Description>Articles valides</Stepper.Description>
                </Stepper.Step>
                <Stepper.Step>
                    <Stepper.Title>Paiement</Stepper.Title>
                    <Stepper.Description>Carte bancaire</Stepper.Description>
                </Stepper.Step>
            </Stepper>
        )

        const title = view.querySelector('.mr-stepper__title')
        const desc = view.querySelector('.mr-stepper__description')
        expect(title?.textContent).toBe('Panier')
        expect(desc?.textContent).toBe('Articles valides')
    })
})
