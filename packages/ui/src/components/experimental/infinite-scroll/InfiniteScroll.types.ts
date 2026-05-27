import type { ReactNode } from 'react'

export interface InfiniteScrollProps {
  /** Children (la liste des items) */
  children?: ReactNode

  /** Callback déclenché quand le sentinel entre dans le viewport */
  onLoadMore?: () => void

  /** S'arrête de déclencher onLoadMore quand false */
  hasMore?: boolean

  /** Affiche ce contenu pendant le chargement */
  loader?: ReactNode

  /** Affiche ce contenu quand hasMore=false et que des items existent */
  endMessage?: ReactNode

  /** Affiche ce contenu quand il n'y a jamais eu d'items */
  emptyMessage?: ReactNode

  /** État d'erreur — affiché à la place du loader */
  error?: ReactNode

  /** Callback pour réessayer après une erreur */
  onRetry?: () => void

  /** Seuil IntersectionObserver (0 = par défaut) */
  threshold?: number | number[]

  /** rootMargin IntersectionObserver (ex: "200px") */
  rootMargin?: string

  /** Ref du scrollable parent (si scroll pas sur window) */
  scrollableParent?: HTMLElement | null

  /** Si true, sentinel en haut (reverse/infinite scroll chat) */
  reverse?: boolean

  /** Désactive l'observer */
  disabled?: boolean

  /** Anti-flood en ms */
  cooldown?: number

  /** ClassName supplémentaire */
  className?: string
}
