import { useReducer } from 'react'

import { Dev } from '../../types'

interface Result {
  state: Dev,
  add: Function,
  empty: Function
}

function reducer(state: Dev, action: object) {
  switch (action.type) {
    case 'add':
      if(JSON.stringify(state) === JSON.stringify(action.payload)) {
        return state
      } else {
        return {...action.payload}
      }
    case 'remove':
      return {}
    default:
      throw new Error()
  }
}

function useSuspendedDev() : Result{
  const [state, dispatch] = useReducer(reducer, {})
  const add = (dev) => dispatch({type: 'add', payload: dev})
  const empty = () => dispatch({type: 'remove'})

  return {state, add, empty}
}

export default useSuspendedDev
