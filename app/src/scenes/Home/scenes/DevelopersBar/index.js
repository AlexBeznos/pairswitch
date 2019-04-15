import React, { useContext, useState } from 'react'
import { Icon } from 'antd'

import { useDevs } from '../../../../hooks'
import { SuspendedDevContext } from '../../../../contexts'
import { moveDevToAvailable } from '../../../../services'
import { DevTag } from './scenes'
import { NewItemDrawer } from './components'
import {
  pairswitch_logo,
  pairswitch_logo2x,
  pairswitch_logo3x
} from './assets'
import { 
  Container,
  DevsContainer,
  IconButton,
  Logo
} from './styled'

export default function DeveloprsBar () {
  const {state: devs} = useDevs()
  const [devFormOpened, setDevFormOpened] = useState(false)
  const [taskFormOpened, setTaskFormOpened] = useState(false)
  const {
    dev: suspendedDev, 
    addSuspendedDev,
    emptySuspendedDev
  } = useContext(SuspendedDevContext)
  const handleDevDrop = () => {
    moveDevToAvailable(suspendedDev)
    emptySuspendedDev()
  }
  const toggleDevFormOpen = () => setDevFormOpened(!devFormOpened)
  const toggleTaskFormOpen = () => setTaskFormOpened(!taskFormOpened)
  const handleDevDrag = (dev) => () => addSuspendedDev(dev)
  const handleSwitch = () => {
    fetch('https://us-central1-pairswitch.cloudfunctions.net/switch')
  }

  return (
    <>
      <Logo onClick={handleSwitch} srcSet={`${pairswitch_logo}, ${pairswitch_logo2x} 2x, ${pairswitch_logo3x} 3x`} />
      <Container 
        onDrop={handleDevDrop}
        onDragOver={(e) => {e.preventDefault()}}
      >
        <NewItemDrawer
          type="task" 
          opened={taskFormOpened}
          onClose={toggleTaskFormOpen}
        />
        <NewItemDrawer
          type="dev" 
          opened={devFormOpened}
          onClose={toggleDevFormOpen}
        />
        <DevsContainer>
          {devs.length === 0 && "No available developers..."}
          {devs.map((dev) => (<DevTag key={dev.id} dev={dev} onDrag={handleDevDrag(dev)} />))}
        </DevsContainer>
        <IconButton onClick={toggleTaskFormOpen}>
          <Icon type="file-add" />
        </IconButton>
        <IconButton onClick={toggleDevFormOpen}>
          <Icon type="user-add" />
        </IconButton>
      </Container>
    </>
  )
}
