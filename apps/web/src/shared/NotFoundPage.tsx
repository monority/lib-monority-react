import { useLocale, useMessages } from '@/shared/i18n'
import { localizePath } from '@/shared/i18n/locales'
import { usePageSeo } from '@/shared/seo/usePageSeo'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
    const { locale } = useLocale()
    const messages = useMessages().common.notFound

    usePageSeo({ title: messages.seoTitle, description: messages.seoDescription })

    return (
        <section>
            <h1>404</h1>
            <p>{messages.text}</p>
            <p>
                <Link to={localizePath('/', locale)}>{messages.home}</Link> —{' '}
                <Link to={localizePath('/docs', locale)}>{messages.docs}</Link>
            </p>
        </section>
    )
}
