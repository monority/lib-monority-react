import { isDevelopment } from './env'

const warned = new Set<string>()

/** Avertit une seule fois par identifiant en développement. */
export function deprecate(id: string, message: string): void {
    if (isDevelopment && !warned.has(id)) {
        warned.add(id)
        console.warn(`[Monority UI][deprecated:${id}] ${message}`)
    }
}
