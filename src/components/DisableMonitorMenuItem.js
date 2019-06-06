import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const DisableMonitorMenuItem = ({ monitor }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { disableMonitor } = useMonitor()

  return (
    <Menu.Item onSelect={() => setShowDialog(true)} intent="danger">
      <Dialog
        isShown={showDialog}
        title="Disable Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Disable"
        onConfirm={() => disableMonitor(monitor)}
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
