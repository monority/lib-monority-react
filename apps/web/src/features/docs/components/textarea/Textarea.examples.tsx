import { Textarea } from '@monority/ui/textarea'

export function TextareaBasicExample() {
    return (
        <>
            <Textarea data-testid="textarea-basic" defaultValue="Example" />
        </>
    )
}

export function TextareaWithLabelExample() {
    return <Textarea label="Description" placeholder="Enter your description..." />
}

export function TextareaWithErrorExample() {
    return <Textarea label="Bio" error="Bio must be at least 10 characters" />
}

export function TextareaDisabledExample() {
    return <Textarea label="Description" disabled defaultValue="Cannot edit this content" />
}

export function TextareaWithCharCountExample() {
    return <Textarea label="Bio" maxLength={200} placeholder="Tell us about yourself..." />
}

export function TextareaResizableExample() {
    return <Textarea label="Notes" resize="both" placeholder="Resizable textarea..." />
}
