import React, { useState } from 'react'
import { notification } from 'antd'

import { Logo } from './styled'
import {
  pairswitch_logo,
  pairswitch_logo2x,
  pairswitch_logo3x
} from './assets'

function SwitchLogo() {
  const [clickable, setClickable] = useState(true)
  const notificationKey = 'switchProgress'
  const notificationMessage = 'PairSwitch status:'
  
  const handleSwitchClick = () => {
    if(!clickable) return

    setClickable(false)
    notification.info({
      key: notificationKey,
      message: notificationMessage,
      description: 'In progress right now...'
    })

    fetch('https://us-central1-pairswitch.cloudfunctions.net/switch')
      .then(() => {
        notification.success({
          key: notificationKey,
          message: notificationMessage,
          description: 'Pairs switched. Thanks for using PairSwitch ヽ(^o^)ノ'
        })
        setClickable(true)
      }).catch(() => {
        notification.error({
          key: notificationKey,
          message: notificationMessage,
          description: 'Something went wrong... Ping me, when you will fix it (ಠ_ಠ)'
        })
        setClickable(true)
      })
  }
  return (
    <Logo
      onClick={handleSwitchClick}
      srcSet={`${pairswitch_logo}, ${pairswitch_logo2x} 2x, ${pairswitch_logo3x} 3x`}
    />
    
  )
}

export default SwitchLogo
