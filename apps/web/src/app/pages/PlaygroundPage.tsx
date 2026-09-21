import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { usePageSeo } from '@/seo/usePageSeo'
import { getPlaygroundDefinition, playgroundRegistry } from './playground/playground-registry'
import type { PlaygroundProps } from './playground/playground-types'
import { PlaygroundCode } from './playground/PlaygroundCode'
import { PlaygroundControls } from './playground/PlaygroundControls'
import { PlaygroundPreview } from './playground/PlaygroundPreview'
import './playground/playground.css'

export function PlaygroundPage() {
    usePageSeo({
        title: 'Playground',
        description: 'Experiment with stable components, live props and generated code.',
    })
    const [searchParams, setSearchParams] = useSearchParams()
    const requested = searchParams.get('component')
    const requestedSlug =
        requested && playgroundRegistry.some((item) => item.slug === requested)
            ? requested
            : playgroundRegistry[0]!.slug

    const [slug, setSlug] = useState(requestedSlug)
    const definition = getPlaygroundDefinition(slug)
    const [values, setValues] = useState<PlaygroundProps>(() => ({
        ...definition.defaultProps,
    }))

    // Invalid slug → fall back to the first component with a clean URL.
    useEffect(() => {
        if (requested && requested !== requestedSlug) {
            setSearchParams({}, { replace: true })
        }
    }, [requested, requestedSlug, setSearchParams])

    // External navigation (back/forward, direct link) → follow the URL.
    useEffect(() => {
        if (requestedSlug !== slug) {
            const nextDefinition = getPlaygroundDefinition(requestedSlug)
            setSlug(requestedSlug)
            setValues({ ...nextDefinition.defaultProps })
        }
    }, [requestedSlug, slug])

    const code = useMemo(() => {
        const body = definition.generateCode(values)
        return `${definition.importStatement}\n\n${body}`
    }, [definition, values])

    const handleSelect = (next: string) => {
        const nextDefinition = getPlaygroundDefinition(next)
        setSlug(next)
        setValues({ ...nextDefinition.defaultProps })
        setSearchParams(next === playgroundRegistry[0]!.slug ? {} : { component: next })
    }

    const handleChange = (name: string, value: unknown) => {
        setValues((previous) => ({ ...previous, [name]: value }))
    }

    const handleReset = () => setValues({ ...definition.defaultProps })

    return (
        <div className="pg-layout">
            <header className="pg-header">
                <h1>Playground</h1>
                <p>
                    Select one of the {playgroundRegistry.length} stable components, tweak its
                    public props, and copy the generated usage. APIs shown here match{' '}
                    <code>@monority/ui</code> exactly.
                </p>
            </header>

            <div className="pg-selector">
                <label className="pg-control__label" htmlFor="pg-component">
                    Component
                </label>
                <select
                    id="pg-component"
                    className="pg-selector__select"
                    value={slug}
                    onChange={(event) => handleSelect(event.target.value)}
                >
                    {playgroundRegistry.map((item) => (
                        <option key={item.slug} value={item.slug}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="pg-grid">
                <PlaygroundPreview componentLabel={definition.label}>
                    {definition.render(values)}
                </PlaygroundPreview>
                <PlaygroundControls
                    slug={definition.slug}
                    controls={definition.controls}
                    values={values}
                    onChange={handleChange}
                    onReset={handleReset}
                />
            </div>

            <PlaygroundCode code={code} />

            <p className="pg-footer">
                <Link to={definition.docsPath}>Read {definition.label} docs</Link>
                <Link to="/showcase">See it in the Showcase</Link>
            </p>
        </div>
    )
}
