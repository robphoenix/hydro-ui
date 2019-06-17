import React from 'react'
import { Pane, majorScale, Heading } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'
import CreateMonitorForm from '../components/CreateMonitorForm'

const DuplicateMonitor = ({ id }) => {
  const { addMonitor, monitor, fetchMonitorById } = useMonitors()
  const [initialValues, setInitialValues] = React.useState({})

  React.useEffect(() => {
    fetchMonitorById(id)
  }, [fetchMonitorById, id])

  React.useEffect(() => {
    if (Object.keys(monitor).length) {
      const { id, name, description, priority, query, cacheWindow } = monitor

      // is the monitor online?
      const status = monitor.status === `online`

      setInitialValues({
        id,
        name: `DUPLICATE ${name}`,
        description,
        status,
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
    <Pane display="flex" justifyContent="center" marginBottom={majorScale(4)}>
      <Pane width="30%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Duplicate Monitor
        </Heading>
        {Object.keys(initialValues).length > 0 && (
          <CreateMonitorForm
            initialValues={initialValues}
            createMonitor={addMonitor}
          />
        )}
      </Pane>
    </Pane>
  )
}

export default DuplicateMonitor
