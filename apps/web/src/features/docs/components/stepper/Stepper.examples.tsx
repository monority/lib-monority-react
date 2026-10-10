import { useState } from 'react'
import { Stepper } from '@monority/ui/stepper'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'

const checkoutSteps = [
    { title: 'Panier', description: 'Articles et remises' },
    { title: 'Livraison', description: 'Adresse et relais' },
    { title: 'Paiement', description: 'Carte bancaire ou virement' },
    { title: 'Confirmation', description: 'Recu et suivi commande' },
]

export function StepperBasicExample() {
    const [step, setStep] = useState(1)

    return (
        <Stack gap="lg">
            <Stepper steps={checkoutSteps} activeStep={step} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    size="sm"
                    variant="secondary"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                    Precedent
                </Button>
                <Button
                    size="sm"
                    variant="primary"
                    disabled={step === checkoutSteps.length - 1}
                    onClick={() => setStep((s) => Math.min(checkoutSteps.length - 1, s + 1))}
                >
                    Suivant
                </Button>
            </div>
        </Stack>
    )
}

export function StepperVerticalExample() {
    return (
        <Card padding="md">
            <Stepper
                orientation="vertical"
                activeStep={1}
                steps={[
                    { title: 'Creation du compte', description: 'Email verifie avec succes' },
                    { title: 'Configuration du profil', description: 'En cours de saisie' },
                    { title: 'Invitation de l equipe', description: 'Etape a venir' },
                ]}
            />
        </Card>
    )
}

export function StepperCompoundExample() {
    return (
        <Stepper activeStep={1}>
            <Stepper.Step title="Cahier des charges" description="Approuve" />
            <Stepper.Step title="Developpement" description="En cours de revue" />
            <Stepper.Step title="Deploiement CDN" description="En attente" />
        </Stepper>
    )
}
