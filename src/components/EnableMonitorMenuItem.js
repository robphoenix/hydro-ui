import React, { useState } from 'react'
import { Menu, Dialog, Text, Strong } from 'evergreen-ui'

import { useMonitor } from '../context/monitor-context'

const EnableMonitorMenuItem = ({ monitor }) => {
  const [showDialog, setShowDialog] = useState(false)
  const { enableMonitor } = useMonitor()
  return (
    <Menu.Item onSelect={() => setShowDialog(true)}>
      <Dialog
        isShown={showDialog}
        title="Enable Monitor"
        onCloseComplete={() => setShowDialog(false)}
        confirmLabel="Enable"
        onConfirm={() => enableMonitor(monitor)}
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
