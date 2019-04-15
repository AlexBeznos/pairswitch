import firebase from 'firebase/app'
import 'firebase/database'

import { Dev, Task } from '../types'

export const addDev = (name : string) => {
  firebase
    .database()
    .ref('availableDevs/')
    .push({name})
}

export const removeDev = (id : stirng) => {
  let changeSet = {}
  changeSet[id] = null
  firebase
    .database()
    .ref('availableDevs/')
    .update(changeSet)
}

export const moveDevToAvailable = (dev : Dev) => {
    let changeSet = {}
    changeSet[`availableDevs/${dev.id}`] = {name: dev.name}
    changeSet[`tasks/${dev.taskId}/participants/${dev.id}`] = null

    firebase
      .database()
      .ref()
      .update(changeSet)
}

export const moveDevToTask = (dev : Dev, task : Task) => {
  let changeSet = {}

  changeSet[`availableDevs/${dev.id}`] = null
  changeSet[`tasks/${task.id}/participants/${dev.id}`] = {name: dev.name}
  if(dev.taskId) {
    changeSet[`tasks/${dev.taskId}/participants/${dev.id}`] = null
  }

  firebase
    .database()
    .ref()
    .update(changeSet)
}

export const addTask = (title : string) => {
  firebase
    .database()
    .ref('tasks/')
    .push({participants: [], title})
} 

export const removeTask = (task : Task) => {
  let changeSet = {}
  changeSet[`tasks/${task.id}`] = null
  for(let devIndex in task.participants) {
    let dev = task.participants[devIndex]
    changeSet[`availableDevs/${dev.id}`] = {name: dev.name}
  }

  firebase
    .database()
    .ref()
    .update(changeSet)
}

export const updateTaskTitle = (id : string, title : string) => {
  firebase
    .database()
    .ref(`tasks/${id}`)
    .update({title: title})
}
