import React from 'react'

import { useMonitors } from '../context/monitors-context'
import CreateMonitorForm from '../components/CreateMonitorForm'
import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'

const EditMonitor = ({ id }) => {
  const { updateMonitor, monitor, fetchMonitorById } = useMonitors()
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

  return (
    <PageContainer width="40%">
      <PageHeading>edit monitor</PageHeading>
      {Object.keys(initialValues).length > 0 && (
        <CreateMonitorForm
          disableNameInput
          initialValues={initialValues}
          createMonitor={updateMonitor}
        />
      )}
    </PageContainer>
  )
}

export default EditMonitor
