import { useState } from 'react'
import { Button } from '@monority/ui/button'
import { Callout } from '@monority/ui/callout'
import { Card } from '@monority/ui/card'
import { Modal } from '@monority/ui/modal'

export function FeedbackComposition() {
    const [open, setOpen] = useState(false)
    const [confirmed, setConfirmed] = useState(false)

    return (
        <div className="sc-feedback">
            <Callout
                tone="info"
                title="Deploy scheduled"
                description="Version 0.4.1 ships to production tonight at 22:00 UTC."
            />
            <Callout
                tone="warning"
                title="Review redirect rules"
                description="Three legacy routes still point to the old docs navigation."
            />
            {confirmed && (
                <Callout
                    tone="success"
                    title="Release confirmed"
                    description="The changelog is now visible to every workspace member."
                />
            )}
            <Card padding="md">
                <div className="sc-activity__row">
                    <div>
                        <strong>Publish the release?</strong>
                        <p className="sc-muted">
                            This opens a confirmation dialog built with Modal.
                        </p>
                    </div>
                    <Button onClick={() => setOpen(true)}>Review</Button>
                </div>
            </Card>
            <Modal open={open} title="Publish release 0.4.1?" onClose={() => setOpen(false)}>
                <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Publishing makes the new components visible in the docs and the changelog.
                </p>
                <div className="sc-form__actions">
                    <Button variant="secondary" onClick={() => setOpen(false)}>
                        Keep editing
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(false)
                            setConfirmed(true)
                        }}
                    >
                        Publish
                    </Button>
                </div>
            </Modal>
        </div>
    )
}
