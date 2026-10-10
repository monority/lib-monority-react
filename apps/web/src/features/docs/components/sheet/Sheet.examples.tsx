import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Sheet } from '@monority/ui/sheet'
import { Input } from '@monority/ui/input'
import { Stack } from '@monority/ui/stack'

export function SheetBasicExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>Ouvrir le volet d'edition</Button>
            <Sheet
                open={open}
                title="Edition du profil"
                description="Modifiez vos informations d'utilisateur puis enregistrez."
                onClose={() => setOpen(false)}
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={() => setOpen(false)}>
                            Enregistrer
                        </Button>
                    </>
                }
            >
                <Stack gap="md">
                    <label>
                        <span>Nom complet</span>
                        <Input defaultValue="Alexandre Martin" />
                    </label>
                    <label>
                        <span>Adresse courriel</span>
                        <Input defaultValue="alexandre@monority.dev" type="email" />
                    </label>
                </Stack>
            </Sheet>
        </>
    )
}

export function SheetSidesExample() {
    const [side, setSide] = useState<'right' | 'left' | 'top' | 'bottom' | null>(null)

    return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Button variant="secondary" onClick={() => setSide('left')}>
                Cote gauche (left)
            </Button>
            <Button variant="secondary" onClick={() => setSide('right')}>
                Cote droit (right)
            </Button>
            <Button variant="secondary" onClick={() => setSide('top')}>
                Haut (top)
            </Button>
            <Button variant="secondary" onClick={() => setSide('bottom')}>
                Bas (bottom)
            </Button>

            {side ? (
                <Sheet
                    open={Boolean(side)}
                    side={side}
                    title={`Volet ancre : ${side}`}
                    description={`Ce volet s'ouvre et s'anime depuis le bord ${side}.`}
                    onClose={() => setSide(null)}
                >
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                        Le positionnement adapte les animations d'entree et de sortie ainsi que les
                        bordures de maniere fluide selon les dimensions de l'ecran.
                    </p>
                </Sheet>
            ) : null}
        </div>
    )
}

export function SheetCompoundExample() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="secondary" onClick={() => setOpen(true)}>
                Mode compose (Sheet.Header, Sheet.Body...)
            </Button>
            <Sheet open={open} onClose={() => setOpen(false)}>
                <Sheet.Header>
                    <Sheet.Title>Filtres avances</Sheet.Title>
                    <Sheet.Description>
                        Affinez les donnees selon plusieurs criteres.
                    </Sheet.Description>
                </Sheet.Header>
                <Sheet.Body>
                    <p style={{ margin: 0, lineHeight: 1.6 }}>
                        L'API composee permet d'inserer des sous-elements personnalises avec une
                        granularite maximale.
                    </p>
                </Sheet.Body>
                <Sheet.Footer>
                    <Button variant="primary" onClick={() => setOpen(false)}>
                        Appliquer les filtres
                    </Button>
                </Sheet.Footer>
            </Sheet>
        </>
    )
}
