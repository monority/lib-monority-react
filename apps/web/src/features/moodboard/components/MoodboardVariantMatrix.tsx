import { Badge } from '@monority/ui/badge'
import { Button } from '@monority/ui/button'
import { Card } from '@monority/ui/card'
import { Stack } from '@monority/ui/stack'

const buttonVariants = ['primary', 'secondary', 'ghost', 'danger'] as const
const badgeVariants = ['default', 'primary', 'success', 'warning', 'danger'] as const
const buttonSizes = ['sm', 'md', 'lg'] as const

export function MoodboardVariantMatrix() {
    return (
        <Card className="moodboard-card" padding="md">
            <Card.Header>
                <span className="moodboard-kicker">BUTTON VARIANTS</span>
            </Card.Header>
            <Card.Content>
                <Stack gap="md">
                    <div className="moodboard-button-row">
                        {buttonVariants.map((variant) => (
                            <Button key={variant} variant={variant} size="sm">
                                {variant}
                            </Button>
                        ))}
                        <Button size="sm" disabled>
                            disabled
                        </Button>
                        <Button size="sm" loading>
                            loading
                        </Button>
                    </div>

                    <span className="moodboard-kicker">BADGE VARIANTS</span>
                    <div className="moodboard-badge-row">
                        {badgeVariants.map((variant) => (
                            <Badge key={variant} variant={variant}>
                                {variant}
                            </Badge>
                        ))}
                    </div>

                    <span className="moodboard-kicker">SIZE LADDER</span>
                    <div className="moodboard-size-row">
                        {buttonSizes.map((size) => (
                            <Button key={size} size={size}>
                                Button {size}
                            </Button>
                        ))}
                    </div>
                </Stack>
            </Card.Content>
        </Card>
    )
}
