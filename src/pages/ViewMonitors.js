import React from 'react'
import { Pane, Heading, majorScale, toaster } from 'evergreen-ui'
import { navigate } from '@reach/router'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitors } from '../context/monitors-context'
import FullPageSpinner from '../components/FullPageSpinner'
import MonitorsToolbar from '../components/MonitorsToolbar'
import useMonitorsFilters from '../hooks/useMonitorsFilters'

const ViewMonitors = () => {
  const { monitors, fetchMonitors, errors, isLoading } = useMonitors()
  const [buttonText, setButtonText] = React.useState(`Filter Categories...`)

  const initialValues = {
    searchQuery: ``,
    status: `online`,
    categories: [],
    original: monitors,
  }

  const {
    handleTableSearchChange,
    filtered,
    getSegmentedControlProps,
    getSelectMenuProps,
    categories,
  } = useMonitorsFilters(initialValues)

  const statusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Archived', value: 'archived' },
  ]

  const categoryOptions = Array.from(
    new Set(
      monitors.reduce(
        (prev, monitor) => [...prev, ...monitor.categories.map((c) => c.name)],
        [],
      ),
    ),
  ).map((label) => ({ label, value: label }))

  React.useEffect(() => {
    switch (categories.length) {
      case 0:
        setButtonText(`Filter Categories...`)
        break
      case 1:
        setButtonText(`${categories[0]} selected`)
        break
      default:
        setButtonText(`${categories.length} categories selected`)
        break
    }
  }, [categories])

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
  }, [errors.monitors])

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
        {isLoading && <FullPageSpinner height={majorScale(40)} />}
        {!isLoading && (
          <Pane>
            <MonitorsToolbar
              getStatusProps={getSegmentedControlProps}
              statusOptions={statusOptions}
              getCategoriesProps={getSelectMenuProps}
              categoriesButtonText={buttonText}
              categoriesOptions={categoryOptions}
            />
            <MonitorsTable
              monitors={filtered}
              handleSearchChange={handleTableSearchChange}
            />
          </Pane>
        )}
      </Pane>
    </Pane>
  )
}

export default ViewMonitors
