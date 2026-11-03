import { Button } from '@monority/ui/button'
import { Stepper } from '@monority/ui/stepper'
import { useState } from 'react'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { StepperCompoundExample, StepperVerticalExample } from './Stepper.examples'
import { stepperI18n } from './Stepper.messages'

function StepperPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'
    const [activeStep, setActiveStep] = useState(1)
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')

    const steps = isFr
        ? [
              { title: 'Panier', description: 'Articles et remises' },
              { title: 'Livraison', description: 'Adresse et point relais' },
              { title: 'Paiement', description: 'Sélection du mode' },
              { title: 'Confirmation', description: 'Reçu et suivi' },
          ]
        : [
              { title: 'Cart', description: 'Items and discounts' },
              { title: 'Shipping', description: 'Address and delivery' },
              { title: 'Payment', description: 'Payment method' },
              { title: 'Confirmation', description: 'Receipt and tracking' },
          ]

    const snippet = `<Stepper
  activeStep={${activeStep}}
  orientation="${orientation}"
  steps={[
${steps.map((s) => `    { title: '${s.title}', description: '${s.description}' }`).join(',\n')}
  ]}
/>`

    return (
        <ComponentPlayground
            controls={[
                {
                    type: 'select',
                    label: isFr ? 'Orientation' : 'Orientation',
                    value: orientation,
                    options: [
                        { value: 'horizontal', label: isFr ? 'Horizontal' : 'Horizontal' },
                        { value: 'vertical', label: isFr ? 'Vertical' : 'Vertical' },
                    ],
                    onChange: (v) => setOrientation(v as 'horizontal' | 'vertical'),
                },
                {
                    type: 'select',
                    label: isFr ? 'Étape active' : 'Active step',
                    value: String(activeStep),
                    options: [
                        {
                            value: '0',
                            label: isFr ? 'Étape 1 : Panier' : 'Step 1: Cart',
                        },
                        {
                            value: '1',
                            label: isFr ? 'Étape 2 : Livraison' : 'Step 2: Shipping',
                        },
                        {
                            value: '2',
                            label: isFr ? 'Étape 3 : Paiement' : 'Step 3: Payment',
                        },
                        {
                            value: '3',
                            label: isFr ? 'Étape 4 : Confirmation' : 'Step 4: Confirmation',
                        },
                    ],
                    onChange: (v) => setActiveStep(Number(v)),
                },
            ]}
            codeSnippet={snippet}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,
                    width: '100%',
                    maxWidth: orientation === 'vertical' ? 360 : '100%',
                    margin: '0 auto',
                }}
            >
                <Stepper activeStep={activeStep} orientation={orientation} steps={steps} />
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <Button
                        size="sm"
                        variant="secondary"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                    >
                        {isFr ? 'Précédent' : 'Previous'}
                    </Button>
                    <Button
                        size="sm"
                        variant="primary"
                        disabled={activeStep === steps.length - 1}
                        onClick={() => setActiveStep((s) => Math.min(steps.length - 1, s + 1))}
                    >
                        {isFr ? 'Suivant' : 'Next'}
                    </Button>
                </div>
            </div>
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'Stepper',
    description:
        'Visual step-by-step progress indicator guiding users through a sequential multi-step workflow.',
    importCode: "import { Stepper } from '@monority/ui/stepper'",
    usageCode: `const [step, setStep] = useState(1)

const steps = [
  { title: 'Cart', description: 'Items and discounts' },
  { title: 'Shipping', description: 'Address and delivery' },
  { title: 'Payment', description: 'Credit card or transfer' },
  { title: 'Confirmation', description: 'Receipt and order tracking' },
]

return (
  <Stack gap="lg">
    <Stepper steps={steps} activeStep={step} />
    <Stack direction="horizontal" gap="sm">
      <Button
        size="sm"
        variant="secondary"
        disabled={step === 0}
        onClick={() => setStep((s) => Math.max(0, s - 1))}
      >
        Previous
      </Button>
      <Button
        size="sm"
        variant="primary"
        disabled={step === steps.length - 1}
        onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
      >
        Next
      </Button>
    </Stack>
  </Stack>
)`,
    preview: () => <StepperPlayground />,
    examples: [
        {
            title: 'Vertical layout',
            content: <StepperVerticalExample />,
            code: `<Card padding="md">
  <Stepper
    orientation="vertical"
    activeStep={1}
    steps={[
      { title: 'Account creation', description: 'Email verified successfully' },
      { title: 'Profile setup', description: 'In progress' },
      { title: 'Team invitation', description: 'Upcoming step' },
    ]}
  />
</Card>`,
        },
        {
            title: 'Declarative compound composition (Stepper.Step)',
            content: <StepperCompoundExample />,
            code: `<Stepper activeStep={1}>
  <Stepper.Step>
    <Stepper.Title>Specifications</Stepper.Title>
    <Stepper.Description>Approved</Stepper.Description>
  </Stepper.Step>
  <Stepper.Step>
    <Stepper.Title>Development</Stepper.Title>
    <Stepper.Description>In review</Stepper.Description>
  </Stepper.Step>
  <Stepper.Step>
    <Stepper.Title>CDN deployment</Stepper.Title>
    <Stepper.Description>Pending</Stepper.Description>
  </Stepper.Step>
</Stepper>`,
        },
    ],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Compound subcomponents: Stepper.Step, Stepper.Title, Stepper.Description',
        },
        {
            name: 'steps',
            type: 'StepItemData[]',
            defaultValue: '-',
            description: 'Array of step items with title, description, status.',
        },
        {
            name: 'activeStep',
            type: 'number',
            defaultValue: '0',
            description: 'Zero-based index of the currently active step.',
        },
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Alignment direction of the stepper.',
        },
    ],
    cssHooks: [
        '.mr-stepper',
        '.mr-stepper__item',
        '.mr-stepper__indicator',
        '.mr-stepper__content',
        '.mr-stepper__title',
        '.mr-stepper__description',
        '.mr-stepper__connector',
        '[data-status="completed|active|upcoming"]',
        '[data-orientation="horizontal|vertical"]',
    ],
    tokens: [
        '--mr-accent-solid',
        '--mr-bg-sunken',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-secondary',
        '--mr-border-default',
        '--mr-size-control-sm',
        '--mr-size-control-md',
        '--mr-size-control-lg',
    ],
    a11y: [
        'Root uses role="list" on ordered list element ol.',
        'Active step marks aria-current="step".',
        'Indicators and connectors have aria-hidden="true".',
        'Contrast meets WCAG AA standards across all status indicators.',
    ],
    i18n: stepperI18n,
}

export function StepperDocs() {
    return <DocPage doc={docData} />
}
