import React from 'react'
import { Pane, majorScale, Heading } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'
import CreateMonitorForm from '../components/CreateMonitorForm'

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
        actions,
      } = monitor

      // is the monitor online?
      const status = monitor.status === `online`

      setInitialValues({
        id,
        name,
        description,
        status,
        priority,
        query,
        cacheWindow,
        groups: monitor.groups.map((group) => `${group.id}`),
        categories: monitor.categories.map((category) => `${category.id}`),
        newCategories: [],
        actions,
      })
    }
  }, [monitor])

  return (
    <Pane display="flex" justifyContent="center" marginBottom={majorScale(4)}>
      <Pane width="30%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Edit Monitor
        </Heading>
        {Object.keys(initialValues).length > 0 && (
          <CreateMonitorForm
            disableNameInput
            initialValues={initialValues}
            createMonitor={updateMonitor}
          />
        )}
      </Pane>
    </Pane>
  )
}

export default EditMonitor
