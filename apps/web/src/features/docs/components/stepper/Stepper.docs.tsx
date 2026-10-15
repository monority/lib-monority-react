import { DocPage, type DocPageData } from '../DocPage'
import {
    StepperBasicExample,
    StepperVerticalExample,
    StepperCompoundExample,
} from './Stepper.examples'

const docData: DocPageData = {
    title: 'Stepper',
    description:
        'Indicateur visuel d avancement pas a pas guidant l utilisateur a travers un flux sequentiel multi-etapes.',
    importCode: "import { Stepper } from '@monority/ui/stepper'",
    usageCode: `const [step, setStep] = useState(1)

const steps = [
  { title: 'Panier', description: 'Articles et remises' },
  { title: 'Livraison', description: 'Adresse et relais' },
  { title: 'Paiement', description: 'Carte bancaire ou virement' },
  { title: 'Confirmation', description: 'Recu et suivi commande' },
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
        Precedent
      </Button>
      <Button
        size="sm"
        variant="primary"
        disabled={step === steps.length - 1}
        onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
      >
        Suivant
      </Button>
    </Stack>
  </Stack>
)`,
    preview: () => <StepperBasicExample />,
    examples: [
        {
            title: 'Disposition verticale',
            content: <StepperVerticalExample />,
            code: `<Card padding="md">
  <Stepper
    orientation="vertical"
    activeStep={1}
    steps={[
      { title: 'Creation du compte', description: 'Email verifie avec succes' },
      { title: 'Configuration du profil', description: 'En cours de saisie' },
      { title: 'Invitation de l equipe', description: 'Etape a venir' },
    ]}
  />
</Card>`,
        },
        {
            title: 'Composition declarative (Stepper.Step)',
            content: <StepperCompoundExample />,
            code: `<Stepper activeStep={1}>
  <Stepper.Step>
    <Stepper.Title>Cahier des charges</Stepper.Title>
    <Stepper.Description>Approuve</Stepper.Description>
  </Stepper.Step>
  <Stepper.Step>
    <Stepper.Title>Developpement</Stepper.Title>
    <Stepper.Description>En cours de revue</Stepper.Description>
  </Stepper.Step>
  <Stepper.Step>
    <Stepper.Title>Deploiement CDN</Stepper.Title>
    <Stepper.Description>En attente</Stepper.Description>
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
            description: 'Tableau des etapes avec title, description, status.',
        },
        {
            name: 'activeStep',
            type: 'number',
            defaultValue: '0',
            description: 'Index base 0 de l etape actuellement active.',
        },
        {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Orientation d alignement du stepper.',
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
}

export function StepperDocs() {
    return <DocPage doc={docData} />
}
