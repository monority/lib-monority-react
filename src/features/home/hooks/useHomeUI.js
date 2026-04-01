import { useReducer } from 'react'

const initialState = {
    isModalOpen: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'modal/open':
            return { ...state, isModalOpen: true }
        case 'modal/close':
            return { ...state, isModalOpen: false }
        default:
            return state
    }
}

export function useHomeUI() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return {
        isModalOpen: state.isModalOpen,
        openModal: () => dispatch({ type: 'modal/open' }),
        closeModal: () => dispatch({ type: 'modal/close' }),
    }
}
