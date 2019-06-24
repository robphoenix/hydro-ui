import React from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'
import { useUser } from '../context/user-context'
import CreateMonitorForm from '../components/CreateMonitorForm'

const AddMonitor = () => {
  const { addMonitor } = useMonitors()
  const { groups: userGroups } = useUser()

  const initialValues = {
    name: '',
    description: '',
    status: false,
    priority: 'mid',
    query: '',
    cacheWindow: 0,
    groups: userGroups.map((g) => `${g.id}`),
    categories: [],
    newCategories: [],
    actions: [],
  }

  return (
    <Pane display="flex" justifyContent="center" marginBottom={majorScale(4)}>
      <Pane width="30%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Add Monitor
        </Heading>
        <CreateMonitorForm
          initialValues={initialValues}
          createMonitor={addMonitor}
          disableNameInput={false}
        />
      </Pane>
    </Pane>
  )
}

export default AddMonitor
