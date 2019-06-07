import React, { useEffect } from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitor } from '../context/monitor-context'

const ViewMonitors = () => {
  const { monitors, fetchMonitors } = useMonitor()

  useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors, monitors])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="50%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Monitors
        </Heading>

        <MonitorsTable monitors={monitors} refresh={fetchMonitors} />
      </Pane>
    </Pane>
  )
}

export default ViewMonitors
