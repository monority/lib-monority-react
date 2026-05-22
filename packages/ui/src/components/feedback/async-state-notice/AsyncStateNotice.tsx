import { Text } from '@/components/typography/text/Text'

interface AsyncStateNoticeProps { isLoading?: boolean; isError?: boolean; loadingMessage?: React.ReactNode; errorMessage?: React.ReactNode; loadingContent?: React.ReactNode | null }

export function AsyncStateNotice({ isLoading, isError, loadingMessage, errorMessage, loadingContent = null }: AsyncStateNoticeProps) {
  if (isLoading) return <div role="status" aria-live="polite" aria-busy="true">{loadingContent ?? <Text tone="base">{loadingMessage}</Text>}{loadingContent ? <span className="visually-hidden">{loadingMessage}</span> : null}</div>
  if (isError) return <div role="alert" aria-live="assertive"><Text tone="strong">{errorMessage}</Text></div>
  return null
}
