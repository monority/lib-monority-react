import { cn } from '@/lib/cn'
import { useCallback, useState } from 'react'
import type { DropZoneProps } from './DropZone.types'

function FolderIcon() {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
    )
}

export function DropZone({
    ref,
    onDrop,
    accept,
    multiple,
    disabled = false,
    children,
    className,
    ...props
}: DropZoneProps) {
    const [isDragging, setIsDragging] = useState(false)

    const isValidFile = useCallback(
        (file: File) => {
            if (!accept) return true
            const acceptList = Array.isArray(accept) ? accept : accept.split(',')
            const fileExt = '.' + file.name.split('.').pop()?.toLowerCase()
            const fileType = file.type.toLowerCase()
            return acceptList.some((a) => {
                const t = a.trim().toLowerCase()
                if (t === fileType || t === fileExt) return true
                // Handle wildcards like image/*
                if (t.endsWith('/*')) {
                    const category = t.split('/')[0]
                    return fileType.startsWith(category + '/')
                }
                return false
            })
        },
        [accept]
    )

    const handleDragOver = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (!disabled) setIsDragging(true)
        },
        [disabled]
    )

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)

            if (disabled) return

            const fileList = e.dataTransfer.files
            if (!fileList || fileList.length === 0) return

            let files = Array.from(fileList)
            if (!multiple) files = files.slice(0, 1)
            // Optionally filter by accept
            if (accept) files = files.filter((f) => isValidFile(f))
            onDrop?.(files)
        },
        [disabled, multiple, onDrop, isValidFile]
    )

    return (
        <div
            ref={ref}
            role="region"
            aria-label="Drop zone"
            aria-disabled={disabled || undefined}
            data-dragging={isDragging || undefined}
            data-disabled={disabled || undefined}
            className={cn(
                'mr-drop-zone',
                isDragging && 'mr-drop-zone--dragover',
                disabled && 'mr-drop-zone--disabled',
                className
            )}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            {...props}
        >
            {children || (
                <div className="mr-drop-zone__placeholder">
                    <span className="mr-drop-zone__icon" aria-hidden="true">
                        <FolderIcon />
                    </span>
                    <span className="mr-drop-zone__text">Drag &amp; drop files here</span>
                </div>
            )}
        </div>
    )
}

export type { DropZoneProps } from './DropZone.types'
