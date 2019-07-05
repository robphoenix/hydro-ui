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
import useStoredMonitorStatus from '../hooks/useStoredMonitorStatus'
import { useUser } from '../context/user-context'

const ViewMonitors = () => {
  const { monitors, fetchMonitors, errors, isLoading } = useMonitors()
  const { isAdmin } = useUser()
  const {
    getStoredMonitorStatus,
    setStoredMonitorStatus,
  } = useStoredMonitorStatus()
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
    type: { value: `standard`, label: `Standard Monitors` },
  })

  const filter = (monitors) => {
    console.log({ type })
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
      setTimeout(() => navigate(`/monitors/add`), 500)
    }
  }, [errors.monitors])

  const { value, onChange } = getSegmentedControlProps(`status`)

  const handleStatusChange = (value) => {
    setStoredMonitorStatus(value)
    onChange(value)
  }

  return (
    <PageContainer width="70%">
      <PageHeading>monitors</PageHeading>
      {isLoading && <FullPageSpinner height={majorScale(40)} />}
      {!isLoading && (
        <Pane>
          <MonitorsToolbar
            handleStatusChange={handleStatusChange}
            statusValue={value}
            statusOptions={statusOptions}
            getCategoriesProps={getMultiSelectMenuProps}
            getTypeProps={getSelectMenuProps}
            typeOptions={typeOptions}
            categoriesButtonText={buttonText}
            categoriesOptions={categoryOptions}
            disableCategories={!filtered || !filtered.length}
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
                <Text size={500}>
                  There are no <Strong size={500}>{status}</Strong> monitors
                  currently available
                </Text>
              </Pane>
            ))}
        </Pane>
      )}
    </PageContainer>
  )
}

export default ViewMonitors
