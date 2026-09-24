import { forwardRef, useCallback, useRef, useState } from 'react'
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
      files: controlledFiles,
      onFilesChange,
    },
    ref,
  ) {
    const [internalFiles, setInternalFiles] = useState<File[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isControlled = controlledFiles !== undefined
    const files = controlledFiles ?? internalFiles
    const resolvedSize = size ?? 'md'

    const updateFiles = useCallback(
      (nextFiles: File[]) => {
        if (!isControlled) setInternalFiles(nextFiles)
        onFilesChange?.(nextFiles)
      },
      [isControlled, onFilesChange],
    )

    const handleRemove = useCallback(
      (index: number) => {
        updateFiles(files.filter((_, fileIndex) => fileIndex !== index))
      },
      [files, updateFiles],
    )

    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    const handleZoneClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || (event.target as HTMLElement).closest('.mr-file-trigger')) return
        inputRef.current?.click()
      },
      [disabled],
    )

    return (
      <FormControl id={id} hint={hint != null} error={error != null} disabled={disabled} required={required} size={resolvedSize}>
        <Field className={cn('mr-file-upload-field', className)} label={label} hint={hint} error={error}>
          <DropZone
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onDrop={updateFiles}
            onClick={handleZoneClick}
            className="mr-file-upload__dropzone"
            data-size={resolvedSize}
          >
            <div className="mr-file-upload__content">
              {description != null ? <span className="mr-file-upload__description">{description}</span> : null}
              {placeholder != null && files.length === 0 ? (
                <span className="mr-file-upload__placeholder">{placeholder}</span>
              ) : null}
              <FileTrigger
                 ref={setInputRef}
                id={id}
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                required={required && files.length === 0}
                onSelect={updateFiles}
              >
                 {actionLabel != null ? (
                   <span className="mr-file-upload__action">{actionLabel}</span>
                ) : (
                  <span className="mr-file-upload__default-action">Choose files</span>
                )}
              </FileTrigger>
            </div>
          </DropZone>
          {files.length > 0 ? (
            <FileList
              files={files}
              onRemove={handleRemove}
              disabled={disabled}
              className="mr-file-upload__files"
            />
          ) : null}
        </Field>
      </FormControl>
    )
  },
)

export type { FileUploadProps, FileUploadSize } from './FileUpload.types'
