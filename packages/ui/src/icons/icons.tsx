import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import type { IconProps } from './Icon.types'

function createIcon(displayName: string, defaultPath: ReactNode, viewBox = '0 0 20 20') {
    const Component = ({
        ref,
        size = '1em',
        strokeWidth = 2,
        className,
        children,
        ...props
    }: IconProps) => (
        <svg
            ref={ref}
            width={size}
            height={size}
            viewBox={viewBox}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={cn('mr-icon', className)}
            {...props}
        >
            {children ?? defaultPath}
        </svg>
    )
    Component.displayName = displayName
    return Component
}

export const IconChevronLeft = createIcon('IconChevronLeft', <path d="M12.5 4.5L7 10l5.5 5.5" />)

export const IconChevronRight = createIcon('IconChevronRight', <path d="M7.5 4.5L13 10l-5.5 5.5" />)

export const IconChevronUp = createIcon('IconChevronUp', <path d="M15.5 12.5L10 7l-5.5 5.5" />)

export const IconChevronDown = createIcon('IconChevronDown', <path d="M4.5 7.5L10 13l5.5-5.5" />)

export const IconClose = createIcon('IconClose', <path d="M5 5l10 10M15 5L5 15" />)

export const IconCheck = createIcon('IconCheck', <path d="M4.5 10.5l3.5 3.5 7.5-7.5" />)

export const IconCheckCircle = createIcon(
    'IconCheckCircle',
    <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M6.5 10l2.5 2.5 4.5-4.5" />
    </>
)

export const IconAlertTriangle = createIcon(
    'IconAlertTriangle',
    <>
        <path d="M10 2.5L2 16.5h16L10 2.5z" />
        <path d="M10 7.5v4" />
        <circle cx="10" cy="14" r="0.75" fill="currentColor" stroke="none" />
    </>
)

export const IconAlertCircle = createIcon(
    'IconAlertCircle',
    <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6.5v4.5" />
        <circle cx="10" cy="14" r="0.75" fill="currentColor" stroke="none" />
    </>
)

export const IconInfo = createIcon(
    'IconInfo',
    <>
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 9v4.5" />
        <circle cx="10" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </>
)

export const IconSparkles = createIcon(
    'IconSparkles',
    <path d="M10 2l1.66 4.34L16 8l-4.34 1.66L10 14l-1.66-4.34L4 8l4.34-1.66L10 2z" />
)

export const IconBell = createIcon(
    'IconBell',
    <>
        <path d="M15 13.5H5c.5-1 1.5-2.5 1.5-5a3.5 3.5 0 017 0c0 2.5 1 4 1.5 5z" />
        <path d="M8.5 16a1.5 1.5 0 003 0" />
    </>
)

export const IconCalendar = createIcon(
    'IconCalendar',
    <>
        <rect x="3" y="4" width="14" height="13" rx="2" />
        <path d="M3 8h14M7 2v4M13 2v4" />
    </>
)

export const IconSearch = createIcon(
    'IconSearch',
    <>
        <circle cx="9" cy="9" r="5.5" />
        <path d="M13.5 13.5L17.5 17.5" />
    </>
)

export const IconPlus = createIcon('IconPlus', <path d="M10 4v12M4 10h12" />)

export const IconMinus = createIcon('IconMinus', <path d="M4 10h12" />)

export const IconCopy = createIcon(
    'IconCopy',
    <>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M4 13V4.5A1.5 1.5 0 015.5 3H14" />
    </>
)

export const IconUpload = createIcon(
    'IconUpload',
    <path d="M10 13V3m0 0L6.5 6.5M10 3l3.5 3.5M3 14v1.5A1.5 1.5 0 004.5 17h11a1.5 1.5 0 001.5-1.5V14" />
)

export const IconEye = createIcon(
    'IconEye',
    <>
        <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" />
        <circle cx="10" cy="10" r="3" />
    </>
)

export const IconEyeOff = createIcon(
    'IconEyeOff',
    <path d="M3 3l14 14M8.5 8.7a3 3 0 004.2 4.2M2 10s3-6 8-6a7.8 7.8 0 014.5 1.4M18 10s-3 6-8 6a7.8 7.8 0 01-4.5-1.4" />
)

export const IconPlay = createIcon(
    'IconPlay',
    <polygon points="6,4 16,10 6,16" fill="currentColor" stroke="none" />
)

export const IconPause = createIcon(
    'IconPause',
    <>
        <rect x="5.5" y="4" width="3" height="12" rx="1" fill="currentColor" stroke="none" />
        <rect x="11.5" y="4" width="3" height="12" rx="1" fill="currentColor" stroke="none" />
    </>
)
