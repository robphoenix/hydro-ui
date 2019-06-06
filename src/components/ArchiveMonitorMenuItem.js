import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const ArchiveMonitorMenuItem = ({ monitor }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { archiveMonitor } = useMonitor()
  return (
    <Menu.Item onSelect={() => setShowDialog(true)} intent="danger">
      <Dialog
        isShown={showDialog}
        title="Archive Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Archive"
        onConfirm={() => archiveMonitor(monitor)}
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
