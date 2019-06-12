import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong, toaster } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'

const ArchiveMonitorMenuItem = ({ monitor }) => {
  const [showDialog, setShowDialog] = useState(false)

  const { archiveMonitor, refreshMonitors } = useMonitors()

  const handleConfirm = async () => {
    try {
      await archiveMonitor(monitor)
      toaster.success(`${monitor.name} has been archived`)
      refreshMonitors()
    } catch (error) {
      toaster.warning(error)
    }
  }

  return (
    <Menu.Item onSelect={() => setShowDialog(true)} intent="danger">
      <Dialog
        isShown={showDialog}
        title="Archive Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Archive"
        onConfirm={handleConfirm}
      >
        <Text>
          Are you sure you want to archive <Strong>{monitor.name}</Strong>{' '}
        </Text>
      </Dialog>
      Archive
    </Menu.Item>
  )
}

export default ArchiveMonitorMenuItem
