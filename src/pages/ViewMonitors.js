import React from 'react'
import { Pane, Heading, majorScale, Spinner, toaster } from 'evergreen-ui'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitors } from '../context/monitors-context'
import { navigate } from '@reach/router'

const ViewMonitors = () => {
  const { monitors, fetchMonitors, errors, isLoading } = useMonitors()

  React.useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors])

  React.useEffect(() => {
    if (errors.monitors) {
      const { message, cause } = errors.monitors
      toaster.warning(message, { description: cause, duration: 7 })

      // It feels really awkward if the redirect is too quick
      setTimeout(() => navigate(`/monitors/add`), 500)
    }
  }, [errors.monitors, isLoading])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="60%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Monitors
        </Heading>
        {isLoading && (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={400}
          >
            <Spinner />
          </Pane>
        )}
        {!isLoading && !errors.monitors && (
          <MonitorsTable monitors={monitors} />
        )}
      </Pane>
    </Pane>
  )
}

export default ViewMonitors
