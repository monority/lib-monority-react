import { describe, expect, it } from 'vitest'

// Type smoke tests: compile-time contracts that prevent accidental API breakage.
// These are zero-runtime-cost guards — if the types break, this file won't compile.

import type { AccordionProps } from '@monority/ui/accordion'
import type { AvatarProps } from '@monority/ui/avatar'
import type { BadgeProps } from '@monority/ui/badge'
import type { ButtonProps, ButtonVariant } from '@monority/ui/button'
import type { CheckboxProps } from '@monority/ui/checkbox'
import type { DatePickerProps } from '@monority/ui/date-picker'
import type { FieldProps } from '@monority/ui/field'
import type { FileTriggerProps, FileUploadProps } from '@monority/ui/file-upload'
import type { InputProps } from '@monority/ui/input'
import type { ModalProps } from '@monority/ui/modal'
import type { ProgressProps } from '@monority/ui/progress'
import type { RadioGroupProps } from '@monority/ui/radio-group'
import type { SelectProps } from '@monority/ui/select'
import type { SliderProps } from '@monority/ui/slider'
import type { SwitchProps } from '@monority/ui/switch'
import type { TabsProps } from '@monority/ui/tabs'
import type { TextareaProps } from '@monority/ui/textarea'
import type { ToastProps } from '@monority/ui/toast'

describe('Type smoke · public types remain importable and well-shaped', () => {
    it('ButtonProps has expected shape', () => {
        const _p: ButtonProps = { variant: 'ghost', size: 'md' }
        expect(typeof _p.variant).toBe('string')
    })

    it('ButtonVariant is a finite union', () => {
        const v: ButtonVariant = 'primary'
        const known = ['primary', 'ghost', 'subtle', 'danger', 'secondary', 'muted', 'warning']
        expect(known.includes(v)).toBe(true)
    })

    it('InputProps accepts label/hint/error as ReactNode', () => {
        const _p: InputProps = { label: 'Email', hint: 'Required', error: 'Invalid' }
        expect(_p.label).toBeDefined()
    })

    it('SliderProps has numeric value/defaultValue/onValueChange', () => {
        const _p: SliderProps = { value: 50, defaultValue: 0, onValueChange: () => {} }
        expect(typeof _p.value).toBe('number')
    })

    it('AccordionProps accepts items array', () => {
        const _p: AccordionProps = { items: [{ value: 'a', title: 'T', content: 'C' }] }
        expect(_p.items!.length).toBe(1)
    })

    it('ModalProps requires open and onClose', () => {
        const _p: ModalProps = { open: true, title: 'T', onClose: () => {} }
        expect(_p.open).toBe(true)
    })

    it('TabsProps requires items array', () => {
        const _p: TabsProps = { items: [{ value: 'a', label: 'A' }] }
        expect(_p.items.length).toBe(1)
    })

    it('CheckboxProps has checked/defaultChecked/indeterminate', () => {
        const _p: CheckboxProps = { checked: true, indeterminate: false }
        expect(_p.checked).toBe(true)
    })

    it('SwitchProps has checked/defaultChecked', () => {
        const _p: SwitchProps = { checked: false }
        expect(_p.checked).toBe(false)
    })

    it('RadioGroupProps has items/value/onChange and density', () => {
        const _p: RadioGroupProps = {
            size: 'lg',
            items: [{ value: 'a', label: 'A' }],
            onChange: () => {},
        }
        expect(_p.items!.length).toBe(1)
        expect(_p.size).toBe('lg')
    })

    it('DatePickerProps accepts null for controlled clearing', () => {
        const _p: DatePickerProps = { value: null, onChange: () => {} }
        expect(_p.value).toBeNull()
    })

    it('FieldProps accepts a label ID', () => {
        const _p: FieldProps = { label: 'Choice', labelId: 'choice-label' }
        expect(_p.labelId).toBe('choice-label')
    })

    it('FileUploadProps accepts controlled files, native name, and invalid state', () => {
        const _p: FileUploadProps = {
            files: [],
            name: 'attachments',
            invalid: true,
            onFilesChange: () => {},
        }
        expect(Array.isArray(_p.files)).toBe(true)
        expect(_p.name).toBe('attachments')
    })

    it('FileTriggerProps preserves native onChange and name', () => {
        const _p: FileTriggerProps = { name: 'attachments', onChange: () => {} }
        expect(_p.name).toBe('attachments')
    })

    it('SelectProps has label', () => {
        const _p: SelectProps = { label: 'Country' }
        expect(_p.label).toBe('Country')
    })

    it('TextareaProps has resize option', () => {
        const _p: TextareaProps = { resize: 'vertical' }
        expect(_p.resize).toBe('vertical')
    })

    it('ProgressProps accepts value', () => {
        const _p: ProgressProps = { value: 42 }
        expect(_p.value).toBe(42)
    })

    it('AvatarProps accepts name/size', () => {
        const _p: AvatarProps = { name: 'Maya Chen', size: 'lg' }
        expect(_p.name).toBe('Maya Chen')
    })

    it('BadgeProps has variant union', () => {
        const _p: BadgeProps = { variant: 'success' }
        expect(_p.variant).toBe('success')
    })

    it('ToastProps has tone union', () => {
        const _p: ToastProps = { tone: 'danger' }
        expect(_p.tone).toBe('danger')
    })
})
