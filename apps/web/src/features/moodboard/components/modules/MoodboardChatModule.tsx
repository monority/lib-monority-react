import { Avatar, Badge, Button, Card, Input, ScrollArea, Stack, Text } from '@monority/ui'
import { useState } from 'react'

interface Message {
    id: string
    sender: string
    text: string
    time: string
    isSelf: boolean
}

const initialMessages: Message[] = [
    {
        id: '1',
        sender: 'Alex',
        text: 'Did the v2.4 canary rollout complete successfully?',
        time: '15:42',
        isSelf: false,
    },
    {
        id: '2',
        sender: 'You',
        text: 'Yes, all 14 edge POPs nominal and P95 latency is down to 18ms.',
        time: '15:43',
        isSelf: true,
    },
]

export function MoodboardChatModule() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputText, setInputText] = useState('')

    const handleSend = () => {
        if (!inputText.trim()) return
        const newMsg: Message = {
            id: String(Date.now()),
            sender: 'You',
            text: inputText.trim(),
            time: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            }),
            isSelf: true,
        }
        setMessages((prev) => [...prev, newMsg])
        setInputText('')
    }

    return (
        <Card padding="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card.Header>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--mr-space-3)' }}>
                    <Avatar name="Alex Vance" size="sm" status="online" />
                    <div>
                        <Card.Title>Team Chat & Support</Card.Title>
                        <Card.Description>
                            Operational bridge with infrastructure on-call
                        </Card.Description>
                    </div>
                </div>
                <Badge variant="success" size="sm">
                    Online
                </Badge>
            </Card.Header>

            <Card.Content style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <ScrollArea style={{ maxHeight: 160 }}>
                    <Stack gap="xs">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: msg.isSelf ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: '82%',
                                        padding: 'var(--mr-space-2) var(--mr-space-3)',
                                        borderRadius: 'var(--mr-radius-md)',
                                        background: msg.isSelf
                                            ? 'var(--mr-accent-solid)'
                                            : 'var(--mr-bg-sunken)',
                                        color: msg.isSelf
                                            ? 'var(--mr-bg-canvas)'
                                            : 'var(--mr-text-primary)',
                                        border: msg.isSelf
                                            ? 'none'
                                            : '1px solid var(--mr-border-subtle)',
                                    }}
                                >
                                    <Text
                                        size="sm"
                                        style={{
                                            color: 'inherit',
                                            fontSize: '0.8125rem',
                                            lineHeight: 1.35,
                                        }}
                                    >
                                        {msg.text}
                                    </Text>
                                    <span
                                        style={{
                                            fontSize: '0.6875rem',
                                            opacity: 0.75,
                                            display: 'block',
                                            textAlign: 'right',
                                            marginTop: 2,
                                        }}
                                    >
                                        {msg.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </Stack>
                </ScrollArea>
            </Card.Content>

            <Card.Footer>
                <div style={{ display: 'flex', width: '100%', gap: 'var(--mr-space-2)' }}>
                    <Input
                        placeholder="Reply to Alex..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSend()
                        }}
                        size="sm"
                        clearable
                        style={{ flex: 1 }}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        disabled={!inputText.trim()}
                        onClick={handleSend}
                    >
                        Send
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}
