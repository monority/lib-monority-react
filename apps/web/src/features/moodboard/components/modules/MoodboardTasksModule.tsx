import { useState } from 'react'
import { Badge, Button, Card, Checkbox, Stack, Text, Toolbar } from '@monority/ui'

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
                <div>
                    <Card.Title>Tasks & Sprint Backlog</Card.Title>
                    <Card.Description>
                        Interactive checklist for active sprint deliverables
                    </Card.Description>
                </div>
                <Badge variant="primary" size="sm">
                    {doneCount} / {tasks.length} Done
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
            </Card.Content>

            <Card.Footer>
                <Toolbar>
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
                </Toolbar>
                <Text tone="muted" size="sm">
                    Sprint 14 in progress
                </Text>
            </Card.Footer>
        </Card>
    )
}
