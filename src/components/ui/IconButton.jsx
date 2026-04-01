import { Button } from './Button'

export function IconButton({ label, children, ...props }) {
    return (
        <Button className="ui-icon-btn" aria-label={label} {...props}>
            {children}
        </Button>
    )
}
