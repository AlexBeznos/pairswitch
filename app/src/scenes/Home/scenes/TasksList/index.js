import React, { useContext } from 'react'
import { Col, Row } from 'antd'

import { useTasks } from '../../../../hooks'
import { SuspendedDevContext } from '../../../../contexts'
import { moveDevToTask } from '../../../../services'
import { TaskItem } from './scenes'

export default function TasksList() {
  const {state: tasks} = useTasks()
  const {
    dev: suspendedDev, 
    addSuspendedDev,
    emptySuspendedDev
  } = useContext(SuspendedDevContext)
  const handleDevDrop = (task) => () => {
    moveDevToTask(suspendedDev, task)
    emptySuspendedDev()
  }
  const handleDevDrag = ({dev, task}) => () => {
    addSuspendedDev({...dev, taskId: task.id})
  }

  return (
    <Row gutter={16}>
      {tasks.map((task) => (
        <Col span={4} key={task.id}>
          <TaskItem 
            task={task} 
            onDrop={handleDevDrop}
            onDevDrag={handleDevDrag}
          />
        </Col>
      ))}
    </Row>
  )
}
