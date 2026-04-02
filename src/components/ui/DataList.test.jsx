import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataList } from './DataList'

describe('DataList', () => {
    it('renders labels and values', () => {
        render(
            <DataList
                items={[
                    { label: 'Owner', value: 'Alice Martin' },
                    { label: 'Status', value: 'Stable' },
                ]}
            />,
        )

        expect(screen.getByText('Owner')).toBeInTheDocument()
        expect(screen.getByText('Alice Martin')).toBeInTheDocument()
        expect(screen.getByText('Status')).toBeInTheDocument()
        expect(screen.getByText('Stable')).toBeInTheDocument()
    })

    it('supports custom render for value', () => {
        render(
            <DataList
                items={[
                    {
                        label: 'Coverage',
                        value: '100%',
                        render: (value) => <strong>{value}</strong>,
                    },
                ]}
            />,
        )

        expect(screen.getByText('100%').tagName).toBe('STRONG')
    })
})
