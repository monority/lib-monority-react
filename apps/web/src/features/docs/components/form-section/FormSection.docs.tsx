import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { FormSection } from '@monority/ui/form-section'
import { Input } from '@monority/ui/input'
import { useLocale } from '../../../../shared/i18n'
import { ComponentPlayground } from '../ComponentPlayground'
import { DocPage, type DocPageData } from '../DocPage'
import {
    FormSectionCompoundExample,
    FormSectionWithMetaExample,
    FormSectionWithoutActionsExample,
} from './FormSection.examples'
import { formSectionI18n } from './FormSection.messages'

function FormSectionPlayground() {
    const { locale } = useLocale()
    const isFr = locale === 'fr'

    const titleDefault = isFr ? 'Paramètres de sécurité' : 'Security settings'
    const descText = isFr
        ? 'Configurez les clés d’API et autorisations d’accès aux services.'
        : 'Configure API keys and access permissions for services.'
    const metaLabel = isFr ? 'Recommandé' : 'Recommended'
    const actionLabel = isFr ? 'Enregistrer' : 'Save changes'
    const inputLabel = isFr ? 'Clé API principale' : 'Primary API key'

    return (
        <ComponentPlayground
            componentName="FormSection"
            controls={[
                {
                    type: 'text',
                    prop: 'title',
                    label: isFr ? 'Titre de la section' : 'Section title',
                    defaultValue: titleDefault,
                },
                {
                    type: 'boolean',
                    prop: 'showMeta',
                    label: isFr ? 'Afficher le badge méta' : 'Show meta badge',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'showActions',
                    label: isFr ? 'Afficher les actions' : 'Show actions',
                    defaultValue: true,
                },
            ]}
            renderCode={(props) => `<FormSection
  title="${props.title}"
  description="${descText}"${props.showMeta ? `\n  meta={<Badge variant="default">${metaLabel}</Badge>}` : ''}${props.showActions ? `\n  actions={<Button variant="primary">${actionLabel}</Button>}` : ''}
>
  <Input label="${inputLabel}" defaultValue="pk_live_9482710394" />
</FormSection>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 520 }}>
                    <FormSection
                        title={props.title as string}
                        description={descText}
                        meta={
                            props.showMeta ? (
                                <Badge variant="default">{metaLabel}</Badge>
                            ) : undefined
                        }
                        actions={
                            props.showActions ? (
                                <Button variant="primary" size="sm">
                                    {actionLabel}
                                </Button>
                            ) : undefined
                        }
                    >
                        <Input label={inputLabel} defaultValue="pk_live_9482710394" />
                    </FormSection>
                </div>
            )}
        </ComponentPlayground>
    )
}

const docData: DocPageData = {
    title: 'FormSection',
    description:
        'A grouped form panel with header context, optional metadata, and a dedicated action row.',
    importCode: "import { FormSection } from '@monority/ui/form-section'",
    usageCode: `<FormSection
  title="Project details"
  description="Set the name and summary used across docs, releases, and internal references."
  actions={<Button>Save changes</Button>}
>
  <Input label="Project name" placeholder="Monority Core" />
  <Textarea
    label="Summary"
    placeholder="Short description for changelogs and overview pages."
    rows={4}
  />
</FormSection>`,
    playground: <FormSectionPlayground />,
    preview: () => <FormSectionPlayground />,
    examples: [
        {
            title: 'Compound composition',
            content: <FormSectionCompoundExample />,
            code: `<FormSection>
  <FormSection.Header>
    <FormSection.Title>Security credentials</FormSection.Title>
    <FormSection.Description>Configure multi-factor tokens and session expiration limits.</FormSection.Description>
    <FormSection.Meta>
      <Badge variant="default">Encrypted</Badge>
    </FormSection.Meta>
  </FormSection.Header>
  <FormSection.Body>
    <Input label="Session timeout (hours)" defaultValue="24" />
    <Input label="Allowed IP ranges" placeholder="10.0.0.0/8" />
  </FormSection.Body>
  <FormSection.Footer>
    <Button variant="secondary">Reset</Button>
    <Button>Save policy</Button>
  </FormSection.Footer>
</FormSection>`,
        },
        {
            title: 'Without actions',
            content: <FormSectionWithoutActionsExample />,
            code: `<FormSection
  title="Environment"
  description="Reference values inherited from workspace configuration."
>
  <Input label="Registry" value="npmjs.org" disabled />
</FormSection>`,
        },
        {
            title: 'With meta',
            content: <FormSectionWithMetaExample />,
            code: `<FormSection
  title="Billing contact"
  description="Choose who receives invoices and renewal reminders."
  meta={<Badge variant="secondary">Required</Badge>}
  actions={<Button variant="secondary">Update contact</Button>}
>
  <Input label="Contact name" placeholder="Jane Doe" />
</FormSection>`,
        },
    ],
    props: [
        {
            name: 'title',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Section title.',
        },
        {
            name: 'description',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Section description.',
        },
        {
            name: 'meta',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Metadata rendered alongside the header.',
        },
        {
            name: 'actions',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Action row rendered below the form content.',
        },
        {
            name: 'children',
            type: `ReactNode`,
            defaultValue: '-',
            description: 'Form fields.',
        },
    ],
    keyboardNavigation: [
        {
            key: 'Tab / Shift + Tab',
            action: 'Navigates sequentially through input fields and action buttons.',
            context: 'Form section',
        },
        {
            key: 'Enter',
            action: 'Submits primary form action when focused on a control or button.',
            context: 'Form section',
        },
    ],
    cssHooks: [
        '.mr-form-section',
        '.mr-form-section__header',
        '.mr-form-section__header-text',
        '.mr-form-section__header-title',
        '.mr-form-section__header-description',
        '.mr-form-section__header-meta',
        '.mr-form-section__body',
        '.mr-form-section__footer',
        '[data-mr-form-section]',
        '[data-has-actions]',
    ],
    tokens: ['--mr-space-4', '--mr-space-5', '--mr-border-subtle', '--mr-bg-raised'],
    a11y: [
        'Title renders as h3 for proper heading hierarchy.',
        'Grouped actions stay in a consistent footer region.',
        'Keyboard behavior relies on native form controls inside the section.',
    ],
    i18n: formSectionI18n,
}

export function FormSectionDocs() {
    return <DocPage doc={docData} />
}
