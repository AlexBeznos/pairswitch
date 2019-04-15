import { useEffect, useReducer } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import { Dev } from '../../types'
import {
  convertFirebaseSnap as convertSnap
} from '../../services'

interface Result {
  state: array<Dev>,
  addDevs: Function
}

function reducer(state: array<Dev> = [], action: object) {
  switch (action.type) {
    case 'add':
      return [...action.payload]
    case 'remove':
      return state.filter((devs) => devs.id !== action.payload.id)
    default:
      throw new Error()
  }
}

function useDevs() : Result {
  const [state, dispatch] = useReducer(reducer, [])

  const addDevs = (devs) => {
    const payload = convertSnap(devs)

    dispatch({payload, type: 'add'})
  }

  useEffect(() => {
    firebase
      .database()
      .ref('availableDevs/')
      .on('value', (snap) => addDevs(snap.val()))
  }, []) 

  return {state}
}

export default useDevs
