import React from 'react'

import CreateMonitorForm from '../components/CreateMonitorForm'
import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'
import { navigate } from '@reach/router'
import { toaster } from 'evergreen-ui'
import useMonitor from '../hooks/useMonitor'
import { updateMonitor } from '../utils/monitors-client'

const EditMonitor = ({ id }) => {
  const { monitor, fetchMonitorById } = useMonitor()
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
        name,
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
      await updateMonitor(monitor)
      navigate(`/monitors/${id}`)
      toaster.success(`Monitor updated: ${monitor.name}`)
    } catch (error) {
      const { message, cause } = error
      toaster.warning(message, { description: cause })
    }
  }

  return (
    <PageContainer width="40%">
      <PageHeading>edit monitor</PageHeading>
      {Object.keys(initialValues).length > 0 && (
        <CreateMonitorForm
          disableNameInput
          initialValues={initialValues}
          createMonitor={createMonitor}
        />
      )}
    </PageContainer>
  )
}

export default EditMonitor
