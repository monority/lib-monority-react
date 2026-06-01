import { forwardRef, useState, useCallback } from 'react'
import { cn } from '@/lib/cn'
import type { DropZoneProps } from './DropZone.types'

export const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  function DropZone({ onDrop, accept, multiple, disabled = false, children, className, ...props }, ref) {
    const [isDragging, setIsDragging] = useState(false)

    const isValidFile = useCallback((file: File) => {
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
    }, [accept])

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled) setIsDragging(true)
      },
      [disabled],
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
      [disabled, multiple, onDrop, isValidFile],
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
          className,
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
              📁
            </span>
            <span className="mr-drop-zone__text">Drag &amp; drop files here</span>
          </div>
        )}
      </div>
    )
  },
)

export type { DropZoneProps } from './DropZone.types'
