import { useState } from 'react'
import { Badge, Button, Card, Checkbox, Stack, Text, Title } from '@monority/ui'

interface TaskItem {
    id: string
    text: string
    priority: 'high' | 'normal' | 'low'
    done: boolean
}

const initialTasks: TaskItem[] = [
    {
        id: '1',
        text: 'Migrate legacy CSS tokens to @layer architecture',
        priority: 'high',
        done: true,
    },
    {
        id: '2',
        text: 'Audit WCAG 2.1 contrast in OLED theme',
        priority: 'high',
        done: true,
    },
    {
        id: '3',
        text: 'Deploy preview container to staging cluster',
        priority: 'normal',
        done: false,
    },
    {
        id: '4',
        text: 'Review automated Playwright regression suite',
        priority: 'low',
        done: false,
    },
]

export function MoodboardTasksModule() {
    const [tasks, setTasks] = useState<TaskItem[]>(initialTasks)

    const doneCount = tasks.filter((t) => t.done).length

    const handleToggle = (id: string) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
    }

    const handleClearDone = () => {
        setTasks((prev) => prev.filter((t) => !t.done))
    }

    return (
        <Card padding="md" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Card.Header>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <div>
                        <Title as="h3" size="sm">
                            Tasks & Sprint Backlog
                        </Title>
                        <Text tone="muted" size="sm">
                            Interactive checklist for active sprint deliverables
                        </Text>
                    </div>
                    <Badge variant="primary" size="sm">
                        {doneCount} / {tasks.length} Done
                    </Badge>
                </div>
            </Card.Header>

            <Card.Content
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 'var(--mr-space-3)',
                }}
            >
                <Stack gap="xs">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: 'var(--mr-space-2)',
                                padding: 'var(--mr-space-1) 0',
                            }}
                        >
                            <Checkbox
                                id={`task-${task.id}`}
                                label={task.text}
                                checked={task.done}
                                onChange={() => handleToggle(task.id)}
                                tone="accent"
                                size="sm"
                                style={{
                                    textDecoration: task.done ? 'line-through' : 'none',
                                    opacity: task.done ? 0.65 : 1,
                                }}
                            />
                            <Badge
                                variant={
                                    task.priority === 'high'
                                        ? 'danger'
                                        : task.priority === 'normal'
                                          ? 'primary'
                                          : 'default'
                                }
                                size="sm"
                            >
                                {task.priority}
                            </Badge>
                        </div>
                    ))}
                </Stack>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 'var(--mr-space-2)',
                        paddingTop: 'var(--mr-space-2)',
                        borderTop: '1px solid var(--mr-border-subtle)',
                    }}
                >
                    <div style={{ display: 'flex', gap: 'var(--mr-space-2)' }}>
                        <Button variant="secondary" size="sm">
                            Add Task
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={doneCount === 0}
                            onClick={handleClearDone}
                        >
                            Clear Done
                        </Button>
                    </div>
                    <Text tone="muted" size="sm" style={{ fontSize: '0.75rem' }}>
                        Sprint 14 in progress
                    </Text>
                </div>
            </Card.Content>
        </Card>
    )
}
