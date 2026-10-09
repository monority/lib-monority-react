import type { HTMLAttributes, ReactNode, Ref } from 'react'

export interface AsyncStateNoticeProps extends HTMLAttributes<HTMLDivElement> {
    ref?: Ref<HTMLDivElement>
    isLoading?: boolean
    isError?: boolean
    loadingMessage?: ReactNode
    errorMessage?: ReactNode
    loadingContent?: ReactNode
}
