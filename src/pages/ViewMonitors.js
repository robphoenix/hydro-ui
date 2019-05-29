import React, { useState, useEffect } from 'react'
import { Pane, Heading, UnorderedList, minorScale } from 'evergreen-ui'

import client from '../utils/api-client'
import Monitor from '../components/Monitor'

const ViewMonitors = () => {
  const [monitors, setMonitors] = useState([])

  useEffect(() => {
    async function fetchData() {
      const monitors = await client(`/p/monitors`)
      setMonitors(monitors)
    }
    fetchData()
  }, [])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="75%">
        <Heading
          is="h2"
          size={700}
          marginTop="default"
          marginBottom={minorScale(6)}
          marginLeft={minorScale(4)}
        >
          Monitors
        </Heading>
        <UnorderedList marginLeft={0} listStyle="none">
          {monitors.map((monitor) => (
            <Monitor key={monitor.id} monitor={monitor} />
          ))}
        </UnorderedList>
      </Pane>
    </Pane>
  )
}

export default ViewMonitors
