import { forwardRef, useState, useCallback } from 'react'
import { cn } from '@/lib/cn'
import { FormControl } from '@/primitives/form-control'
import { Field } from '@/components/forms/field/Field'
import { FileTrigger } from './FileTrigger'
import { DropZone } from './DropZone'
import { FileList } from './FileList'
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
      accept,
      placeholder,
      multiple = false,
      disabled = false,
      required = false,
      actionLabel,
      description,
    },
    ref,
  ) {
    const [files, setFiles] = useState<{ name: string; size: number; type: string }[]>([])

    const handleSelect = useCallback((selected: File[]) => {
      setFiles(selected.map((f) => ({ name: f.name, size: f.size, type: f.type })))
    }, [])

    const handleDrop = useCallback((dropped: File[]) => {
      setFiles(dropped.map((f) => ({ name: f.name, size: f.size, type: f.type })))
    }, [])

    const handleRemove = useCallback((index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index))
    }, [])

    return (
      <FormControl id={id} hint={!!hint} error={!!error} disabled={disabled} required={required} size={size}>
        <Field className={cn('mr-file-upload-field', className)} label={label} hint={hint} error={error}>
          <DropZone
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onDrop={handleDrop}
            className="mr-file-upload__dropzone"
          >
            <div className="mr-file-upload__content">
              {description && <span className="mr-file-upload__description">{description}</span>}
              {placeholder && <span className="mr-file-upload__placeholder">{placeholder}</span>}
              <FileTrigger
                ref={ref}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                required={required}
                onSelect={handleSelect}
              >
                {actionLabel ? (
                  <span className="mr-file-upload__action">{actionLabel}</span>
                ) : (
                  <span className="mr-file-upload__default-action">Choose files</span>
                )}
              </FileTrigger>
            </div>
          </DropZone>
          {files.length > 0 && (
            <FileList
              files={files}
              onRemove={handleRemove}
              disabled={disabled}
              className="mr-file-upload__files"
            />
          )}
        </Field>
      </FormControl>
    )
  },
)

export type { FileUploadProps, FileUploadSize } from './FileUpload.types'
