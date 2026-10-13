import { useState } from 'react'
import { Avatar, Badge, Button, Card, Select, Stack, Text, Toolbar } from '@monority/ui'

interface Member {
    name: string
    email: string
    role: string
    status: 'online' | 'offline'
}

const initialMembers: Member[] = [
    {
        name: 'Sofia Davis',
        email: 'sofia.davis@monority.dev',
        role: 'owner',
        status: 'online',
    },
    {
        name: 'Jackson Lee',
        email: 'jackson.lee@monority.dev',
        role: 'developer',
        status: 'online',
    },
    {
        name: 'Isabella Nguyen',
        email: 'isabella.n@monority.dev',
        role: 'viewer',
        status: 'offline',
    },
]

const roleOptions = [
    { value: 'owner', label: 'Owner' },
    { value: 'developer', label: 'Developer' },
    { value: 'billing', label: 'Billing' },
    { value: 'viewer', label: 'Viewer' },
]

export function MoodboardTeamModule() {
    const [members, setMembers] = useState<Member[]>(initialMembers)

    const handleRoleChange = (email: string, newRole: string) => {
        setMembers((prev) => prev.map((m) => (m.email === email ? { ...m, role: newRole } : m)))
    }

    return (
        <Card padding="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card.Header>
                <div>
                    <Card.Title>Team & Permissions</Card.Title>
                    <Card.Description>
                        Workspace members and role-based security privileges
                    </Card.Description>
                </div>
                <Badge variant="default" size="sm">
                    {members.length} Members
                </Badge>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-4)',
                }}
            >
                <Stack gap="sm">
                    {members.map((member) => (
                        <div
                            key={member.email}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-3)',
                                padding: 'var(--mr-space-1) 0',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--mr-space-3)',
                                    minWidth: 0,
                                }}
                            >
                                <Avatar name={member.name} status={member.status} size="sm" />
                                <div style={{ minWidth: 0 }}>
                                    <Text
                                        size="sm"
                                        style={{
                                            fontWeight: 600,
                                            display: 'block',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {member.name}
                                    </Text>
                                    <Text
                                        tone="muted"
                                        size="sm"
                                        style={{
                                            display: 'block',
                                            fontSize: '0.75rem',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {member.email}
                                    </Text>
                                </div>
                            </div>

                            <div style={{ width: '7.5rem', flexShrink: 0 }}>
                                <Select
                                    size="sm"
                                    value={member.role}
                                    onChange={(e) => handleRoleChange(member.email, e.target.value)}
                                    options={roleOptions}
                                    aria-label={`Role for ${member.name}`}
                                />
                            </div>
                        </div>
                    ))}
                </Stack>
            </Card.Content>

            <Card.Footer>
                <Toolbar>
                    <Button variant="primary" size="sm">
                        Invite Member
                    </Button>
                    <Button variant="ghost" size="sm">
                        Audit Policy
                    </Button>
                </Toolbar>
                <Text tone="muted" size="sm">
                    SSO & SAML active
                </Text>
            </Card.Footer>
        </Card>
    )
}
