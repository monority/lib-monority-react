import type { DocI18n } from '../doc-messages'

export const stepperI18n: DocI18n = {
    fr: {
        description:
            'Indicateur visuel d’avancement pas à pas guidant l’utilisateur à travers un flux séquentiel multi-étapes.',
        playgroundLabels: {
            orientation: 'Orientation',
            activeStep: 'Étape active',
        },
        examples: [
            { title: 'Disposition verticale' },
            { title: 'Composition déclarative (Stepper.Step)' },
        ],
        propDescriptions: {
            children:
                'Sous-composants composés : Stepper.Step, Stepper.Title, Stepper.Description.',
            steps: 'Tableau des étapes avec title, description, status.',
            activeStep: 'Index base 0 de l’étape actuellement active.',
            orientation: 'Orientation d’alignement du stepper.',
        },
        a11y: [
            'La racine utilise role="list" sur l’élément de liste ordonnée <ol>.',
            'L’étape active porte l’attribut aria-current="step".',
            'Les indicateurs et connecteurs portent aria-hidden="true".',
            'Le contraste satisfait les exigences WCAG AA sur l’ensemble des indicateurs de statut.',
        ],
    },
}
