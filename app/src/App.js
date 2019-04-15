import React from 'react'
import firebase from 'firebase/app'
import 'antd/dist/antd.css'

import firebaseConfig from './firebaseConfig'
import { Home } from './scenes'

firebase.initializeApp(firebaseConfig)

export default () => (
  <Home />
)
