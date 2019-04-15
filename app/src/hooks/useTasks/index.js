import { useEffect, useReducer } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

import { Task } from '../../types'
import {
  convertFirebaseSnap as convertSnap
} from '../../services'

interface Result {
  state: array<Task>
}

function reducer(state: array<Task>, action: object) {
  switch (action.type) {
    case 'add':
      return [...action.payload]
    case 'remove':
      return state.filter((task) => task.id !== action.payload.id)
    default:
      throw new Error()
  }
}

function useTasks() : Result {
  const [state, dispatch] = useReducer(reducer, [])

  const addTasks = (tasks) => {
    const payload = convertSnap(tasks, ['participants'])

    dispatch({payload, type: 'add'})
  }
  
  useEffect(() => {
    firebase
      .database()
      .ref('tasks/')
      .on('value', (snap) => addTasks(snap.val()))
  }, [])

  return {state}
}

export default useTasks
