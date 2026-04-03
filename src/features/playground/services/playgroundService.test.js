import { describe, expect, it, vi } from 'vitest'
import { getPlaygroundMetrics } from './playgroundService'

describe('playgroundService', () => {
    it('retourne les metriques de demonstration', async () => {
        await expect(getPlaygroundMetrics()).resolves.toEqual([
            expect.objectContaining({
                id: 'starter-readiness',
                label: 'Starter readiness',
            }),
            expect.objectContaining({
                id: 'feature-velocity',
                value: 'Rapide',
            }),
            expect.objectContaining({
                id: 'maintenance',
                detail: 'Le design system et les routes sont centralises et deja verifies.',
            }),
        ])
    })

    it('mappe les reponses via les adapters de service', async () => {
        vi.resetModules()

        vi.doMock('@/services/http/apiClient', () => ({
            apiClient: {
                request: vi.fn().mockResolvedValue([
                    {
                        id: 'metric-1',
                        label: 'Coverage',
                        value: '100%',
                        detail: 'All checks passed.',
                    },
                ]),
            },
        }))

        const { getPlaygroundMetrics: getMappedMetrics } = await import('./playgroundService')

        await expect(getMappedMetrics()).resolves.toEqual([
            {
                id: 'metric-1',
                label: 'Coverage',
                value: '100%',
                detail: 'All checks passed.',
            },
        ])
    })
})
