import { cn } from '@/lib/cn'
import type { FileListProps } from './FileList.types'

function FileIcon() {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}

function RemoveIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
        >
            <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
    )
}

function formatSize(bytes?: number): string {
    if (bytes === undefined || bytes < 0) return ''
    if (bytes === 0) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const clamped = Math.min(i, units.length - 1)
    return `${(bytes / 1024 ** clamped).toFixed(clamped === 0 ? 0 : 1)} ${units[clamped]}`
}

export function FileList({
    files,
    onRemove,
    showSize = true,
    showRemove = true,
    disabled = false,
    className,
}: FileListProps) {
    if (!files || files.length === 0) return null

    return (
        <div className={cn('mr-file-list', className)} role="list" aria-label="Selected files">
            {files.map((file, i) => (
                <div key={`${file.name}-${i}`} className="mr-file-list__item" role="listitem">
                    <span className="mr-file-list__icon" aria-hidden="true">
                        <FileIcon />
                    </span>
                    <div className="mr-file-list__info">
                        <span className="mr-file-list__name">{file.name}</span>
                        {showSize && file.size !== undefined && (
                            <span className="mr-file-list__size">{formatSize(file.size)}</span>
                        )}
                    </div>
                    {showRemove && !disabled && (
                        <button
                            type="button"
                            onClick={() => onRemove?.(i)}
                            className="mr-file-list__remove"
                            aria-label={`Remove ${file.name}`}
                        >
                            <RemoveIcon />
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}

export type { FileListProps, FileListItem } from './FileList.types'
