import React from 'react'
import { Popover, Position, Menu, Button } from 'evergreen-ui'
import { navigate } from '@reach/router/lib/history'

import ArchiveMenuItem from '../ArchiveMenuItem'
import { useMonitors } from '../../context/monitors-context'

const ActionMenuCell = ({ action }) => {
  const { archiveAction, fetchActions } = useMonitors()

  return (
    <Popover
      position={Position.BOTTOM_RIGHT}
      content={
        <Menu>
          <Menu.Group>
            {!action.archived && (
              <Menu.Item onSelect={() => navigate(`${action.id}/edit`)}>
                Edit
              </Menu.Item>
            )}
            {!action.archived && (
              <ArchiveMenuItem
                archive={archiveAction}
                refresh={fetchActions}
                item={action}
                dialogTitle={`Archive Action`}
              />
            )}
          </Menu.Group>
        </Menu>
      }
    >
      <Button>Menu</Button>
    </Popover>
  )
}

export default ActionMenuCell
