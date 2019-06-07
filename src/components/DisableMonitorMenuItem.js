import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong, toaster } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const DisableMonitorMenuItem = ({ monitor }) => {
  const [showDialog, setShowDialog] = useState(false)

  const { disableMonitor, refreshMonitors } = useMonitor()
  const handleConfirm = async () => {
    try {
      await disableMonitor(monitor)
      toaster.notify(`${monitor.name} has been disabled`)
      refreshMonitors()
    } catch (error) {
      toaster.warning(error)
    }
  }

  return (
    <Menu.Item onSelect={() => setShowDialog(true)} intent="danger">
      <Dialog
        isShown={showDialog}
        title="Disable Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Disable"
        onConfirm={handleConfirm}
      >
        <Text>
          Are you sure you want to disable <Strong>{monitor.name}</Strong>{' '}
        </Text>
      </Dialog>
      Disable
    </Menu.Item>
  )
}

export default DisableMonitorMenuItem
