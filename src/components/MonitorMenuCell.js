import React from 'react'
import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui'

import EnableMonitorMenuItem from './EnableMonitorMenuItem'
import DisableMonitorMenuItem from './DisableMonitorMenuItem'
import ArchiveMonitorMenuItem from './ArchiveMonitorMenuItem'
import UnarchiveMonitorMenuItem from './UnarchiveMonitorMenuItem'

const MonitorMenuCell = ({ monitor, refresh }) => {
  const isArchived = monitor.status === `archived`
  const isOnline = monitor.status === `online`
  const isOffline = monitor.status === `offline`

  return (
    <Popover
      position={Position.BOTTOM_RIGHT}
      content={
        <Menu>
          <Menu.Group>
            {!isArchived && (
              <Menu.Item onSelect={() => toaster.notify('Edit')}>
                Edit
              </Menu.Item>
            )}
            {!isArchived && (
              <Menu.Item onSelect={() => toaster.notify('Duplicate')}>
                Duplicate
              </Menu.Item>
            )}
            {isOffline && (
              <EnableMonitorMenuItem monitor={monitor} refresh={refresh} />
            )}
            {isOnline && (
              <DisableMonitorMenuItem monitor={monitor} refresh={refresh} />
            )}
            {!isArchived && (
              <ArchiveMonitorMenuItem monitor={monitor} refresh={refresh} />
            )}
            {isArchived && (
              <UnarchiveMonitorMenuItem monitor={monitor} refresh={refresh} />
            )}
          </Menu.Group>
        </Menu>
      }
    >
      <Button>Menu</Button>
    </Popover>
  )
}

export default MonitorMenuCell
