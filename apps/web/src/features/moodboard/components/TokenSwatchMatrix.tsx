export function TokenSwatchMatrix() {
    return (
        <div className="moodboard-token-matrix">
            <div className="moodboard-token-row">
                <span className="moodboard-token-label">Surfaces</span>
                <div className="moodboard-swatches">
                    <i style={{ background: 'var(--mr-bg-canvas)' }} />
                    <i style={{ background: 'var(--mr-bg-surface)' }} />
                    <i style={{ background: 'var(--mr-bg-raised)' }} />
                    <i style={{ background: 'var(--mr-bg-sunken)' }} />
                </div>
            </div>

            <div className="moodboard-token-row">
                <span className="moodboard-token-label">Accent</span>
                <div className="moodboard-swatches">
                    <i style={{ background: 'var(--mr-accent)' }} />
                    <i style={{ background: 'var(--mr-accent-hover)' }} />
                    <i style={{ background: 'var(--mr-accent-active)' }} />
                    <i style={{ background: 'var(--mr-accent-subtle)' }} />
                </div>
            </div>

            <div className="moodboard-token-row">
                <span className="moodboard-token-label">Status</span>
                <div className="moodboard-swatches">
                    <i style={{ background: 'var(--mr-success-text)' }} />
                    <i style={{ background: 'var(--mr-warning-text)' }} />
                    <i style={{ background: 'var(--mr-danger-text)' }} />
                    <i style={{ background: 'var(--mr-info-text)' }} />
                </div>
            </div>

            <div className="moodboard-token-row">
                <span className="moodboard-token-label">Charts</span>
                <div className="moodboard-swatches">
                    <i style={{ background: 'var(--mr-chart-1)' }} />
                    <i style={{ background: 'var(--mr-chart-2)' }} />
                    <i style={{ background: 'var(--mr-chart-3)' }} />
                    <i style={{ background: 'var(--mr-chart-4)' }} />
                    <i style={{ background: 'var(--mr-chart-5)' }} />
                </div>
            </div>

            <div className="moodboard-token-row">
                <span className="moodboard-token-label">Geometry</span>
                <div className="moodboard-geometry-samples">
                    <i style={{ borderRadius: 'var(--mr-radius-inline)' }} />
                    <i style={{ borderRadius: 'var(--mr-radius-control)' }} />
                    <i style={{ borderRadius: 'var(--mr-radius-card)' }} />
                </div>
            </div>

            <div className="moodboard-token-row">
                <span className="moodboard-kicker">Typography</span>
                <div className="moodboard-typography-strip">
                    <span style={{ font: 'var(--mr-type-display)' }}>Display</span>
                    <span style={{ font: 'var(--mr-type-h2)' }}>Heading</span>
                    <span style={{ font: 'var(--mr-type-body)' }}>Body text</span>
                    <span style={{ font: 'var(--mr-type-code)' }}>code</span>
                </div>
            </div>
        </div>
    )
}
