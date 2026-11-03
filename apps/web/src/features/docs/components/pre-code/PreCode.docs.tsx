import { PreCode } from '@monority/ui/pre-code'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { preCodeI18n } from './PreCode.messages'
import { PreCodeScrollExample, PreCodeSizesExample, PreCodeWrapExample } from './PreCode.examples'

const demoSnippet = `import { Button } from '@monority/ui/button'

export function App() {
  return (
    <Button variant="primary" size="md">
      Order component
    </Button>
  )
}`

function PreCodePlayground() {
    return (
        <ComponentPlayground
            componentName="PreCode"
            controls={[
                {
                    type: 'select',
                    name: 'size',
                    prop: 'size',
                    label: 'Size',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Small (sm)' },
                        { value: 'md', label: 'Medium (md)' },
                    ],
                },
                {
                    type: 'boolean',
                    name: 'wrap',
                    prop: 'wrap',
                    label: 'Line wrap (wrap)',
                    defaultValue: false,
                },
            ]}
            renderCode={(props) => `<PreCode
  language="tsx"
  size="${props.size}"${props.wrap ? '\n  wrap' : ''}
>
  {\`${demoSnippet}\`}
</PreCode>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 540 }}>
                    <PreCode
                        language="tsx"
                        size={props.size as 'sm' | 'md'}
                        wrap={props.wrap as boolean}
                    >
                        {demoSnippet}
                    </PreCode>
                </div>
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'PreCode',
    description:
        'Preformatted code block with horizontal scrolling, optional wrapping, and readable theme-aware syntax colors.',
    importCode: "import { PreCode } from '@monority/ui/pre-code'",
    usageCode: `<PreCode language="tsx">const value = 1</PreCode>`,
    playground: <PreCodePlayground />,
    preview: () => <PreCodePlayground />,
    examples: [
        { title: 'Sizes', content: <PreCodeSizesExample /> },
        { title: 'Horizontal scrolling', content: <PreCodeScrollExample /> },
        { title: 'Wrapping', content: <PreCodeWrapExample /> },
    ],
    props: [
        {
            name: 'children',
            type: 'ReactNode',
            defaultValue: '-',
            description: 'Code text.',
        },
        {
            name: 'language',
            type: 'string',
            defaultValue: '-',
            description: 'Language hint, applied as a language-* class on <code>.',
        },
        {
            name: 'size',
            type: "'sm' | 'md'",
            defaultValue: "'md'",
            description: 'Code block size.',
        },
        {
            name: 'wrap',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Wrap long lines instead of scrolling.',
        },
        {
            name: 'codeClassName',
            type: 'string',
            defaultValue: '-',
            description: 'Additional class for the inner <code> element.',
        },
    ],
    cssHooks: ['.mr-pre-code', '[data-size]', '[data-wrap]'],
    tokens: [
        '--mr-font-family-mono',
        '--mr-font-size-sm',
        '--mr-space-3',
        '--mr-space-4',
        '--mr-radius-lg',
        '--mr-bg-sunken',
        '--mr-border-subtle',
        '--mr-text-primary',
    ],
    a11y: [
        'Renders native <pre><code> markup.',
        'Default mode scrolls long lines horizontally without widening the page.',
        'Use wrap when line wrapping is preferred.',
    ],
    i18n: preCodeI18n,
}

export function PreCodeDocs() {
    return <DocPage doc={docData} />
}
