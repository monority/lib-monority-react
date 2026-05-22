import { cn } from '@/lib/cn'

interface BreadcrumbItem { label: string; href?: string }
interface BreadcrumbProps { items?: BreadcrumbItem[]; className?: string }

export function Breadcrumb({ items = [], className }: BreadcrumbProps) {
  return <nav className={cn('ui-breadcrumb', className)} aria-label="Fil d'Ariane">
    <ol className="ui-breadcrumb__list">{items.map((item, index) => <li key={index} className="ui-breadcrumb__item">{item.href ? <a className="ui-breadcrumb__link" href={item.href}>{item.label}</a> : <span className="ui-breadcrumb__current" aria-current="page">{item.label}</span>}</li>)}</ol>
  </nav>
}
