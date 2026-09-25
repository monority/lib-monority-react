const warned = new Set<string>()

function isProduction(): boolean {
  const runtime = globalThis as typeof globalThis & {
    process?: { env?: { NODE_ENV?: string } }
  }
  return runtime.process?.env?.NODE_ENV === 'production'
}

/** Avertit une seule fois par identifiant en développement. */
export function deprecate(id: string, message: string): void {
  if (isProduction() || warned.has(id)) return
  warned.add(id)
  console.warn(`[Monority UI][deprecated:${id}] ${message}`)
}
