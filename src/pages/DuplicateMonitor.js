import React from 'react'

import { useMonitors } from '../context/monitors-context'
import CreateMonitorForm from '../components/CreateMonitorForm'
import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'
import { navigate } from '@reach/router'
import { toaster } from 'evergreen-ui'

const DuplicateMonitor = ({ id }) => {
  const { addMonitor, monitor, fetchMonitorById } = useMonitors()
  const [initialValues, setInitialValues] = React.useState({})

  React.useEffect(() => {
    fetchMonitorById(id)
  }, [fetchMonitorById, id])

  React.useEffect(() => {
    if (Object.keys(monitor).length) {
      const {
        id,
        name,
        description,
        priority,
        query,
        cacheWindow,
        type,
      } = monitor

      // is the monitor online?
      const status = monitor.status === `online`

      setInitialValues({
        id,
        name: `DUPLICATE ${name}`,
        description,
        status,
        type,
        priority,
        query,
        cacheWindow,
        groups: monitor.groups.map((group) => `${group.id}`),
        categories: monitor.categories.map((category) => `${category.id}`),
        newCategories: [],
        actions: monitor.actions.map((action) => `${action.id}`),
      })
    }
  }, [monitor])

  const createMonitor = async (monitor) => {
    try {
      const response = await addMonitor(monitor)
      navigate(`/monitors/${response.id}`)
      toaster.success(`Monitor created: ${response.name}`)
    } catch (error) {
      const { message, cause } = error
      toaster.warning(message, { description: cause })
    }
  }

  return (
    <PageContainer width="40%">
      <PageHeading>duplicate monitor</PageHeading>
      {Object.keys(initialValues).length > 0 && (
        <CreateMonitorForm
          initialValues={initialValues}
          createMonitor={createMonitor}
        />
      )}
    </PageContainer>
  )
}

export default DuplicateMonitor
