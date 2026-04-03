import { AppPage } from '@/app/layouts/AppPage'
import { primaryNavigationItems } from '@/app/config/navigation'
import {
    docsApiPatterns,
    docsComponentFamilies,
    docsComponentDocs,
    docsHeroContent,
    docsPrinciples,
    docsRecipes,
    docsUsageGuidelines,
} from './content/docs-content'
import { DocsFamiliesSection } from './sections/DocsFamiliesSection'
import { DocsComponentReferenceSection } from './sections/DocsComponentReferenceSection'
import { DocsGuidelinesSection } from './sections/DocsGuidelinesSection'
import { DocsHeroSection } from './sections/DocsHeroSection'
import { DocsPatternsSection } from './sections/DocsPatternsSection'
import { DocsPrinciplesSection } from './sections/DocsPrinciplesSection'
import { DocsRecipesSection } from './sections/DocsRecipesSection'

export function DocsPage() {
    return (
        <AppPage
            navigationItems={primaryNavigationItems}
            seo={{
                title: 'Documentation UI',
                description:
                    'Documentation d usage de la librairie UI du starter: principes, familles de composants, guidelines et recettes de composition.',
            }}
        >
            <DocsHeroSection content={docsHeroContent} />
            <DocsPrinciplesSection items={docsPrinciples} />
            <DocsPatternsSection items={docsApiPatterns} />
            <DocsFamiliesSection items={docsComponentFamilies} />
            <DocsGuidelinesSection items={docsUsageGuidelines} />
            <DocsRecipesSection items={docsRecipes} />
            <DocsComponentReferenceSection items={docsComponentDocs} />
        </AppPage>
    )
}
