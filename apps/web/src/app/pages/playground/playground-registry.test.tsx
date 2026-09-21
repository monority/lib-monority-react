import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getPlaygroundDefinition, playgroundRegistry } from './playground-registry'
import { PlaygroundControls } from './PlaygroundControls'
import type { PlaygroundProps } from './playground-types'

describe('playground registry', () => {
    it('exposes stable components with unique slugs', () => {
        expect(playgroundRegistry.length).toBeGreaterThanOrEqual(18)
        const slugs = playgroundRegistry.map((item) => item.slug)
        expect(new Set(slugs).size).toBe(slugs.length)
        for (const item of playgroundRegistry) {
            expect(item.docsPath).toBe(`/docs/${item.slug}`)
            expect(item.importStatement).toContain('@monority/ui/')
        }
    })

    it('declares controls that exist in defaultProps', () => {
        for (const item of playgroundRegistry) {
            const controlNames = item.controls.map((control) => control.name)
            expect(new Set(controlNames).size).toBe(controlNames.length)
            for (const name of controlNames) {
                expect(
                    Object.hasOwn(item.defaultProps, name),
                    `${item.slug}: control "${name}" missing from defaultProps`
                ).toBe(true)
            }
        }
    })

    it('renders every default preview without crashing', () => {
        for (const item of playgroundRegistry) {
            const { container, unmount } = render(<>{item.render({ ...item.defaultProps })}</>)
            expect(container.querySelector('*'), `${item.slug} renders nothing`).not.toBeNull()
            unmount()
        }
    })

    it('generates non-trivial synchronized code per component', () => {
        for (const item of playgroundRegistry) {
            const code = item.generateCode({ ...item.defaultProps })
            expect(code.length, `${item.slug}: empty code`).toBeGreaterThan(10)
            expect(code, `${item.slug}: code missing import usage`).toContain(item.label)
        }
    })

    it('getPlaygroundDefinition falls back to the first entry', () => {
        expect(getPlaygroundDefinition('button').slug).toBe('button')
        expect(getPlaygroundDefinition('nope').slug).toBe(playgroundRegistry[0]!.slug)
    })
})

describe('PlaygroundControls', () => {
    it('forwards boolean toggles with the flipped value', () => {
        const definition = getPlaygroundDefinition('button')
        const values: PlaygroundProps = { ...definition.defaultProps }
        const onChange = vi.fn()
        const onReset = vi.fn()
        render(
            <PlaygroundControls
                slug={definition.slug}
                controls={definition.controls}
                values={values}
                onChange={onChange}
                onReset={onReset}
            />
        )
        fireEvent.click(screen.getByLabelText('disabled'))
        expect(onChange).toHaveBeenCalledWith('disabled', true)
        fireEvent.click(screen.getByText('Reset'))
        expect(onReset).toHaveBeenCalledTimes(1)
    })

    it('forwards select and text changes', () => {
        const definition = getPlaygroundDefinition('badge')
        const values: PlaygroundProps = { ...definition.defaultProps }
        const onChange = vi.fn()
        render(
            <PlaygroundControls
                slug={definition.slug}
                controls={definition.controls}
                values={values}
                onChange={onChange}
                onReset={() => {}}
            />
        )
        fireEvent.change(screen.getByLabelText('variant'), { target: { value: 'danger' } })
        expect(onChange).toHaveBeenCalledWith('variant', 'danger')
        fireEvent.change(screen.getByLabelText('children'), { target: { value: 'Hello' } })
        expect(onChange).toHaveBeenCalledWith('children', 'Hello')
    })
})
