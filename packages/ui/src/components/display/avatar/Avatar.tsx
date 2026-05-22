import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'

type AvatarSize = 'sm' | 'md' | 'lg'
const szCN: Record<AvatarSize, string> = { sm: 'ui-avatar--sm', md: 'ui-avatar--md', lg: 'ui-avatar--lg' }
function getInitials(name?: string): string { if (!name) return '?'; const p = name.trim().split(/\s+/).filter(Boolean); if (!p.length) return '?'; if (p.length === 1) return p[0].slice(0, 2).toUpperCase(); return `${p[0][0] ?? ''}${p[1][0] ?? ''}`.toUpperCase() }
interface AvatarProps { src?: string; alt?: string; name?: string; size?: AvatarSize; className?: string }

export function Avatar({ src, alt, name, size = 'md', className }: AvatarProps) {
  const [hasError, setHasError] = useState(false); const initials = useMemo(() => getInitials(name || alt), [alt, name]); const shouldRenderImage = Boolean(src) && !hasError
  return <span className={cn('ui-avatar', szCN[size], className)} aria-label={alt || name || 'Avatar'}>
    {shouldRenderImage ? <img className="ui-avatar__image" src={src} alt={alt || name || ''} onError={() => setHasError(true)} /> : <span className="ui-avatar__fallback" aria-hidden="true">{initials}</span>}
  </span>
}
