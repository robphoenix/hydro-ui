import React from 'react'
import { Popover, Position, Menu, Button } from 'evergreen-ui'

import EnableMonitorMenuItem from './EnableMonitorMenuItem'
import DisableMonitorMenuItem from './DisableMonitorMenuItem'
import UnarchiveMonitorMenuItem from './UnarchiveMonitorMenuItem'
import { navigate } from '@reach/router'
import { useMonitors } from '../context/monitors-context'
import ArchiveMenuItem from './ArchiveMenuItem'

const MonitorMenuCell = ({ monitor }) => {
  const isArchived = monitor.status === `archived`
  const isOnline = monitor.status === `online`
  const isOffline = monitor.status === `offline`

  const { archiveMonitor, fetchMonitors } = useMonitors()

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
              <Menu.Item onSelect={() => navigate(`${monitor.id}/duplicate`)}>
                Duplicate
              </Menu.Item>
            )}
            {isOffline && <EnableMonitorMenuItem monitor={monitor} />}
            {isOnline && <DisableMonitorMenuItem monitor={monitor} />}
            {!isArchived && (
              <ArchiveMenuItem
                archive={archiveMonitor}
                refresh={fetchMonitors}
                item={monitor}
                dialogTitle={`Archive Monitor`}
              />
            )}
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
