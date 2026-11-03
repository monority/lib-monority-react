import './styles/globals.css'

export * from './components'
export * from './hooks'
export * from './providers'
export * from './lib'
export * from './primitives'
export * from './icons'

/**
 * Utilitaire impératif historique de positionnement d'overlay.
 * L'implémentation reste interne et conservée pour compatibilité ;
 * les composants overlays modernes de la bibliothèque utilisent `useFloatingPosition`.
 * @deprecated Préférer la composition native des overlays ou le hook réactif interne.
 */
export { positionOverlay } from './internal/position/position'
