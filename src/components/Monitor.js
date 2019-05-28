import React from 'react'
import { ListItem, Card, minorScale } from 'evergreen-ui'

const Monitor = ({ monitor }) => {
  return (
    <ListItem key={monitor.id}>
      <Card border elevation={0} background="tint1" padding={minorScale(4)}>
        {monitor.name}
      </Card>
    </ListItem>
  )
}

export default Monitor
