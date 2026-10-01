import { screen, within, fireEvent } from '@testing-library/react'
import { MoodboardPage } from './MoodboardPage'
import { renderWithProviders } from '@/shared/test/test-utils'

beforeEach(() => {
    localStorage.clear()
})

describe('MoodboardPage', () => {
    it('renders one canonical interface with config sidebar and preview', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        expect(screen.getByTestId('moodboard-page')).toBeInTheDocument()
        expect(screen.getByText('Design Studio')).toBeInTheDocument()
        expect(screen.getByText('MONORITY UI')).toBeInTheDocument()

        /* Single preview scope */
        expect(screen.getByTestId('moodboard-preview-scope')).toBeInTheDocument()
        expect(screen.getByTestId('moodboard-preview')).toBeInTheDocument()

        /* Config axes present */
        expect(screen.getByRole('group', { name: 'Theme axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Brand axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Accent axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Component color axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Chart palette axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Radius axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Spacing axis' })).toBeInTheDocument()
        expect(screen.getByRole('group', { name: 'Layout density axis' })).toBeInTheDocument()
    })

    it('renders the shared app header above the studio', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        expect(screen.getByRole('link', { name: 'Monority' })).toHaveAttribute('href', '/')
        expect(
            screen.getByRole('navigation', { name: 'Navigation principale' })
        ).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /thème/i })).toBeInTheDocument()
    })

    it('preview contains real components: topbar, metrics, chart, table, forms, buttons', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        expect(screen.getByText('Release control')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Deploy' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Inspect' })).toBeInTheDocument()

        /* Metrics */
        expect(screen.getByText('REQUESTS / MIN')).toBeInTheDocument()
        expect(screen.getByText('98.4%')).toBeInTheDocument()
        expect(screen.getByText('P95 LATENCY')).toBeInTheDocument()

        /* Chart */
        expect(screen.getByTestId('moodboard-chart')).toBeInTheDocument()

        /* Table */
        expect(screen.getByText('SERVICE HEALTH')).toBeInTheDocument()
        expect(screen.getByText(/edge-router/)).toBeInTheDocument()

        /* Form controls */
        expect(screen.getByLabelText('Workspace')).toBeInTheDocument()
        expect(screen.getByLabelText('Region')).toBeInTheDocument()
        expect(screen.getByLabelText('Release notes')).toBeInTheDocument()
        expect(screen.getByText('Signed builds only')).toBeInTheDocument()
        expect(screen.getByText('Notifications')).toBeInTheDocument()

        /* Buttons */
        expect(screen.getByRole('button', { name: 'primary' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'danger' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'loading' })).toBeInTheDocument()

        /* Badges */
        expect(screen.getByText('success')).toBeInTheDocument()
        expect(screen.getByText('warning')).toBeInTheDocument()

        /* Progress */
        expect(screen.getByText('Migrations')).toBeInTheDocument()
        expect(screen.getByText('Tests')).toBeInTheDocument()
    })

    it('changing accent axis updates preview scope attribute', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const scope = screen.getByTestId('moodboard-preview-scope')
        expect(scope).toHaveAttribute('data-design-accent', 'neutral')

        fireEvent.click(
            within(screen.getByRole('group', { name: 'Accent axis' })).getByRole('button', {
                name: 'Violet',
            })
        )
        expect(scope).toHaveAttribute('data-design-accent', 'violet')

        /* Verify the resolved CSS variable changes on DesignProvider root */
        const root = screen.getByTestId('moodboard-page').parentElement!
        expect(root.style.getPropertyValue('--mr-ref-brand-hue')).toBe('295')
    })

    it('changing radius axis updates preview scope attribute', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const scope = screen.getByTestId('moodboard-preview-scope')
        expect(scope).toHaveAttribute('data-design-radius', 'default')

        fireEvent.click(
            within(screen.getByRole('group', { name: 'Radius axis' })).getByRole('button', {
                name: 'Rounded',
            })
        )
        expect(scope).toHaveAttribute('data-design-radius', 'rounded')
    })

    it('changing theme axis updates preview scope data-design-theme', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const scope = screen.getByTestId('moodboard-preview-scope')
        fireEvent.click(
            within(screen.getByRole('group', { name: 'Theme axis' })).getByRole('button', {
                name: 'Light',
            })
        )
        expect(scope).toHaveAttribute('data-design-theme', 'light')
    })

    it('reset button restores default configuration', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const scope = screen.getByTestId('moodboard-preview-scope')

        /* Change some axes */
        fireEvent.click(
            within(screen.getByRole('group', { name: 'Accent axis' })).getByRole('button', {
                name: 'Violet',
            })
        )
        fireEvent.click(
            within(screen.getByRole('group', { name: 'Radius axis' })).getByRole('button', {
                name: 'Rounded',
            })
        )

        expect(scope).toHaveAttribute('data-design-accent', 'violet')
        expect(scope).toHaveAttribute('data-design-radius', 'rounded')

        /* Reset */
        fireEvent.click(screen.getByTestId('moodboard-reset'))

        expect(scope).toHaveAttribute('data-design-accent', 'neutral')
        expect(scope).toHaveAttribute('data-design-radius', 'default')
    })

    it('copy button copies configuration to clipboard', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined)
        Object.assign(navigator, { clipboard: { writeText } })

        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        fireEvent.click(
            within(screen.getByRole('group', { name: 'Accent axis' })).getByRole('button', {
                name: 'Violet',
            })
        )
        fireEvent.click(screen.getByTestId('moodboard-copy'))

        expect(writeText).toHaveBeenCalled()
        const copiedJson = JSON.parse(String(writeText.mock.calls[0]?.[0]))
        expect(copiedJson.accent).toBe('violet')
    })

    it('persists configuration to localStorage', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        fireEvent.click(
            within(screen.getByRole('group', { name: 'Accent axis' })).getByRole('button', {
                name: 'Violet',
            })
        )

        const stored = localStorage.getItem('monority-design-config')
        expect(stored).toBeTruthy()
        expect(JSON.parse(stored!).accent).toBe('violet')
    })

    it('sidebar token details are collapsible', () => {
        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const details = screen.getByText('Token Details').closest('details')!
        expect(details).not.toHaveAttribute('open')

        fireEvent.click(screen.getByText('Token Details'))
        expect(details).toHaveAttribute('open')

        /* JSON content visible when open */
        expect(screen.getByText(/"theme"/)).toBeInTheDocument()
    })

    it('recovers from a stored config predating the component color axis change', () => {
        localStorage.setItem(
            'monority-design-config',
            JSON.stringify({
                theme: 'oled',
                brand: 'studio',
                accent: 'rose',
                componentColor: 'cyan',
                chartPalette: 'ocean',
                radius: 'pill',
                spacing: 'dense',
                density: 'compact',
            })
        )

        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        const scope = screen.getByTestId('moodboard-preview-scope')
        /* Valid axes are restored, the retired hue falls back instead of crashing. */
        expect(scope).toHaveAttribute('data-design-theme', 'oled')
        expect(scope).toHaveAttribute('data-design-accent', 'rose')
        expect(scope).toHaveAttribute('data-design-radius', 'pill')
        expect(scope).toHaveAttribute('data-design-component-color', 'theme')
    })

    it('recovers from a corrupt stored config', () => {
        localStorage.setItem('monority-design-config', '{ not json')

        renderWithProviders(<MoodboardPage />, { initialEntries: ['/moodboard'] })

        expect(screen.getByTestId('moodboard-preview-scope')).toHaveAttribute(
            'data-design-accent',
            'neutral'
        )
    })
})
