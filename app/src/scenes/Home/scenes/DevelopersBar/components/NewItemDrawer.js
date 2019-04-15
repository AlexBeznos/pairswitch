import React, { useState } from 'react'
import { Drawer, Input, Button, Icon } from 'antd'

import { addDev, addTask } from '../../../../../services'

const mapper = {
  task: {
    exec: addTask,
    title: 'Add new task',
    placeholder: 'Enter title name...'
  },
  dev: {
    exec: addDev,
    title: 'Add other developer',
    placeholder: "Enter developer's name..."
  }
}
interface Props {
  opened: boolean,
  onClose: Function,
  type: string
}
function NewItemDrawer({opened, onClose, type} : Props) {
  const [value, setState] = useState('')
  const {
    exec, 
    title, 
    placeholder
  } = mapper[type] 

  const handleClose = () => {
    setState('')
    onClose()
  }
  const handleSubmit = () => {
    if(value === '') return

    exec(value)
    handleClose()
  }
  const handleInputChange = (e) => {
    setState(e.target.value)
  }

  const renderSubmitButton = () => (
    <Button 
      type="primary" 
      size="large"
      className="ant-input-search-button"
      onClick={handleSubmit}
    >
      <Icon type="plus-circle" />
    </Button>
  )
  return (
    <Drawer
      title={title}
      placement="right"
      width={400}
      visible={opened}
      onClose={handleClose} 
    >
      <Input
        className="ant-input-search ant-input-search-enter-button"
        placeholder={placeholder}
        size="large"
        onPressEnter={handleSubmit}
        addonAfter={renderSubmitButton()}
        onChange={handleInputChange}
        value={value}
      />
    </Drawer>
  )
}

export default NewItemDrawer
