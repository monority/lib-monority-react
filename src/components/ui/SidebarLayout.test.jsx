import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SidebarLayout } from './SidebarLayout'

describe('SidebarLayout', () => {
    it('renders sidebar, header and content', () => {
        render(
            <SidebarLayout
                sidebar={<nav>Sidebar nav</nav>}
                header={<div>Header zone</div>}
            >
                Main content
            </SidebarLayout>,
        )

        expect(screen.getByText('Sidebar nav')).toBeInTheDocument()
        expect(screen.getByText('Header zone')).toBeInTheDocument()
        expect(screen.getByText('Main content')).toBeInTheDocument()
    })
})
