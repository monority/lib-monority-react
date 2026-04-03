import { useEffect, useReducer } from 'react'
import { asyncStatus, createAsyncState } from '@/lib/createAsyncState'
import { getErrorMessage, isAbortError } from '@/services/http/httpErrorUtils'
import { getPlaygroundMetrics } from '../services/playgroundService'

function reducer(state, action) {
    switch (action.type) {
        case 'load/start':
            return createAsyncState({
                status: asyncStatus.loading,
            })
        case 'load/success':
            return createAsyncState({
                status: asyncStatus.success,
                data: action.payload,
            })
        case 'load/error':
            return createAsyncState({
                status: asyncStatus.error,
                error: action.payload,
            })
        default:
            return state
    }
}

export function usePlaygroundMetrics() {
    const [state, dispatch] = useReducer(reducer, createAsyncState())

    useEffect(() => {
        const controller = new AbortController()

        async function load() {
            dispatch({ type: 'load/start' })

            try {
                const data = await getPlaygroundMetrics({ signal: controller.signal })
                dispatch({ type: 'load/success', payload: data })
            } catch (error) {
                if (!isAbortError(error)) {
                    dispatch({ type: 'load/error', payload: error })
                }
            }
        }

        load()

        return () => {
            controller.abort()
        }
    }, [])

    return {
        ...state,
        isIdle: state.status === asyncStatus.idle,
        isLoading: state.status === asyncStatus.loading,
        isSuccess: state.status === asyncStatus.success,
        isError: state.status === asyncStatus.error,
        errorMessage: getErrorMessage(state.error),
    }
}
