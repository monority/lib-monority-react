import { useEffect, useReducer } from 'react'
import { asyncStatus, createAsyncState } from '@/lib/createAsyncState'
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
        let isCancelled = false

        async function load() {
            dispatch({ type: 'load/start' })

            try {
                const data = await getPlaygroundMetrics()

                if (!isCancelled) {
                    dispatch({ type: 'load/success', payload: data })
                }
            } catch (error) {
                if (!isCancelled) {
                    dispatch({ type: 'load/error', payload: error.message })
                }
            }
        }

        load()

        return () => {
            isCancelled = true
        }
    }, [])

    return {
        ...state,
        isIdle: state.status === asyncStatus.idle,
        isLoading: state.status === asyncStatus.loading,
        isSuccess: state.status === asyncStatus.success,
        isError: state.status === asyncStatus.error,
    }
}
