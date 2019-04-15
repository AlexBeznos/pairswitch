import React, { useState } from 'react'
import { Tag, Badge, Icon } from 'antd'

import { removeDev } from '../../../../../../services'
import { Dev } from '../../../../../../types'

interface Props {
  dev: Dev,
  onDrag: Function
}
function DevTag({dev, onDrag} : Props) {
  const [withBadge, setWithBadge] = useState(false)

  let mutateableBadgeHide = () => setWithBadge(false)
  const handleMouseOver = () => {
    if(withBadge) return

    setWithBadge(true)
  }
  const handleMouseLeave = () => {
    setTimeout(() => { 
      mutateableBadgeHide()
    }, 1000)
  }
  const handleRemoveDev = () => {
    mutateableBadgeHide = () => {}
    removeDev(dev.id)
  }
  const WithBadgeTag = ({children}) => (
    <Badge 
      count={(
        <Icon 
          type="close-circle" 
          theme="twoTone" 
          twoToneColor="#eb2f96" 
          onClick={handleRemoveDev}
        />
      )} 
    >
      {children}
    </Badge>
  )
  const tag = (
    <Tag 
      color="blue" 
      onDrag={onDrag}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      draggable
    >
      {dev.name}
    </Tag>
  )

  if(withBadge) {
    return (
      <WithBadgeTag>
        {tag}
      </WithBadgeTag>
    )
  } else {
    return tag
  }
}

export default DevTag
