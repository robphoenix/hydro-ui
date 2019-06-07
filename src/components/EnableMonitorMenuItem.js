import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong, toaster } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const EnableMonitorMenuItem = ({ monitor, refresh }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { enableMonitor } = useMonitor()
  const handleConfirm = async () => {
    try {
      await enableMonitor(monitor)
      toaster.notify(`${monitor.name} has been enabled`)
      refresh()
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
