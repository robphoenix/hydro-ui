import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong, toaster } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const UnarchiveMonitorMenuItem = ({ monitor, refresh }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { unarchiveMonitor } = useMonitor()
  const handleConfirm = async () => {
    try {
      await unarchiveMonitor(monitor)
      toaster.notify(`${monitor.name} has been unarchived`)
      refresh()
    } catch (error) {
      toaster.warning(error)
    }
  }

  return (
    <Menu.Item onSelect={() => setShowDialog(true)}>
      <Dialog
        isShown={showDialog}
        title="Unarchive Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Unarchive"
        onConfirm={handleConfirm}
      >
        <Text>
          Are you sure you want to unarchive <Strong>{monitor.name}</Strong>{' '}
        </Text>
      </Dialog>
      Unarchive
    </Menu.Item>
  )
}

export default UnarchiveMonitorMenuItem
