import { useReducer } from "react"

export const useMessageModal = () => {
  const [state, dispatch] = useReducer(messageReducer, {error: false, modalActive: false})

  const setSuccesMsg = () => dispatch({ type: types.SUCCESS })
  const setErrorMsg = () => dispatch({ type: types.ERROR })
  const setClearMsg = () => dispatch({ type: types.CLEAR })

  return {
    setSuccesMsg,
    setErrorMsg,
    setClearMsg,
    error: state.error,
    modalActive: state.modalActive,
  }
}

const types = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  CLEAR: "CLEAR",
}

const messageReducer = (state, action) => {
  switch (action.type) {
    case types.SUCCESS:
      return {
        ...state,
        error: false,
        modalActive: true,
      }
    case types.ERROR:
      return {
        ...state,
        error: true,
        modalActive: true,
      }
    case types.CLEAR:
      return {
        ...state,
        error: false,
        modalActive: false,
      }
    default:
      return state
  }
}