import { Avatar } from '@monority/ui/avatar'

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
    const placeholderAvatar =
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#7c6cf4"/><circle cx="32" cy="24" r="12" fill="#fff"/><path d="M10 64c2-14 12-20 22-20s20 6 22 20z" fill="#fff"/></svg>',
        )

    return (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar size="md" src={placeholderAvatar} alt="Felix" />
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
