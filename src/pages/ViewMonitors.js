import React from 'react'
import { Pane, majorScale, toaster, Text, Strong } from 'evergreen-ui'
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
  isMonitorType,
} from '../utils/filters'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'
import useStoredMonitorPreferences from '../hooks/useStoredMonitorPreferences'
import { useUser } from '../context/user-context'
import { isDev } from '../utils/environments'

const ViewMonitors = () => {
  const { monitors, fetchMonitors, errors, isLoading } = useMonitors()
  const { isAdmin } = useUser()
  const {
    getStoredMonitorStatus,
    setStoredMonitorStatus,
    getStoredMonitorType,
    setStoredMonitorType,
  } = useStoredMonitorPreferences()
  const [buttonText, setButtonText] = React.useState(`Filter Categories...`)

  React.useEffect(() => {
    fetchMonitors()
  }, [fetchMonitors])

  const {
    handleTableSearchChange,
    getSegmentedControlProps,
    getMultiSelectMenuProps,
    getSelectMenuProps,
    categories,
    status,
    type,
    searchQuery,
  } = useFilter({
    searchQuery: ``,
    status: getStoredMonitorStatus(),
    categories: [],
    type: getStoredMonitorType(),
  })

  const filter = (monitors) => {
    return monitors.filter((monitor) => {
      return (
        isMonitorType(monitor, type.value) &&
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
    { label: `Online`, value: `online` },
    { label: `Offline`, value: `offline` },
    { label: `Archived`, value: `archived` },
  ].filter((option) => {
    return isAdmin ? true : option.value !== `archived`
  })

  const typeOptions = [
    { label: `Standard Monitors`, value: `standard` },
    { label: `System Monitors`, value: `system` },
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
      console.log(errors.monitors)

      const { message, cause } = errors.monitors
      toaster.warning(message, { description: cause, duration: 7 })
      // It feels really awkward if the redirect is too quick
      setTimeout(() => {
        const url = isAdmin && isDev ? `/populate` : `/monitors/add`
        navigate(url)
      }, 500)
    }
  }, [errors.monitors, isAdmin])

  const {
    value: statusValue,
    onChange: onStatusChange,
  } = getSegmentedControlProps(`status`)

  const handleStatusChange = (value) => {
    setStoredMonitorStatus(value)
    onStatusChange(value)
  }

  const { selected: selectedType, onSelect: onTypeSelect } = getSelectMenuProps(
    `type`,
  )

  const handleTypeSelect = (item) => {
    setStoredMonitorType(item)
    onTypeSelect(item)
  }

  return (
    <PageContainer width="70%">
      <PageHeading>monitors</PageHeading>
      {isLoading && <FullPageSpinner height={majorScale(40)} />}
      {!isLoading && (
        <Pane>
          <MonitorsToolbar
            handleStatusChange={handleStatusChange}
            statusValue={statusValue}
            statusOptions={statusOptions}
            getCategoriesProps={getMultiSelectMenuProps}
            selectedType={selectedType}
            handleTypeSelect={handleTypeSelect}
            typeOptions={typeOptions}
            categoriesButtonText={buttonText}
            categoriesOptions={categoryOptions}
          />
          {filtered && !!filtered.length && (
            <MonitorsTable
              monitors={filtered}
              handleSearchChange={handleTableSearchChange}
            />
          )}
          {!filtered ||
            (!filtered.length && (
              <Pane
                elevation={1}
                width="100%"
                height={120}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                background="tint1"
              >
                <Text size={500} textTransform="capitalize">
                  No{' '}
                  <Strong size={500}>
                    {status} {type.value}
                  </Strong>{' '}
                  monitors
                </Text>
              </Pane>
            ))}
        </Pane>
      )}
    </PageContainer>
  )
}

export default ViewMonitors
