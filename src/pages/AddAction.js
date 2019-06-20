import React from 'react'
import {
  Pane,
  majorScale,
  Heading,
  UnorderedList,
  ListItem,
  Button,
} from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'
import CreateBlockActionForm from '../components/CreateBlockActionForm'
import CreateEmailRateActionForm from '../components/CreateEmailRateActionForm'
import CreateEmailBatchActionForm from '../components/CreateEmailBatchActionForm'
import CreateEmailAlertActionForm from '../components/CreateEmailAlertActionForm'
import CreateMiscActionForm from '../components/CreateMiscActionForm'

const AddAction = () => {
  const [actionType, setActionType] = React.useState(`block`)
  const { addAction } = useMonitors()

  const actionTypeOptions = [
    { label: `Block`, value: `block` },
    { label: `Email Rate`, value: `emailRate` },
    { label: `Email Batch`, value: `emailBatch` },
    { label: `Email Alert`, value: `emailAlert` },
    { label: `Store`, value: `store` },
    // { label: `Store in Database`, value: `storeDb` },
    // { label: `Store Logins`, value: `storeLogins` },
    // { label: `Store Analysis`, value: `storeAnalysis` },
    { label: `Miscellaneous`, value: `misc` },
  ]

  const validateEmailAddress = (emailAddress) => {
    const regex = new RegExp(/\S+\.\S+@bet365\.com/, `gi`)
    return emailAddress.trim().match(regex)
  }

  return (
    <Pane display="flex" justifyContent="center" marginBottom={majorScale(4)}>
      <Pane width="50%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Add Action
        </Heading>
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
            {actionType === `misc` && (
              <CreateMiscActionForm createAction={addAction} />
            )}
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  )
}

export default AddAction
