import { Button, type ButtonProps } from '@/components/actions/button/Button'

interface IconButtonProps extends Omit<ButtonProps, 'aria-label'> { label: string }

export function IconButton({ label, children, ...props }: IconButtonProps) {
  return <Button className="ui-icon-btn" aria-label={label} {...props}>{children}</Button>
}
