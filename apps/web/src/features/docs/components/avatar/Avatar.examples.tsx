import { Avatar } from '@monority/ui/avatar'
import { Stack } from '@monority/ui/stack'

export function AvatarBasicExample() {
    return (
        <Avatar size="lg">
            <Avatar.Fallback>MC</Avatar.Fallback>
            <Avatar.Status status="online" />
        </Avatar>
    )
}

export function AvatarSizesExample() {
    return (
        <Stack direction="horizontal" gap="md" align="center">
            <Avatar size="sm">
                <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar>
            <Avatar size="md">
                <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar>
            <Avatar size="lg">
                <Avatar.Fallback>AB</Avatar.Fallback>
            </Avatar>
        </Stack>
    )
}

export function AvatarWithImageExample() {
    const placeholderAvatar =
        'data:image/svg+xml;utf8,' +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#7c6cf4"/><circle cx="32" cy="24" r="12" fill="#fff"/><path d="M10 64c2-14 12-20 22-20s20 6 22 20z" fill="#fff"/></svg>'
        )

    return (
        <Stack direction="horizontal" gap="md" align="center">
            <Avatar size="md">
                <Avatar.Image src={placeholderAvatar} alt="Felix" />
                <Avatar.Fallback>FX</Avatar.Fallback>
            </Avatar>
            <Avatar size="md">
                <Avatar.Fallback>NP</Avatar.Fallback>
                <Avatar.Status status="online" />
            </Avatar>
        </Stack>
    )
}

export function AvatarGroupExample() {
    return (
        <Stack direction="horizontal" align="center">
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
        </Stack>
    )
}
