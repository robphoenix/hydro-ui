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
  const [showDialog, setShowDialog] = useState(false)
  const { disableMonitor } = useMonitor()

  // const onDisable = () => {
  //   disableMonitor(monitor)
  //     .then(() => toaster.notify(`${monitor.name} disabled`))
  //     .catch((error) => console.log({ error }))
  // }

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
            <Menu.Item onSelect={() => setShowDialog(true)} intent="danger">
              <Dialog
                isShown={showDialog}
                title="Disable Monitor"
                onCloseComplete={() => setShowDialog(false)}
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
