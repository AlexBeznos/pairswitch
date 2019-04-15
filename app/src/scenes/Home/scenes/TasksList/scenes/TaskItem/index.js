import React, { useState } from 'react'
import { List, Icon, Tag, Input } from 'antd'

import { markdownLink, removeTask } from '../../../../../../services'
import { Task } from '../../../../../../types'
import { updateTaskTitle } from '../../../../../../services'
import { Card } from './styled'

interface Prop {
  task: Task,
  onDrop: Function,
  onDevDrag: Function
}
function TaskItem({task, onDrop, onDevDrag} : Prop) {
  const [inputVisible, setInputVisible] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)
  const handleTaskRemove = () => {
    removeTask(task)
  }
  const handleInputChange = (e) => setNewTitle(e.target.value)
  const handleSubmit = () => {
    updateTaskTitle(task.id, newTitle)
    setInputVisible(false)
  }
  const TitleChangeInput = (
    <Input
      placeholder="Set new task name..."
      size="large"
      onPressEnter={handleSubmit}
      onChange={handleInputChange}
      value={newTitle}
    />
  )
  const toggleTitleChangeInput = () => {
    if(inputVisible) {
      setNewTitle(task.title)
      setInputVisible(false)
    } else {
      setInputVisible(true)
    }
  }

  return (
    <Card 
      title={inputVisible ? TitleChangeInput : markdownLink(task.title)}
      actions={[
        <Icon type="edit" onClick={toggleTitleChangeInput}/>, 
        <Icon type="delete" onClick={handleTaskRemove} />
      ]}
      onDragOver={(e) => {e.preventDefault()}}
      onDrop={onDrop(task)}
    >
      <List
        bordered
        dataSource={task.participants}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Tag color="blue" onDrag={onDevDrag({dev: item, task})} draggable>
              {item.name}
            </Tag>
          </List.Item>
        )}
      />
    </Card>
  )
}

export default TaskItem
