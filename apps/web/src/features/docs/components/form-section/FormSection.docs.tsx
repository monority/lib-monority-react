import { DocPage, type DocPageData } from '../DocPage'
import { ComponentPlayground } from '../ComponentPlayground'
import { FormSection } from '@monority/ui/form-section'
import { Input } from '@monority/ui/input'
import { Button } from '@monority/ui/button'
import { Badge } from '@monority/ui/badge'
import {
    FormSectionBasicExample,
    FormSectionWithoutActionsExample,
    FormSectionWithMetaExample,
    FormSectionCompoundExample,
} from './FormSection.examples'

function FormSectionPlayground() {
    return (
        <ComponentPlayground
            title="FormSection"
            description="Ajustez les éléments d'en-tête (titre, description, badge meta) et la présence de la barre d'actions."
            controls={[
                {
                    type: 'text',
                    prop: 'title',
                    label: 'Titre de la section',
                    defaultValue: 'Paramètres de sécurité',
                },
                {
                    type: 'boolean',
                    prop: 'showMeta',
                    label: 'Afficher le badge méta',
                    defaultValue: true,
                },
                {
                    type: 'boolean',
                    prop: 'showActions',
                    label: 'Afficher les actions',
                    defaultValue: true,
                },
            ]}
            renderCode={(props) => `<FormSection
  title="${props.title}"
  description="Configurez les clés d'API et autorisations d'accès aux services."${props.showMeta ? '\n  meta={<Badge variant="default">Recommandé</Badge>}' : ''}${props.showActions ? '\n  actions={<Button variant="primary">Enregistrer</Button>}' : ''}
>
  <Input label="Clé API principale" defaultValue="pk_live_9482710394" />
</FormSection>`}
        >
            {(props) => (
                <div style={{ width: '100%', maxWidth: 520 }}>
                    <FormSection
                        title={props.title as string}
                        description="Configurez les clés d'API et autorisations d'accès aux services."
                        meta={
                            props.showMeta ? <Badge variant="default">Recommandé</Badge> : undefined
                        }
                        actions={
                            props.showActions ? (
                                <Button variant="primary" size="sm">
                                    Enregistrer
                                </Button>
                            ) : undefined
                        }
                    >
                        <Input label="Clé API principale" defaultValue="pk_live_9482710394" />
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
            description:
                "Navigue séquentiellement à travers les champs de saisie et les boutons d'action.",
        },
        {
            key: 'Enter',
            description:
                "Valide l'action de formulaire primaire lorsque le focus est sur un contrôle ou un bouton.",
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
}

export function FormSectionDocs() {
    return <DocPage doc={docData} />
}
