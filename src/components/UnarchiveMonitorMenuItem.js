import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const UnarchiveMonitorMenuItem = ({ monitor }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { unarchiveMonitor } = useMonitor()
  return (
    <Menu.Item onSelect={() => setShowDialog(true)}>
      <Dialog
        isShown={showDialog}
        title="Unarchive Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Unarchive"
        onConfirm={() => unarchiveMonitor(monitor)}
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
