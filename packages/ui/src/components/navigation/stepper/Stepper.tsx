import { Children, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/cn'
import type {
    StepItemData,
    StepStatus,
    StepperOrientation,
    StepperProps,
    StepperStepProps,
} from './Stepper.types'

function CheckIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}

export function StepperStep({
    ref,
    stepNumber,
    status = 'upcoming',
    title,
    description,
    children,
    className,
    ...props
}: StepperStepProps) {
    const isCompleted = status === 'completed'
    const isActive = status === 'active'

    return (
        <li
            ref={ref}
            className={cn('mr-stepper__item', className)}
            data-status={status}
            aria-current={isActive ? 'step' : undefined}
            {...props}
        >
            <span className="mr-stepper__indicator" aria-hidden="true">
                {isCompleted ? <CheckIcon /> : stepNumber}
            </span>
            <div className="mr-stepper__content">
                {title ? <span className="mr-stepper__title">{title}</span> : null}
                {description ? (
                    <span className="mr-stepper__description">{description}</span>
                ) : null}
                {children}
            </div>
        </li>
    )
}

export function Stepper({
    ref,
    activeStep = 0,
    orientation = 'horizontal',
    steps,
    children,
    className,
    ...props
}: StepperProps) {
    const renderSteps = () => {
        if (steps) {
            return steps.map((step: StepItemData, index: number) => {
                let status: StepStatus = step.status ?? 'upcoming'
                if (!step.status) {
                    if (index < activeStep) status = 'completed'
                    else if (index === activeStep) status = 'active'
                    else status = 'upcoming'
                }

                return (
                    <div key={step.id ?? index} style={{ display: 'contents' }}>
                        <StepperStep
                            stepNumber={index + 1}
                            status={status}
                            title={step.title}
                            description={step.description}
                        />
                        {index < steps.length - 1 ? (
                            <div className="mr-stepper__connector" aria-hidden="true" />
                        ) : null}
                    </div>
                )
            })
        }

        const childArray = Children.toArray(children)
        return childArray.map((child, index) => {
            if (!isValidElement<StepperStepProps>(child)) return child

            const childStatus =
                child.props.status ??
                (index < activeStep ? 'completed' : index === activeStep ? 'active' : 'upcoming')

            return (
                <div key={index} style={{ display: 'contents' }}>
                    {cloneElement(child, {
                        stepNumber: child.props.stepNumber ?? index + 1,
                        status: childStatus,
                    })}
                    {index < childArray.length - 1 ? (
                        <div className="mr-stepper__connector" aria-hidden="true" />
                    ) : null}
                </div>
            )
        })
    }

    return (
        <ol
            ref={ref}
            role="list"
            data-orientation={orientation}
            className={cn('mr-stepper', className)}
            {...props}
        >
            {renderSteps()}
        </ol>
    )
}

Stepper.Step = StepperStep

export type {
    StepperProps,
    StepperStepProps,
    StepItemData,
    StepStatus,
    StepperOrientation,
} from './Stepper.types'
