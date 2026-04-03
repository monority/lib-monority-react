import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildAbsoluteUrl, siteConfig } from './site-config'

function upsertMeta(selector, attributes) {
    let element = document.head.querySelector(selector)

    if (!element) {
        element = document.createElement('meta')
        document.head.appendChild(element)
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })
}

function upsertLink(selector, attributes) {
    let element = document.head.querySelector(selector)

    if (!element) {
        element = document.createElement('link')
        document.head.appendChild(element)
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })
}

function upsertJsonLd(scriptId, content) {
    let element = document.head.querySelector(`#${scriptId}`)

    if (!element) {
        element = document.createElement('script')
        element.type = 'application/ld+json'
        element.id = scriptId
        document.head.appendChild(element)
    }

    element.textContent = JSON.stringify(content)
}

export function usePageSeo({
    title,
    description = siteConfig.defaultDescription,
    image = siteConfig.defaultImage,
    robots = 'index,follow',
    type = siteConfig.type,
    canonicalPath,
    structuredData,
}) {
    const location = useLocation()

    useEffect(() => {
        const resolvedTitle = title
            ? `${title} | ${siteConfig.titleSuffix}`
            : siteConfig.defaultTitle
        const resolvedPath = canonicalPath ?? location.pathname
        const canonicalUrl = buildAbsoluteUrl(resolvedPath)
        const socialImage = image.startsWith('http') ? image : buildAbsoluteUrl(image)

        document.title = resolvedTitle

        upsertMeta('meta[name="description"]', {
            name: 'description',
            content: description,
        })
        upsertMeta('meta[name="robots"]', {
            name: 'robots',
            content: robots,
        })
        upsertMeta('meta[property="og:type"]', {
            property: 'og:type',
            content: type,
        })
        upsertMeta('meta[property="og:site_name"]', {
            property: 'og:site_name',
            content: siteConfig.name,
        })
        upsertMeta('meta[property="og:title"]', {
            property: 'og:title',
            content: resolvedTitle,
        })
        upsertMeta('meta[property="og:description"]', {
            property: 'og:description',
            content: description,
        })
        upsertMeta('meta[property="og:url"]', {
            property: 'og:url',
            content: canonicalUrl,
        })
        upsertMeta('meta[property="og:image"]', {
            property: 'og:image',
            content: socialImage,
        })
        upsertMeta('meta[property="og:locale"]', {
            property: 'og:locale',
            content: siteConfig.locale,
        })
        upsertMeta('meta[name="twitter:card"]', {
            name: 'twitter:card',
            content: 'summary_large_image',
        })
        upsertMeta('meta[name="twitter:title"]', {
            name: 'twitter:title',
            content: resolvedTitle,
        })
        upsertMeta('meta[name="twitter:description"]', {
            name: 'twitter:description',
            content: description,
        })
        upsertMeta('meta[name="twitter:image"]', {
            name: 'twitter:image',
            content: socialImage,
        })
        upsertLink('link[rel="canonical"]', {
            rel: 'canonical',
            href: canonicalUrl,
        })

        if (structuredData) {
            upsertJsonLd('app-jsonld', structuredData)
            return
        }

        const existingJsonLd = document.head.querySelector('#app-jsonld')

        if (existingJsonLd) {
            existingJsonLd.remove()
        }
    }, [canonicalPath, description, image, location.pathname, robots, structuredData, title, type])
}
