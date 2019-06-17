import React from 'react'
import { useMonitors } from '../context/monitors-context'
import { Pane, majorScale, Heading, RadioGroup } from 'evergreen-ui'
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
          <RadioGroup
            flex="1"
            marginTop={40}
            size={16}
            label="Action Type"
            value={actionType}
            options={actionTypeOptions}
            onChange={(value) => setActionType(value)}
          />
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
