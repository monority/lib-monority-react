import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import { showcaseHeroContent } from './content/showcase-content'
import { ShowcaseActionsSection } from './sections/ShowcaseActionsSection'
import { ShowcaseCatalogSection } from './sections/ShowcaseCatalogSection'
import { ShowcaseFeedbackSection } from './sections/ShowcaseFeedbackSection'
import { ShowcaseFormsSection } from './sections/ShowcaseFormsSection'
import { ShowcaseHeroSection } from './sections/ShowcaseHeroSection'
import { ShowcaseSelectionSection } from './sections/ShowcaseSelectionSection'
import { ShowcaseSurfacesSection } from './sections/ShowcaseSurfacesSection'
import { ShowcaseTypographySection } from './sections/ShowcaseTypographySection'

export function ShowcasePage() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Showcase des composants UI',
        description:
            'Showcase interactif des composants UI du starter pour parcourir les primitives, patterns et etats d interface disponibles.',
        inLanguage: 'fr-FR',
    }

    return (
        <AppPage
            navigationItems={primaryNavigationItems}
            seo={{
                title: 'Showcase composants UI',
                description:
                    'Showcase interactif des composants UI du starter pour parcourir les primitives, patterns et etats d interface disponibles.',
                structuredData,
            }}
        >
            <ShowcaseHeroSection content={showcaseHeroContent} />
            <ShowcaseCatalogSection />
            <ShowcaseTypographySection />
            <ShowcaseActionsSection />
            <ShowcaseSelectionSection />
            <ShowcaseFeedbackSection />
            <ShowcaseFormsSection />
            <ShowcaseSurfacesSection />
        </AppPage>
    )
}
