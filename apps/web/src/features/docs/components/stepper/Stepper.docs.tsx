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
    usageCode: `<Stepper
  activeStep={currentStep}
  steps={[
    { title: 'Panier', description: 'Articles et remises' },
    { title: 'Livraison', description: 'Adresse et relais' },
    { title: 'Paiement', description: 'Reglement securise' },
  ]}
/>`,
    preview: () => <StepperBasicExample />,
    examples: [
        { title: 'Disposition verticale', content: <StepperVerticalExample /> },
        { title: 'Composition declarative (Stepper.Step)', content: <StepperCompoundExample /> },
    ],
    props: [
        {
            name: 'steps',
            type: 'StepperStepItem[]',
            defaultValue: '-',
            description: 'Tableau des etapes avec title, description, icon.',
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
        {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Taille des pastilles et des libelles.',
        },
    ],
    cssHooks: [
        '.mr-stepper',
        '.mr-stepper__list',
        '.mr-stepper__step',
        '.mr-stepper__indicator',
        '.mr-stepper__index',
        '.mr-stepper__content',
        '.mr-stepper__title',
        '.mr-stepper__description',
        '.mr-stepper__separator',
        '[data-state="completed|current|upcoming"]',
        '[data-orientation="horizontal|vertical"]',
    ],
    tokens: [
        '--mr-color-primary-base',
        '--mr-bg-muted',
        '--mr-bg-surface',
        '--mr-text-primary',
        '--mr-text-muted',
        '--mr-border-default',
        '--mr-size-control-sm',
        '--mr-size-control-md',
        '--mr-size-control-lg',
    ],
    a11y: [
        'Structure ordonnee native via liste numerotee <ol role="list">.',
        'Etape active annoncee via aria-current="step".',
        'Icone de coche visuelle decorative masquable pour les lecteurs d ecran.',
    ],
}

export function StepperDocs() {
    return <DocPage doc={docData} />
}
