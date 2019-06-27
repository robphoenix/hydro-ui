import React from 'react'

import { useMonitors } from '../context/monitors-context'
import { useUser } from '../context/user-context'
import CreateMonitorForm from '../components/CreateMonitorForm'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'

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
    <PageContainer width="40%">
      <PageHeading>add monitor</PageHeading>
      <CreateMonitorForm
        initialValues={initialValues}
        createMonitor={addMonitor}
      />
    </PageContainer>
  )
}

export default AddMonitor
