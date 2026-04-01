import { AppShell } from '@/app/layouts/AppShell'
import { primaryNavigationItems } from '@/app/config/navigation'
import { Container, Stack } from '@/components/ui'
import { useTheme } from '@/hooks/useTheme'
import { showcaseHeroContent } from './content/showcase-content'
import { ShowcaseActionsSection } from './sections/ShowcaseActionsSection'
import { ShowcaseFeedbackSection } from './sections/ShowcaseFeedbackSection'
import { ShowcaseFormsSection } from './sections/ShowcaseFormsSection'
import { ShowcaseHeroSection } from './sections/ShowcaseHeroSection'
import { ShowcaseSelectionSection } from './sections/ShowcaseSelectionSection'
import { ShowcaseSurfacesSection } from './sections/ShowcaseSurfacesSection'
import { ShowcaseTypographySection } from './sections/ShowcaseTypographySection'

export function ShowcasePage() {
    const { isDark, toggleTheme } = useTheme()

    return (
        <AppShell
            isDark={isDark}
            onToggleTheme={toggleTheme}
            navigationItems={primaryNavigationItems}
        >
            <Container size="lg">
                <Stack gap="xl">
                    <ShowcaseHeroSection content={showcaseHeroContent} />
                    <ShowcaseTypographySection />
                    <ShowcaseActionsSection />
                    <ShowcaseSelectionSection />
                    <ShowcaseFeedbackSection />
                    <ShowcaseFormsSection />
                    <ShowcaseSurfacesSection />
                </Stack>
            </Container>
        </AppShell>
    )
}
