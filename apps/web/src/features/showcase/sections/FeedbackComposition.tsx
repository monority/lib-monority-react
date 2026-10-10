import { useState } from 'react'
import { useToast } from '@monority/ui'
import { Button } from '@monority/ui/button'
import { Callout } from '@monority/ui/callout'
import { Card } from '@monority/ui/card'
import { InputOTP } from '@monority/ui/input-otp'
import { Modal } from '@monority/ui/modal'
import { Rating } from '@monority/ui/rating'
import { Stack } from '@monority/ui/stack'

export function FeedbackComposition() {
    const [open, setOpen] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [otpCode, setOtpCode] = useState('123456')
    const [rating, setRating] = useState(5)
    const { pushToast } = useToast()

    return (
        <Stack gap="md">
            <Callout
                tone="info"
                title="Deploiement planifie"
                description="La version 0.4.1 sera synchronisee sur les serveurs a 22:00 UTC."
            />
            <Callout
                tone="warning"
                title="Regles de redirection"
                description="Trois anciennes routes de documentation redirigent vers la racine."
            />
            {confirmed && (
                <>
                    <Callout
                        tone="success"
                        title="Publication validee avec succes"
                        description="Le journal des modifications et les 5 nouveaux composants sont en ligne."
                    />
                    <Card padding="md">
                        <Stack gap="sm">
                            <strong>Evaluation de l experience de publication</strong>
                            <p className="sc-muted">
                                Notez la fluidite du processus de deploiement continu :
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Rating value={rating} onChange={setRating} />
                                <span
                                    style={{
                                        fontSize: 'var(--mr-text-sm)',
                                        color: 'var(--mr-fg-muted)',
                                    }}
                                >
                                    {rating} / 5 etoiles
                                </span>
                            </div>
                        </Stack>
                    </Card>
                </>
            )}
            <Card padding="md">
                <div className="sc-activity__row">
                    <div>
                        <strong>Confirmer la publication 0.4.1</strong>
                        <p className="sc-muted">
                            Cette action requiert une validation par code 2FA via InputOTP.
                        </p>
                    </div>
                    <Button onClick={() => setOpen(true)}>Verifier & publier</Button>
                </div>
            </Card>

            <Modal
                open={open}
                title="Confirmer le deploiement 0.4.1"
                onClose={() => setOpen(false)}
            >
                <Stack gap="md">
                    <p style={{ margin: 0, lineHeight: 'var(--mr-leading-relaxed)' }}>
                        Veuillez renseigner votre code d authentification a 6 chiffres pour valider
                        l operation :
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '0.5rem 0',
                        }}
                    >
                        <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} />
                    </div>
                    <div className="sc-form__actions">
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button
                            disabled={otpCode.length < 6}
                            onClick={() => {
                                setOpen(false)
                                setConfirmed(true)
                                pushToast({
                                    title: 'Publication confirmee',
                                    description:
                                        'Le code 2FA a ete accepte et la version est en ligne.',
                                    tone: 'success',
                                })
                            }}
                        >
                            Publier maintenant
                        </Button>
                    </div>
                </Stack>
            </Modal>
        </Stack>
    )
}
