import React from 'react'
import { Popover, Position, Menu, toaster, Button } from 'evergreen-ui'

import EnableMonitorMenuItem from './EnableMonitorMenuItem'
import DisableMonitorMenuItem from './DisableMonitorMenuItem'
import ArchiveMonitorMenuItem from './ArchiveMonitorMenuItem'
import UnarchiveMonitorMenuItem from './UnarchiveMonitorMenuItem'
import { navigate } from '@reach/router'

const MonitorMenuCell = ({ monitor }) => {
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
              <Menu.Item onSelect={() => navigate(`${monitor.id}/edit`)}>
                Edit
              </Menu.Item>
            )}
            {!isArchived && (
              <Menu.Item onSelect={() => toaster.success('Duplicate')}>
                Duplicate
              </Menu.Item>
            )}
            {isOffline && <EnableMonitorMenuItem monitor={monitor} />}
            {isOnline && <DisableMonitorMenuItem monitor={monitor} />}
            {!isArchived && <ArchiveMonitorMenuItem monitor={monitor} />}
            {isArchived && <UnarchiveMonitorMenuItem monitor={monitor} />}
          </Menu.Group>
        </Menu>
      }
    >
      <Button>Menu</Button>
    </Popover>
  )
}

export default MonitorMenuCell
