import { DocPage, type DocPageData } from '../DocPage'
import {
    InputOtpBasicExample,
    InputOtpCompoundExample,
    InputOtpDisabledExample,
} from './InputOtp.examples'

const docData: DocPageData = {
    title: 'InputOTP',
    description:
        'Champ de saisie segmente pour codes One-Time Password, verification double facteur (2FA) et codes PIN avec support transparent du collage.',
    importCode: "import { InputOTP } from '@monority/ui'",
    usageCode: `<InputOTP maxLength={6} value={code} onChange={setCode} onComplete={handleVerify} />`,
    preview: () => <InputOtpBasicExample />,
    examples: [
        { title: 'Composition manuelle avec separateur', content: <InputOtpCompoundExample /> },
        { title: 'Etat desactive', content: <InputOtpDisabledExample /> },
    ],
    props: [
        {
            name: 'value',
            type: 'string',
            defaultValue: '-',
            description: 'Valeur controlee du code.',
        },
        {
            name: 'defaultValue',
            type: 'string',
            defaultValue: "''",
            description: 'Valeur initiale incontrolee.',
        },
        {
            name: 'maxLength',
            type: 'number',
            defaultValue: '6',
            description: 'Nombre total de caracteres requis.',
        },
        {
            name: 'pattern',
            type: 'string',
            defaultValue: "'^[0-9]*$'",
            description: 'Expression reguliere de filtrage des caracteres.',
        },
        {
            name: 'inputMode',
            type: "'numeric' | 'text'",
            defaultValue: "'numeric'",
            description: 'Type de clavier virtuel affiche sur mobile.',
        },
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Desactive toute interaction.',
        },
        {
            name: 'onChange',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Rappel declenche a chaque saisie.',
        },
        {
            name: 'onComplete',
            type: '(value: string) => void',
            defaultValue: '-',
            description: 'Rappel declenche lorsque tous les slots sont remplis.',
        },
    ],
    cssHooks: [
        '.mr-input-otp',
        '.mr-input-otp__native-input',
        '.mr-input-otp__group',
        '.mr-input-otp__slot',
        '.mr-input-otp__separator',
        '.mr-input-otp__caret',
        '[data-disabled]',
        '[data-active]',
        '[data-filled]',
    ],
    tokens: [
        '--mr-bg-field',
        '--mr-border-default',
        '--mr-border-subtle',
        '--mr-ring-focus',
        '--mr-font-family-mono',
        '--mr-size-control-lg',
        '--mr-duration-state',
        '--mr-duration-pulse',
    ],
    a11y: [
        'Utilise un champ natif sous-jacent avec inputMode="numeric" et autoComplete="one-time-code".',
        'Permet la saisie clavier standard, les raccourcis copier/coller et la touche retour arriere.',
        'Curseur visuel clignotant simule respectant la preference prefers-reduced-motion.',
        "Accessible aux lecteurs d'ecran avec libelle clair.",
    ],
}

export function InputOtpDocs() {
    return <DocPage doc={docData} />
}
