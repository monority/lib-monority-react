import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'
import { Stepper } from '@monority/ui/stepper'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'

export function StepperBasicExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [step, setStep] = useState(1)

    const checkoutSteps = isFr
        ? [
              { title: 'Panier', description: 'Articles et remises' },
              { title: 'Livraison', description: 'Adresse et relais' },
              { title: 'Paiement', description: 'Carte bancaire ou virement' },
              { title: 'Confirmation', description: 'Reçu et suivi commande' },
          ]
        : [
              { title: 'Cart', description: 'Items and discounts' },
              { title: 'Shipping', description: 'Address and delivery' },
              { title: 'Payment', description: 'Credit card or transfer' },
              { title: 'Confirmation', description: 'Receipt and order tracking' },
          ]

    return (
        <Stack gap="lg">
            <Stepper steps={checkoutSteps} activeStep={step} />
            <Stack direction="horizontal" gap="sm">
                <Button
                    size="sm"
                    variant="secondary"
                    disabled={step === 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                    {isFr ? 'Précédent' : 'Previous'}
                </Button>
                <Button
                    size="sm"
                    variant="primary"
                    disabled={step === checkoutSteps.length - 1}
                    onClick={() => setStep((s) => Math.min(checkoutSteps.length - 1, s + 1))}
                >
                    {isFr ? 'Suivant' : 'Next'}
                </Button>
            </Stack>
        </Stack>
    )
}

export function StepperVerticalExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    const steps = isFr
        ? [
              { title: 'Création du compte', description: 'Email vérifié avec succès' },
              { title: 'Configuration du profil', description: 'En cours de saisie' },
              { title: 'Invitation de l’équipe', description: 'Étape à venir' },
          ]
        : [
              { title: 'Account creation', description: 'Email verified successfully' },
              { title: 'Profile setup', description: 'In progress' },
              { title: 'Team invitation', description: 'Upcoming step' },
          ]

    return (
        <Card padding="md">
            <Stepper orientation="vertical" activeStep={1} steps={steps} />
        </Card>
    )
}

export function StepperCompoundExample() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    return (
        <Stepper activeStep={1}>
            <Stepper.Step>
                <Stepper.Title>{isFr ? 'Cahier des charges' : 'Specifications'}</Stepper.Title>
                <Stepper.Description>{isFr ? 'Approuvé' : 'Approved'}</Stepper.Description>
            </Stepper.Step>
            <Stepper.Step>
                <Stepper.Title>{isFr ? 'Développement' : 'Development'}</Stepper.Title>
                <Stepper.Description>
                    {isFr ? 'En cours de revue' : 'In review'}
                </Stepper.Description>
            </Stepper.Step>
            <Stepper.Step>
                <Stepper.Title>{isFr ? 'Déploiement CDN' : 'CDN deployment'}</Stepper.Title>
                <Stepper.Description>{isFr ? 'En attente' : 'Pending'}</Stepper.Description>
            </Stepper.Step>
        </Stepper>
    )
}
