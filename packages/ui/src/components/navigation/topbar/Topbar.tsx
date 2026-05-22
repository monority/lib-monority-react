import { cn } from '@/lib/cn'
interface TopbarProps { children?: React.ReactNode; className?: string }
export function Topbar({ children, className }: TopbarProps) { return <header className={cn('ui-topbar', className)}>{children}</header> }
