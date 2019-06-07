import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong, toaster } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const ArchiveMonitorMenuItem = ({ monitor, refresh }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { archiveMonitor } = useMonitor()
  const handleConfirm = async () => {
    try {
      await archiveMonitor(monitor)
      toaster.notify(`${monitor.name} has been archived`)
      refresh()
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
