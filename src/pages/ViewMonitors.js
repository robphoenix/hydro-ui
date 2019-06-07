import React, { useState, useEffect, useCallback } from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitor } from '../context/monitor-context'

const ViewMonitors = () => {
  const [monitors, setMonitors] = useState([])

  const { getMonitors } = useMonitor()

  const fetchMonitors = useCallback(async () => {
    try {
      const monitors = await getMonitors()
      setMonitors(monitors)
    } catch (error) {
      console.log({ error })
    }
  }, [getMonitors])

  useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors])

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
