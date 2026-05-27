import { forwardRef, useId, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { cva } from '@/lib/variants'
import { Field } from '@/components/forms/field/Field'
import type { FileUploadProps } from './FileUpload.types'

const fileUploadVariants = cva({
  base: 'mr-file-upload',
  variants: {
    size: {
      sm: 'mr-file-upload--sm',
      md: 'mr-file-upload--md',
      lg: 'mr-file-upload--lg',
    },
  },
  defaultVariants: { size: 'md' },
})

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUpload(
    {
      size,
      label,
      hint,
      error,
      id,
      className,
      inputClassName,
      accept,
      placeholder,
      multiple,
      disabled = false,
      required = false,
      onChange,
      ...props
    },
    ref,
  ) {
    const [fileNames, setFileNames] = useState<string[]>([])
    const generatedId = useId()
    const inputId = id || generatedId
    const hintId = hint ? `${inputId}-hint` : undefined
    const errorId = error ? `${inputId}-error` : undefined
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
    const resolvedSize = size ?? 'md'
    const isInvalid = Boolean(error)

    const acceptString = useMemo(
      () => (Array.isArray(accept) ? accept.join(',') : accept),
      [accept],
    )

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const files = Array.from(event.target.files ?? [])
      setFileNames(files.map((f) => f.name))
      onChange?.(event)
    }

    return (
      <Field
        className={cn('mr-file-upload-field', className)}
        htmlFor={inputId}
        label={label}
        hint={hint}
        error={error}
        required={required}
        hintId={hintId}
        errorId={errorId}
      >
        <div className="mr-file-upload__dropzone">
          <input
            ref={ref}
            id={inputId}
            type="file"
            className={cn(
              fileUploadVariants({ size: resolvedSize }),
              disabled && 'mr-file-upload--disabled',
              isInvalid && 'mr-file-upload--error',
              inputClassName,
            )}
            accept={acceptString}
            multiple={multiple}
            disabled={disabled}
            required={required}
            aria-invalid={isInvalid || undefined}
            aria-describedby={describedBy}
            data-size={resolvedSize}
            data-disabled={disabled ? true : undefined}
            data-invalid={isInvalid ? true : undefined}
            data-required={required ? true : undefined}
            data-multiple={multiple ? true : undefined}
            onChange={handleChange}
            {...props}
          />
          <span className="mr-file-upload__label-text">
            {fileNames.length > 0 ? fileNames.join(', ') : (placeholder || 'Choose files...')}
          </span>
        </div>
        {fileNames.length > 0 ? (
          <div className="mr-file-upload__files" aria-live="polite">
            {fileNames.map((name, i) => (
              <span key={i} className="mr-file-upload__file">{name}</span>
            ))}
          </div>
        ) : null}
      </Field>
    )
  },
)

export type { FileUploadProps, FileUploadSize } from './FileUpload.types'
