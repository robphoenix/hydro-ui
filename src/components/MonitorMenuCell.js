import React from 'react'
import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui'

const MonitorMenuCell = () => {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={() => toaster.notify('Edit')}>Edit</Menu.Item>
            <Menu.Item onSelect={() => toaster.notify('Duplicate')}>
              Duplicate
            </Menu.Item>
            <Menu.Item
              onSelect={() => toaster.notify('Disable')}
              intent="danger"
            >
              Disable
            </Menu.Item>
            <Menu.Item
              onSelect={() => toaster.danger('Archive')}
              intent="danger"
            >
              Archive
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Button marginRight={16}>Menu</Button>
    </Popover>
  )
}

export default MonitorMenuCell
