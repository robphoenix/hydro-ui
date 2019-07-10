import React from 'react'
import { Pane, UnorderedList, ListItem, Button } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'
import CreateBlockActionForm from '../components/CreateBlockActionForm'
import CreateEmailRateActionForm from '../components/CreateEmailRateActionForm'
import CreateEmailBatchActionForm from '../components/CreateEmailBatchActionForm'
import CreateEmailAlertActionForm from '../components/CreateEmailAlertActionForm'
import CreateMiscActionForm from '../components/CreateMiscActionForm'
import CreateStoreActionForm from '../components/CreateStoreActionForm'
import PageContainer from '../components/PageContainer'
import PageHeading from '../components/PageHeading'

const AddAction = () => {
  const [actionType, setActionType] = React.useState(`block`)
  const { addAction } = useMonitors()

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

  // These cover all possible values used by the different action types, they're
  // not necessarily used in every form
  const initialValues = {
    name: '',
    description: '',
    parameters: [],
    permanently: false,
    blockTime: ``,
    blockTimeUnit: `minutes`,
    blockDelay: ``,
    blockDelayUnit: ``,
    emailAddresses: [],
    emailSubject: ``,
    emailSendLimit: 0,
    emailText: ``,
    emailCron: ``,
    actionType: storeOptions[0].value,
  }

  return (
    <PageContainer width="50%">
      <PageHeading>add action</PageHeading>
      <Pane display="flex" width="100%">
        <UnorderedList listStyle="none" flex="1">
          {actionTypeOptions.map((option) => (
            <ListItem key={option.value}>
              <Button
                type="button"
                appearance="minimal"
                color="muted"
                onClick={() => setActionType(option.value)}
              >
                {option.label}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
        <Pane flex="3">
          {actionType === `block` && (
            <CreateBlockActionForm
              createAction={addAction}
              initialValues={initialValues}
            />
          )}
          {actionType === `emailRate` && (
            <CreateEmailRateActionForm
              createAction={addAction}
              initialValues={initialValues}
              validateEmailAddress={validateEmailAddress}
            />
          )}
          {actionType === `emailBatch` && (
            <CreateEmailBatchActionForm
              createAction={addAction}
              initialValues={initialValues}
              validateEmailAddress={validateEmailAddress}
            />
          )}
          {actionType === `emailAlert` && (
            <CreateEmailAlertActionForm
              createAction={addAction}
              initialValues={initialValues}
              validateEmailAddress={validateEmailAddress}
            />
          )}
          {actionType === `store` && (
            <CreateStoreActionForm
              createAction={addAction}
              initialValues={initialValues}
              storeOptions={storeOptions}
            />
          )}
          {actionType === `misc` && (
            <CreateMiscActionForm
              createAction={addAction}
              initialValues={initialValues}
            />
          )}
        </Pane>
      </Pane>
    </PageContainer>
  )
}

export default AddAction
