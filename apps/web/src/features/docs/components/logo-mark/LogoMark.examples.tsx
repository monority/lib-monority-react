import { LogoMark } from '@monority/ui/logo-mark'

export function LogoMarkCurrentExample() {
    return <LogoMark size={96} label="Monority" />
}

export function LogoMarkDarkExample() {
    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--mr-space-5)',
                borderRadius: 'var(--mr-radius-md)',
                background: '#0B0A09',
            }}
        >
            <LogoMark size={96} variant="dark" label="Monority" />
        </div>
    )
}

export function LogoMarkLightExample() {
    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--mr-space-5)',
                borderRadius: 'var(--mr-radius-md)',
                background: '#ECEBEB',
            }}
        >
            <LogoMark size={96} variant="light" label="Monority" />
        </div>
    )
}

export function LogoMarkAmberExample() {
    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--mr-space-5)',
                borderRadius: 'var(--mr-radius-md)',
                background: '#0B0A09',
            }}
        >
            <LogoMark size={96} variant="amber" label="Monority" />
        </div>
    )
}

const SIZES = [16, 20, 24, 32, 48, 96]

export function LogoMarkSizesExample() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: 'var(--mr-space-4)',
            }}
        >
            {SIZES.map((size) => (
                <div
                    key={size}
                    style={{
                        display: 'grid',
                        justifyItems: 'center',
                        gap: 'var(--mr-space-1)',
                    }}
                >
                    <LogoMark size={size} />
                    <span
                        style={{
                            fontSize: 'var(--mr-font-size-xs)',
                            color: 'var(--mr-text-secondary)',
                        }}
                    >
                        {size}
                    </span>
                </div>
            ))}
        </div>
    )
}
