import { describe, expect, it } from 'vitest'
import { mapPlaygroundMetricResponse, mapPlaygroundMetricsResponse } from './playgroundMappers'

describe('mapPlaygroundMetricResponse', () => {
    it('mappe tous les champs d un metric', () => {
        const metric = { id: 'm-1', label: 'Requetes', value: '1 200', detail: 'par heure' }

        expect(mapPlaygroundMetricResponse(metric)).toEqual({
            id: 'm-1',
            label: 'Requetes',
            value: '1 200',
            detail: 'par heure',
        })
    })
})

describe('mapPlaygroundMetricsResponse', () => {
    it('mappe un tableau de metrics', () => {
        const metrics = [
            { id: 'm-1', label: 'Requetes', value: '1 200', detail: '/h' },
            { id: 'm-2', label: 'Erreurs', value: '3', detail: '%' },
        ]

        const result = mapPlaygroundMetricsResponse(metrics)

        expect(result).toHaveLength(2)
        expect(result[0].id).toBe('m-1')
        expect(result[1].label).toBe('Erreurs')
    })

    it('retourne un tableau vide si aucun metric', () => {
        expect(mapPlaygroundMetricsResponse([])).toEqual([])
        expect(mapPlaygroundMetricsResponse()).toEqual([])
    })
})
