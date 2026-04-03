import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import {
    docsApiPatterns,
    docsComponentFamilies,
    docsComponentDocs,
    docsGettingStartedContent,
    docsHeroContent,
    docsPrinciples,
    docsRecipes,
    docsUsageGuidelines,
} from './content/docs-content'
import { DocsFamiliesSection } from './sections/DocsFamiliesSection'
import { DocsComponentReferenceSection } from './sections/DocsComponentReferenceSection'
import { DocsGettingStartedSection } from './sections/DocsGettingStartedSection'
import { DocsGuidelinesSection } from './sections/DocsGuidelinesSection'
import { DocsHeroSection } from './sections/DocsHeroSection'
import { DocsPatternsSection } from './sections/DocsPatternsSection'
import { DocsPrinciplesSection } from './sections/DocsPrinciplesSection'
import { DocsRecipesSection } from './sections/DocsRecipesSection'

export function DocsPage() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: 'Documentation d usage de la librairie UI',
        description:
            'Documentation d usage de la librairie UI du starter: principes, familles de composants, guidelines et recettes de composition.',
        inLanguage: 'fr-FR',
    }

    return (
        <AppPage
            navigationItems={primaryNavigationItems}
            seo={{
                title: 'Documentation UI',
                description:
                    'Documentation d usage de la librairie UI du starter: principes, familles de composants, guidelines et recettes de composition.',
                structuredData,
            }}
        >
            <DocsHeroSection content={docsHeroContent} />
            <DocsGettingStartedSection content={docsGettingStartedContent} />
            <DocsPrinciplesSection items={docsPrinciples} />
            <DocsPatternsSection items={docsApiPatterns} />
            <DocsFamiliesSection items={docsComponentFamilies} />
            <DocsGuidelinesSection items={docsUsageGuidelines} />
            <DocsRecipesSection items={docsRecipes} />
            <DocsComponentReferenceSection items={docsComponentDocs} />
        </AppPage>
    )
}
