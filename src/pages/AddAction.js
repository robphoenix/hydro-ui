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

const AddAction = () => {
  const [actionType, setActionType] = React.useState(`block`)
  const { addAction } = useMonitors()

  const actionTypeOptions = [
    { label: `Block`, value: `block` },
    { label: `Email Rate`, value: `emailRate` },
    { label: `Email Batch`, value: `emailBatch` },
    { label: `Email Alert`, value: `emailAlert` },
    { label: `Store in Database`, value: `storeDb` },
    { label: `Store Logins`, value: `storeLogins` },
    { label: `Store Analysis`, value: `storeAnalysis` },
    { label: `Miscellaneous`, value: `misc` },
  ]

  return (
    <Pane display="flex" justifyContent="center" marginBottom={majorScale(4)}>
      <Pane width="60%">
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
          {actionType === 'block' && (
            <CreateBlockActionForm createAction={addAction} />
          )}
          {actionType === 'emailRate' && (
            <CreateEmailRateActionForm createAction={addAction} />
          )}
        </Pane>
      </Pane>
    </Pane>
  )
}

export default AddAction
