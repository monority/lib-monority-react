import { canUseDOM } from './dom'

export function usePortalTarget() {
  return canUseDOM() ? document.body : null
}
