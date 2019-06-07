import React from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

const AddMonitor = () => {
  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Add Monitor
        </Heading>
      </Pane>
    </Pane>
  )
}

export default AddMonitor
