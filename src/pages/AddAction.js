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
            <CreateBlockActionForm createAction={addAction} />
          )}
          {actionType === `emailRate` && (
            <CreateEmailRateActionForm
              createAction={addAction}
              validateEmailAddress={validateEmailAddress}
            />
          )}
          {actionType === `emailBatch` && (
            <CreateEmailBatchActionForm
              createAction={addAction}
              validateEmailAddress={validateEmailAddress}
            />
          )}
          {actionType === `emailAlert` && (
            <CreateEmailAlertActionForm
              createAction={addAction}
              validateEmailAddress={validateEmailAddress}
            />
          )}
          {actionType === `store` && (
            <CreateStoreActionForm createAction={addAction} />
          )}
          {actionType === `misc` && (
            <CreateMiscActionForm createAction={addAction} />
          )}
        </Pane>
      </Pane>
    </PageContainer>
  )
}

export default AddAction
