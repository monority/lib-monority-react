import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Field } from '@monority/ui/field'
import { Input } from '@monority/ui/input'
import { NumberInput } from '@monority/ui/number-input'
import { Select } from '@monority/ui/select'
import { Slider } from '@monority/ui/slider'
import { Stack } from '@monority/ui/stack'
import { Switch } from '@monority/ui/switch'
import { Textarea } from '@monority/ui/textarea'

export function FieldBasicExample() {
    return (
        <Field label="Workspace name">
            <Input defaultValue="Monority" />
        </Field>
    )
}

export function FieldWithHintExample() {
    return (
        <Field label="Deployment alias" hint="Use lowercase letters, numbers, and hyphens.">
            <Input defaultValue="design-system" />
        </Field>
    )
}

export function FieldWithErrorExample() {
    return (
        <Field label="Support email" error="Enter an email address with a valid domain.">
            <Input defaultValue="support@" aria-invalid />
        </Field>
    )
}

export function FieldRequiredExample() {
    return (
        <Field label="Project owner" required>
            <Input defaultValue="Avery Stone" required />
        </Field>
    )
}

export function FieldStandaloneExample() {
    return (
        <Field label="Release channel">
            <Input defaultValue="stable" />
        </Field>
    )
}

export function FieldWithSelectExample() {
    return (
        <Field
            label="Rôle dans l’espace"
            hint="Détermine le niveau d’accès aux déploiements et aux secrets."
            required
        >
            <Select defaultValue="developer">
                <Select.Option value="owner">Propriétaire (accès complet)</Select.Option>
                <Select.Option value="admin">Administrateur</Select.Option>
                <Select.Option value="developer">Développeur</Select.Option>
                <Select.Option value="viewer">Observateur (lecture seule)</Select.Option>
            </Select>
        </Field>
    )
}

export function FieldWithTextareaExample() {
    return (
        <Field
            label="Description du service"
            hint="Présentez les objectifs de ce composant et son périmètre fonctionnel."
        >
            <Textarea
                rows={3}
                placeholder="Microservice de gestion des profils et autorisations OAuth2..."
            />
        </Field>
    )
}

export function FieldWithNumberInputExample() {
    return (
        <Field
            label="Instances minimales"
            hint="Nombre d’instances actives maintenues en haute disponibilité."
            required
        >
            <NumberInput defaultValue={3} min={1} max={16} />
        </Field>
    )
}

export function FieldWithSliderExample() {
    return (
        <Field
            label="Seuil d’alerte de saturation CPU"
            hint="Déclenche une notification automatique dès que la consommation dépasse ce seuil."
        >
            <Slider defaultValue={75} min={10} max={100} step={5} />
        </Field>
    )
}

export function FieldWithSwitchExample() {
    return (
        <Field
            label="Déploiement continu"
            hint="Applique automatiquement chaque commit validé sur la branche de production."
        >
            <Switch label="Activer le déploiement continu" defaultChecked />
        </Field>
    )
}

export function FieldCompositionExample() {
    return (
        <Field>
            <Field.Label htmlFor="composed-input" required>
                Billing email
            </Field.Label>
            <Field.Content>
                <Input id="composed-input" type="email" defaultValue="billing@" aria-invalid />
            </Field.Content>
            <Field.Description>
                Invoices and tax receipts are sent to this address.
            </Field.Description>
            <Field.Error>Enter a complete email address.</Field.Error>
        </Field>
    )
}

export function FieldGroupExample() {
    return (
        <Field.Group direction="row">
            <Field label="First name" className="flex-1">
                <Input defaultValue="Maya" />
            </Field>
            <Field label="Last name" className="flex-1">
                <Input defaultValue="Chen" />
            </Field>
        </Field.Group>
    )
}

export function FieldSetExample() {
    return (
        <Field.Set>
            <Field.Legend required>Billing address</Field.Legend>
            <Field.Title>Company details</Field.Title>
            <Field label="Street">
                <Input defaultValue="24 Rue Lafayette" />
            </Field>
            <Field.Separator />
            <Field label="City">
                <Input defaultValue="Paris" />
            </Field>
        </Field.Set>
    )
}

export function FieldCompleteFormExample() {
    return (
        <Card data-padding="lg">
            <Card.Header>
                <Card.Title>Configuration du Service</Card.Title>
                <Card.Description>
                    Formulaire orchestré avec le composant Field combinant divers contrôles de
                    saisie.
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <Field
                        label="Identifiant de l’application"
                        hint="Nom technique unique en minuscules."
                        required
                    >
                        <Input defaultValue="auth-gateway-service" />
                    </Field>

                    <Field.Group direction="row">
                        <Field label="Environnement" required className="flex-1">
                            <Select defaultValue="staging">
                                <Select.Option value="production">Production</Select.Option>
                                <Select.Option value="staging">Staging</Select.Option>
                                <Select.Option value="development">Développement</Select.Option>
                            </Select>
                        </Field>

                        <Field label="Répliques" required className="flex-1">
                            <NumberInput defaultValue={2} min={1} max={8} />
                        </Field>
                    </Field.Group>

                    <Field
                        label="Politique de rétention des logs"
                        hint="Précisez la durée de conservation et les règles d’archivage."
                    >
                        <Textarea
                            rows={2}
                            defaultValue="Conservation 30 jours sur stockage froid S3 avec chiffrement KMS."
                        />
                    </Field>

                    <Field
                        label="Sécurité renforcée"
                        hint="Exige une double signature cryptographique pour chaque livraison."
                    >
                        <Switch
                            label="Activer la signature obligatoire des images"
                            defaultChecked
                        />
                    </Field>
                </Stack>
            </Card.Content>
            <Card.Footer>
                <Stack direction="horizontal" gap="sm">
                    <Button variant="primary">Enregistrer les paramètres</Button>
                    <Button variant="secondary">Annuler</Button>
                </Stack>
            </Card.Footer>
        </Card>
    )
}
