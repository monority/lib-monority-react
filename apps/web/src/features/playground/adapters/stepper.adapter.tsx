import { useState } from 'react'
import { Stepper } from '@monority/ui/stepper'
import { Button } from '@monority/ui/button'
import type { PlaygroundDefinition, PlaygroundProps } from '../playground-types'

const sampleSteps = [
    { title: 'Conception', description: 'Specification des tokens' },
    { title: 'Developpement', description: 'Implementation React & CSS' },
    { title: 'Verification', description: 'Tests 100% verts' },
]

const defaults: PlaygroundProps = {
    orientation: 'horizontal',
    activeStep: 1,
}

function StepperDemo(props: PlaygroundProps) {
    const [step, setStep] = useState(Number(props.activeStep ?? 1))

    return (
        <div style={{ display: 'grid', gap: '1rem', width: '100%' }}>
            <Stepper
                orientation={props.orientation as 'horizontal' | 'vertical'}
                steps={sampleSteps}
                activeStep={step}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                    size="sm"
                    variant="secondary"
                    disabled={step <= 0}
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                >
                    Precedent
                </Button>
                <Button
                    size="sm"
                    variant="primary"
                    disabled={step >= sampleSteps.length - 1}
                    onClick={() => setStep((s) => Math.min(sampleSteps.length - 1, s + 1))}
                >
                    Suivant
                </Button>
            </div>
        </div>
    )
}

function codeFor(props: PlaygroundProps): string {
    return `<Stepper activeStep={${props.activeStep ?? 1}} orientation="${String(props.orientation ?? 'horizontal')}" steps={steps} />`
}

export const stepperPlayground: PlaygroundDefinition = {
    slug: 'stepper',
    label: 'Stepper',
    docsPath: '/docs/stepper',
    importStatement: "import { Stepper } from '@monority/ui/stepper'",
    controls: [
        { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'] },
        { name: 'activeStep', type: 'number', min: 0, max: 2 },
    ],
    defaultProps: defaults,
    render: (props) => <StepperDemo key={String(props.activeStep)} {...props} />,
    generateCode: codeFor,
}
