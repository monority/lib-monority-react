import { PreCode } from '@monority/ui/pre-code'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import { PreCodeScrollExample, PreCodeSizesExample, PreCodeWrapExample } from './PreCode.examples'

const demoSnippet = `import { Button } from '@monority/ui/button'

export function App() {
  return (
    <Button variant="primary" size="md">
      Commander le composant
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
                    prop: 'size',
                    label: 'Taille (size)',
                    defaultValue: 'md',
                    options: [
                        { value: 'sm', label: 'Petite (sm)' },
                        { value: 'md', label: 'Moyenne (md)' },
                    ],
                },
                {
                    type: 'boolean',
                    prop: 'wrap',
                    label: 'Retour à la ligne (wrap)',
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
}

export function PreCodeDocs() {
    return <DocPage doc={docData} />
}
