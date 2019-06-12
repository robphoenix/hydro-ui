import React, { useEffect } from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitors } from '../context/monitors-context'

const ViewMonitors = () => {
  const { monitors, fetchMonitors } = useMonitors()

  useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="75%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Monitors
        </Heading>

        <MonitorsTable monitors={monitors} />
      </Pane>
    </Pane>
  )
}

export default ViewMonitors
