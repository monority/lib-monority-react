import { cn } from '@/lib/cn'
interface FilterBarProps { children?: React.ReactNode; className?: string }
export function FilterBar({ children, className }: FilterBarProps) { return <div className={cn('ui-filter-bar', className)}>{children}</div> }
