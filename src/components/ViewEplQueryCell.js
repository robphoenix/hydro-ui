import React from 'react'
import {
  Popover,
  Pane,
  majorScale,
  Pre,
  Code,
  toaster,
  Button,
} from 'evergreen-ui'

import copy from '../utils/copy-to-clipboard'

const Query = ({ monitor, close }) => {
  return (
    <Pane
      width="auto"
      height="auto"
      padding={majorScale(2)}
      background="tint1"
      display="flex"
      flexDirection="column"
    >
      <Pre maxWidth={600} whiteSpace="pre-wrap" marginBottom={majorScale(2)}>
        <Code appearance="minimal" size={500}>
          {monitor.query}
        </Code>
      </Pre>
      <Pane display="flex" justifyContent="flex-end">
        <Button color="danger" appearance="minimal" onClick={close}>
          Close
        </Button>
        <Button
          appearance="minimal"
          onClick={() => {
            copy(monitor.query)
            toaster.success(`Copied query from monitor ${monitor.name}`)
            close()
          }}
        >
          Copy Epl Query
        </Button>
      </Pane>
    </Pane>
  )
}

const ViewEplQueryCell = ({ monitor }) => {
  return (
    <Popover
      trigger="hover"
      content={({ close }) => <Query monitor={monitor} close={close} />}
    >
      <Button appearance="minimal">View EPL Query</Button>
    </Popover>
  )
}

export default ViewEplQueryCell
