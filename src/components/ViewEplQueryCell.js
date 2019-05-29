import React from 'react'
import {
  Popover,
  Pane,
  majorScale,
  Pre,
  Code,
  Icon,
  toaster,
  Button,
} from 'evergreen-ui'

const ViewEplQueryCell = ({ monitor }) => {
  const copyToClipboard = (query) => {
    document.addEventListener('copy', (e) => {
      e.clipboardData.setData('text/plain', query)
      e.preventDefault()
      document.removeEventListener('copy', null)
    })
    document.execCommand('copy')
  }

  return (
    <Popover
      content={({ close }) => (
        <Pane
          width="auto"
          height="auto"
          padding={majorScale(4)}
          background="tint1"
          display="flex"
        >
          <Pre maxWidth={600} whiteSpace="pre-wrap">
            <Code appearance="minimal" size={500}>
              {monitor.query}
            </Code>
          </Pre>
          <Pane display="flex" alignItems="flex-end">
            <Icon
              icon="duplicate"
              color="success"
              cursor="pointer"
              onClick={() => {
                copyToClipboard(monitor.query)
                toaster.success(`Copied query from monitor ${monitor.name}`)
                close()
              }}
              marginLeft={majorScale(2)}
            />
          </Pane>
        </Pane>
      )}
    >
      <Button appearance="primary">View EPL Query</Button>
    </Popover>
  )
}

export default ViewEplQueryCell
