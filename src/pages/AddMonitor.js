import React from 'react'

import { useUser } from '../context/user-context'
import CreateMonitorForm from '../components/CreateMonitorForm'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'
import { navigate } from '@reach/router'
import { toaster } from 'evergreen-ui'
import { addMonitor } from '../utils/monitors-client'

const AddMonitor = () => {
  const { userGroups } = useUser()

  const initialValues = {
    name: ``,
    description: ``,
    status: false,
    type: `standard`,
    priority: `mid`,
    query: ``,
    cacheWindow: 0,
    groups: userGroups.map((g) => `${g.id}`),
    categories: [],
    newCategories: [],
    actions: [],
  }

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
      <PageHeading>add monitor</PageHeading>
      <CreateMonitorForm
        initialValues={initialValues}
        createMonitor={createMonitor}
      />
    </PageContainer>
  )
}

export default AddMonitor
