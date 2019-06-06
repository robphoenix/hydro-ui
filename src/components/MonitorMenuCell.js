import React from 'react'
import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui'

import EnableMonitorMenuItem from './EnableMonitorMenuItem'
import DisableMonitorMenuItem from './DisableMonitorMenuItem'

const MonitorMenuCell = ({ monitor }) => {
  return (
    <Popover
      position={Position.BOTTOM_RIGHT}
      content={
        <Menu>
          <Menu.Group>
            <Menu.Item onSelect={() => toaster.notify('Edit')}>Edit</Menu.Item>
            <Menu.Item onSelect={() => toaster.notify('Duplicate')}>
              Duplicate
            </Menu.Item>
            {monitor.status === `offline` && (
              <EnableMonitorMenuItem monitor={monitor} />
            )}
            {monitor.status === `online` && (
              <DisableMonitorMenuItem monitor={monitor} />
            )}
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
