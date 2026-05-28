import { forwardRef, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { InputBase } from '@/primitives/input-base'
import { Field } from '@/components/forms/field/Field'
import type { FileUploadProps } from './FileUpload.types'

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
      <FormControl id={id} hint={!!hint} error={!!error} disabled={disabled} required={required} size={size}>
        <Field className={cn('mr-file-upload-field', className)} label={label} hint={hint} error={error}>
          <div className="mr-file-upload__dropzone"
               data-invalid={isInvalid ? true : undefined}
               data-disabled={disabled ? true : undefined}>
            <InputBase
              as="input"
              ref={ref}
              type="file"
              className={cn('mr-file-upload', error ? 'mr-file-upload--error' : undefined, inputClassName)}
              accept={acceptString}
              multiple={multiple}
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
      </FormControl>
    )
  },
)

export type { FileUploadProps, FileUploadSize } from './FileUpload.types'
