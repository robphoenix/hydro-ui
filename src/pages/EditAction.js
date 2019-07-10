import React from 'react'
import { Pane, UnorderedList, ListItem, Button, toaster } from 'evergreen-ui'

import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'
import { useMonitors } from '../context/monitors-context'
import CreateBlockActionForm from '../components/CreateBlockActionForm'
import CreateEmailRateActionForm from '../components/CreateEmailRateActionForm'
import CreateEmailBatchActionForm from '../components/CreateEmailBatchActionForm'
import CreateEmailAlertActionForm from '../components/CreateEmailAlertActionForm'
import CreateStoreActionForm from '../components/CreateStoreActionForm'
import CreateMiscActionForm from '../components/CreateMiscActionForm'
import { navigate } from '@reach/router'

const EditAction = ({ id }) => {
  const { fetchActionById, action, updateAction } = useMonitors()
  const [selectedActionType, setSelectedActionType] = React.useState(``)
  const [initialValues, setInitialValues] = React.useState({})

  const storeOptions = [
    { label: `Store in Database`, value: `storeDB` },
    { label: `Store Logins`, value: `storeLogins` },
    { label: `Store Analysis`, value: `storeAnalysis` },
  ]

  const actionTypeOptions = [
    { label: `Block`, value: `block` },
    { label: `Email Rate`, value: `emailRate` },
    { label: `Email Batch`, value: `emailBatch` },
    { label: `Email Alert`, value: `emailAlert` },
    { label: `Store`, value: `store` },
    { label: `Miscellaneous`, value: `misc` },
  ]

  const validateEmailAddress = (emailAddress) => {
    const regex = new RegExp(/\S+\.\S+@bet365\.com/, `gi`)
    return emailAddress.trim().match(regex)
  }

  React.useEffect(() => {
    if (Object.keys(action).length) {
      const { id, name, description, metadata, actionType } = action
      setSelectedActionType(actionType)

      const {
        parameters,
        blockTime,
        blockTimeUnit,
        blockDelay,
        blockDelayUnit,
        emailAddresses,
        emailSubject,
        emailSendLimit,
        emailText,
        emailCron,
      } = metadata

      setInitialValues({
        id,
        name,
        description,
        actionType,
        parameters: parameters || [],
        permanently: (blockTime && blockTime === -1) || false,
        blockTime: blockTime || ``,
        blockTimeUnit: blockTimeUnit || `minutes`,
        blockDelay: blockDelay || ``,
        blockDelayUnit: blockDelayUnit || ``,
        emailAddresses: (emailAddresses && emailAddresses.split(`;`)) || [],
        emailSubject: emailSubject || ``,
        emailSendLimit: emailSendLimit || 0,
        emailText: emailText || ``,
        emailCron: emailCron || ``,
      })
    }
  }, [action])

  React.useEffect(() => {
    fetchActionById(id)
  }, [fetchActionById, id])

  const createAction = async (action) => {
    await updateAction(action)
    navigate(`/actions/view`)
    toaster.success(`Action updated: ${action.name}`)
  }

  return (
    <PageContainer width="50%">
      <PageHeading>edit action</PageHeading>
      <Pane display="flex" width="100%">
        <UnorderedList listStyle="none" flex="1">
          {actionTypeOptions.map((option) => (
            <ListItem key={option.value}>
              <Button
                type="button"
                appearance="minimal"
                color="muted"
                onClick={() => setSelectedActionType(option.value)}
              >
                {option.label}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>

        {!!Object.keys(initialValues).length && (
          <Pane flex="3">
            {selectedActionType === `block` && (
              <CreateBlockActionForm
                createAction={createAction}
                initialValues={initialValues}
              />
            )}
            {selectedActionType === `emailRate` && (
              <CreateEmailRateActionForm
                createAction={createAction}
                initialValues={initialValues}
                validateEmailAddress={validateEmailAddress}
              />
            )}
            {selectedActionType === `emailBatch` && (
              <CreateEmailBatchActionForm
                createAction={createAction}
                initialValues={initialValues}
                validateEmailAddress={validateEmailAddress}
              />
            )}
            {selectedActionType === `emailAlert` && (
              <CreateEmailAlertActionForm
                createAction={createAction}
                initialValues={initialValues}
                validateEmailAddress={validateEmailAddress}
              />
            )}
            {selectedActionType && selectedActionType.startsWith(`store`) && (
              <CreateStoreActionForm
                createAction={createAction}
                initialValues={initialValues}
                storeOptions={storeOptions}
              />
            )}
            {selectedActionType === `misc` && (
              <CreateMiscActionForm
                createAction={createAction}
                initialValues={initialValues}
              />
            )}
          </Pane>
        )}
      </Pane>
    </PageContainer>
  )
}

export default EditAction
