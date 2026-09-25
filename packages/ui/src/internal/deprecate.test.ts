import { afterEach, describe, expect, it, vi } from 'vitest'

async function importForEnvironment(nodeEnv: string) {
  vi.resetModules()
  vi.stubEnv('NODE_ENV', nodeEnv)
  return import('./deprecate')
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllEnvs()
})

describe('deprecate', () => {
  it('avertit une seule fois par identifiant en développement', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const { deprecate } = await importForEnvironment('development')

    deprecate('button.variant', 'Le variante est obsolète.')
    deprecate('button.variant', 'Le variante est obsolète.')

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('button.variant'))
  })

  it('avertit une fois par identifiant distinct', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const { deprecate } = await importForEnvironment('development')

    deprecate('button.variant', 'Obsolète A.')
    deprecate('button.size', 'Obsolète B.')

    expect(warn).toHaveBeenCalledTimes(2)
  })

  it('reste silencieux en production', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const { deprecate } = await importForEnvironment('production')

    deprecate('button.variant', 'Le variante est obsolète.')

    expect(warn).not.toHaveBeenCalled()
  })
})
