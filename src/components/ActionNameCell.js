import React from 'react'
import { Pane, Heading, Text, majorScale } from 'evergreen-ui'

const ActionNameCell = ({ action }) => {
  return (
    <Pane display="flex" flexDirection="column">
      <Heading size={600} marginBottom={majorScale(2)}>
        {action.name}
      </Heading>
      <Text size={500}>{action.description}</Text>
    </Pane>
  )
}

export default ActionNameCell
