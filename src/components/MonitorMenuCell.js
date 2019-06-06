import React, { useState } from 'react'
import {
  Popover,
  Position,
  Menu,
  toaster,
  Button,
  Dialog,
  Text,
  Strong,
} from 'evergreen-ui'
import { useMonitor } from '../context/monitor-context'

const MonitorMenuCell = ({ monitor }) => {
  const [showDisableDialog, setShowDisableDialog] = useState(false)
  const [showEnableDialog, setShowEnableDialog] = useState(false)
  const { disableMonitor, enableMonitor } = useMonitor()

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
              <Menu.Item onSelect={() => setShowEnableDialog(true)}>
                <Dialog
                  isShown={showEnableDialog}
                  title="Enable Monitor"
                  onCloseComplete={() => setShowEnableDialog(false)}
                  confirmLabel="Enable"
                  onConfirm={() => enableMonitor(monitor)}
                >
                  <Text>
                    Are you sure you want to enable{' '}
                    <Strong>{monitor.name}</Strong>{' '}
                  </Text>
                </Dialog>
                Enable
              </Menu.Item>
            )}
            {monitor.status === `online` && (
              <Menu.Item
                onSelect={() => setShowDisableDialog(true)}
                intent="danger"
              >
                <Dialog
                  isShown={showDisableDialog}
                  title="Disable Monitor"
                  onCloseComplete={() => setShowDisableDialog(false)}
                  confirmLabel="Disable"
                  onConfirm={() => disableMonitor(monitor)}
                >
                  <Text>
                    Are you sure you want to disable{' '}
                    <Strong>{monitor.name}</Strong>{' '}
                  </Text>
                </Dialog>
                Disable
              </Menu.Item>
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
