import React from 'react'
import { Pane, Heading, majorScale, toaster } from 'evergreen-ui'
import { navigate } from '@reach/router'

import MonitorsTable from '../components/MonitorsTable'
import { useMonitors } from '../context/monitors-context'
import FullPageSpinner from '../components/FullPageSpinner'
import MonitorsToolbar from '../components/MonitorsToolbar'
import useFilter from '../hooks/useFilter'
import {
  isStatus,
  matchesSearchQuery,
  hasSelectedCategories,
} from '../utils/filters'

const ViewMonitors = () => {
  const { monitors, fetchMonitors, errors, isLoading } = useMonitors()
  const [buttonText, setButtonText] = React.useState(`Filter Categories...`)

  React.useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors])

  const {
    handleTableSearchChange,
    getSegmentedControlProps,
    getMultiSelectMenuProps,
    categories,
    status,
    searchQuery,
  } = useFilter({
    searchQuery: ``,
    status: `online`,
    categories: [],
  })

  const filter = (monitors) => {
    return monitors.filter((monitor) => {
      return (
        isStatus(monitor, status) &&
        matchesSearchQuery(
          `${monitor.name} ${monitor.description}`.toLowerCase(),
          searchQuery,
        ) &&
        hasSelectedCategories(monitor.categories, categories)
      )
    })
  }

  const filtered = filter(monitors)

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
    const getCategoriesButtonText = () => {
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
    }
    getCategoriesButtonText()
  }, [categories])

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
              getCategoriesProps={getMultiSelectMenuProps}
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
