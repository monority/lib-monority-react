import { forwardRef, useImperativeHandle, useRef, useCallback, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useFormControl } from '@/primitives/form-control'
import type { FileTriggerProps } from './FileTrigger.types'

export const FileTrigger = forwardRef<HTMLInputElement, FileTriggerProps>(
  function FileTrigger(
    {
      accept,
      id,
      multiple = false,
      onSelect,
      directory = false,
      disabled = false,
      required = false,
      children,
      className,
      ...props
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null)
    const ctx = useFormControl()
    const resolvedId = id ?? ctx.inputId

    useImperativeHandle(ref, () => inputRef.current!, [])

    const handleClick = useCallback(() => {
      if (disabled) return
      inputRef.current?.click()
    }, [disabled])

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? [])
        onSelect?.(files)
        // Reset so the same file can be selected again
        e.target.value = ''
      },
      [onSelect],
    )

    const acceptString = Array.isArray(accept) ? accept.join(',') : accept

    return (
      <>
        <input
           ref={inputRef}
           id={resolvedId}
           type="file"
          accept={acceptString}
          multiple={multiple}
          disabled={disabled}
          required={required}
          {...(directory ? { webkitdirectory: '' as unknown as string } : {})}
          onChange={handleChange}
          className="mr-file-trigger__input"
           tabIndex={-1}
           aria-hidden="true"
           {...props}
        />
        {children ? (
          <span
            onClick={handleClick}
            className={cn('mr-file-trigger', className)}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled || undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleClick()
              }
            }}
          >
            {children}
          </span>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={handleClick}
            className={cn('mr-file-trigger mr-file-trigger--default', className)}
          >
            Choose file
          </button>
        )}
      </>
    )
  },
)

export type { FileTriggerProps } from './FileTrigger.types'
