import React from 'react'
import { Layout } from 'antd'

import { useSuspendedDev } from '../../hooks'
import { SuspendedDevContext } from '../../contexts'
import { DevelopersBar, TasksList } from './scenes'
import { Content } from './styled'

export default function() {
  const {
    state: dev, 
    add: addSuspendedDev,
    empty: emptySuspendedDev
  } = useSuspendedDev()
  const context = {
    dev,
    addSuspendedDev,
    emptySuspendedDev
  }

  return ( 
    <Layout style={{height: '100%'}}>
      <SuspendedDevContext.Provider value={context}>
        <DevelopersBar />
        <Content>
          <TasksList />
        </Content>
      </SuspendedDevContext.Provider>
      <Layout.Footer style={{ textAlign: 'center' }}>
        PairSwitcher © 2019
      </Layout.Footer>
    </Layout>
  )
}
