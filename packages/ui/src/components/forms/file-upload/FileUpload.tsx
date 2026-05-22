import { useId, useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { Field } from '@/components/forms/field/Field'
import type { InputHTMLAttributes } from 'react'
import './FileUpload.css'

function formatAccept(accept: string | undefined): string | undefined { if (!accept) return undefined; return accept.split(',').map((i) => i.trim()).filter(Boolean).join(', ') }

interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> { label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode; id?: string; className?: string; inputClassName?: string; required?: boolean; accept?: string; multiple?: boolean; actionLabel?: string; description?: React.ReactNode }

export function FileUpload({ label, hint, error, id, className, inputClassName, required = false, accept, multiple = false, actionLabel = 'Choisir un fichier', description, onChange, ...props }: FileUploadProps) {
  const [fileNames, setFileNames] = useState<string[]>([]); const generatedId = useId(); const inputId = id || generatedId
  const hintId = hint ? `${inputId}-hint` : undefined; const errorId = error ? `${inputId}-error` : undefined; const descriptionId = description ? `${inputId}-description` : undefined
  const describedBy = [descriptionId, hintId, errorId].filter(Boolean).join(' ') || undefined; const acceptedTypes = useMemo(() => formatAccept(accept), [accept])
  const fileSummary = fileNames.length ? fileNames.join(', ') : 'Aucun fichier selectionne'
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) { setFileNames([...(event.target.files || [])].map((f) => f.name)); onChange?.(event) }
  return <Field className={className} htmlFor={inputId} label={label} hint={hint} error={error} required={required} hintId={hintId} errorId={errorId}>
    <label className={cn('ui-file-upload', error ? 'ui-file-upload--error' : undefined)}>
      <span className="ui-file-upload__content"><span className="ui-file-upload__icon" aria-hidden="true">+</span><span className="ui-file-upload__body"><span className="ui-file-upload__action">{actionLabel}</span>{description ? <span className="ui-file-upload__description" id={descriptionId}>{description}</span> : null}{acceptedTypes ? <span className="ui-file-upload__meta">Formats: {acceptedTypes}</span> : null}<span className="ui-file-upload__meta" aria-live="polite">{fileSummary}</span></span></span>
      <input className={cn('ui-file-upload__input', inputClassName)} id={inputId} type="file" accept={accept} multiple={multiple} aria-invalid={Boolean(error)} aria-describedby={describedBy} required={required} onChange={handleChange} {...props} />
    </label>
  </Field>
}
