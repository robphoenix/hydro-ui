import React from 'react'
import { Pane, Heading, Text, majorScale } from 'evergreen-ui'

const MonitorNameCell = ({ monitor }) => {
  return (
    <Pane display="flex" flexDirection="column">
      <Heading size={600} marginBottom={majorScale(1)}>
        {monitor.name}
      </Heading>
      <Text size={500}>{monitor.description}</Text>
    </Pane>
  )
}

export default MonitorNameCell
