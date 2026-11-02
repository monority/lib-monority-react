import { Logo3D } from '@monority/logo3d/react'
import './Logo3DPage.css'

const sizes = [
    { label: '48', value: '3rem' },
    { label: '96', value: '6rem' },
    { label: '144', value: '9rem' },
    { label: '192', value: '12rem' },
]

export function Logo3DPage() {
    return (
        <main className="logo3d-page">
            <header className="logo3d-page__intro">
                <p className="logo3d-page__eyebrow">@monority/logo3d</p>
                <h1 className="logo3d-page__title">Le logo, en trois dimensions.</h1>
                <p className="logo3d-page__lead">
                    Un nuage de 6 975 points cuit depuis <code>logo3.svg</code>, une dépendance en
                    peer (<code>three</code>), aucun parse SVG au runtime.
                </p>
            </header>

            <div className="logo3d-page__stage">
                <div className="logo3d-page__hero">
                    <Logo3D label="Monority" motion="always" />
                </div>
            </div>

            <section className="logo3d-page__scales" aria-label="Tailles d’usage">
                {sizes.map((size) => (
                    <figure key={size.label} className="logo3d-page__scale">
                        <div
                            className="logo3d-page__sample"
                            style={{ inlineSize: size.value, blockSize: size.value }}
                        >
                            <Logo3D label={`Monority — ${size.label} pixels`} motion="none" />
                        </div>
                        <figcaption>{size.label} px</figcaption>
                    </figure>
                ))}
            </section>
        </main>
    )
}
