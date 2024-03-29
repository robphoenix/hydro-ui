import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong, toaster } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'

const EnableMonitorMenuItem = ({ monitor }) => {
  const { fetchMonitors, enableMonitor } = useMonitors()

  const [showDialog, setShowDialog] = useState(false)

  const handleConfirm = async () => {
    try {
      await enableMonitor(monitor)
      toaster.success(`${monitor.name} has been enabled`)
      fetchMonitors()
    } catch (error) {
      toaster.warning(error)
    }
  }

  return (
    <Menu.Item onSelect={() => setShowDialog(true)}>
      <Dialog
        isShown={showDialog}
        title="Enable Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Enable"
        onConfirm={handleConfirm}
      >
        <Text>
          Are you sure you want to enable <Strong>{monitor.name}</Strong>{' '}
        </Text>
      </Dialog>
      Enable
    </Menu.Item>
  )
}

export default EnableMonitorMenuItem
