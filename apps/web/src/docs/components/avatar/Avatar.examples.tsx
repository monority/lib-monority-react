import { Avatar } from '@monority/ui'

export function AvatarBasicExample() {
    return (
        <Avatar name="Maya Chen" alt="Maya Chen">
            MC
        </Avatar>
    )
}

export function AvatarSizesExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar size="sm" name="Alice B">
                AB
            </Avatar>
            <Avatar size="md" name="Alice B">
                AB
            </Avatar>
            <Avatar size="lg" name="Alice B">
                AB
            </Avatar>
        </div>
    )
}

export function AvatarWithImageExample() {
    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar
                size="md"
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Felix"
            />
            <Avatar size="md" name="Noah Price" alt="Noah Price">
                NP
            </Avatar>
        </div>
    )
}

export function AvatarGroupExample() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size="sm" name="Alice Brown" alt="Alice Brown">
                AB
            </Avatar>
            <Avatar size="sm" name="Ben Ortiz" alt="Ben Ortiz" style={{ marginLeft: '-0.5rem' }}>
                BO
            </Avatar>
            <Avatar size="sm" name="Cora Lee" alt="Cora Lee" style={{ marginLeft: '-0.5rem' }}>
                CL
            </Avatar>
            <Avatar size="sm" aria-label="3 more reviewers" style={{ marginLeft: '-0.5rem' }}>
                +3
            </Avatar>
        </div>
    )
}
