import { cn } from '@/lib/cn'
import type { FileListProps } from './FileList.types'

function formatSize(bytes?: number): string {
  if (bytes === undefined || bytes < 0) return ''
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const clamped = Math.min(i, units.length - 1)
  return `${(bytes / Math.pow(1024, clamped)).toFixed(clamped === 0 ? 0 : 1)} ${units[clamped]}`
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
          <span className="mr-file-list__icon" aria-hidden="true">📄</span>
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
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export type { FileListProps, FileListItem } from './FileList.types'
