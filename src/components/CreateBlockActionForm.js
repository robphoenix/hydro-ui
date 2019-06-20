import React from 'react'
import {
  toaster,
  FormField,
  majorScale,
  Button,
  Pane,
  Switch,
  SegmentedControl,
  TextInput,
} from 'evergreen-ui'
import { navigate } from '@reach/router'

import useForm from '../hooks/useForm'
import {
  ActionName,
  ActionDescription,
  ActionHeading,
  ActionParameters,
} from './actions'

const CreateBlockActionForm = ({ createAction }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const blockDurationUnitOptions = [
    { label: `Minutes`, value: `minutes` },
    { label: `Hours`, value: `hours` },
    { label: `Days`, value: `days` },
  ]

  const blockDelayUnitOptions = [
    { label: `Seconds`, value: `seconds` },
    { label: `Minutes`, value: `minutes` },
    { label: `Hours`, value: `hours` },
  ]

  const initialValues = {
    name: '',
    description: '',
    parameters: [],
    permanently: false,
    blockTime: ``,
    blockTimeUnit: `minutes`,
    blockDelay: ``,
    blockDelayUnit: ``,
  }

  const validate = (values) => {
    let errors = {}
    if (values.name === ``) {
      errors.name = `You must enter an Action name`
    }
    if (values.description === ``) {
      errors.description = `You must enter an Action description`
    }
    if (values.parameters && !values.parameters.length) {
      errors.parameters = `You must choose at least one parameter to block on`
    }
    if (!values.permanently && values.blockTime === ``) {
      errors.blockTime = `You must specify a block duration or block permanently`
    }
    if (values.blockDelay !== `` && values.blockDelayUnit === ``) {
      errors.blockDelayUnit = `You must specify a unit for the block delay`
    }
    return errors
  }

  const onSubmit = async (values) => {
    const {
      name,
      description,
      permanently,
      blockTime,
      blockTimeUnit,
      blockDelay,
      blockDelayUnit,
      parameters,
    } = values
    const actionType = `block`
    const metadata = permanently
      ? {
          blockTime: -1,
          parameters,
        }
      : {
          blockTime,
          blockTimeUnit,
          blockDelay,
          blockDelayUnit,
          parameters,
        }

    await createAction({ name, description, actionType, metadata })
    navigate(`/monitors/view`)
    toaster.success(`Action created: ${name}`)
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getSelectMenuProps,
    getSwitchFieldProps,
    getSegmentedControlFieldProps,
    errors,
    touched,
    submitError,
  } = useForm({
    initialValues,
    onSubmit,
    validate,
  })

  React.useEffect(() => {
    setDisableSubmit(!!Object.keys(errors).length)
  }, [errors])

  React.useEffect(() => {
    if (submitError) {
      const { message, cause, uuid } = submitError
      toaster.danger(message, {
        description: `${cause}  [Error id: ${uuid}]`,
      })
    }
  }, [submitError])

  return (
    <Pane>
      <ActionHeading>Block</ActionHeading>
      <form onSubmit={handleSubmit}>
        <ActionName
          formProps={getInputFieldProps(`name`)}
          isInvalid={errors.name && touched.name}
          validationMessage={touched.name && errors.name}
        />
        <ActionDescription
          formProps={getInputFieldProps(`description`)}
          isInvalid={errors.description && touched.description}
          validationMessage={touched.description && errors.description}
        />
        <ActionParameters
          selectMenuProps={getSelectMenuProps(`parameters`)}
          inputFieldProps={getInputFieldProps(`parameters`)}
          validationMessage={touched.parameters && errors.parameters}
        />

        <FormField
          label="Block Permanently"
          labelFor="permanently"
          marginBottom={majorScale(3)}
        >
          <Pane display="flex" alignItems="center">
            <Switch
              id="permanently"
              {...getSwitchFieldProps('permanently')}
              marginRight={majorScale(1)}
            />
          </Pane>
        </FormField>

        {!getSwitchFieldProps(`permanently`).checked && (
          <Pane width="50%">
            <FormField
              label="Block Duration"
              labelFor="blockTime"
              validationMessage={touched.blockTime && errors.blockTime}
              isRequired
              marginBottom={majorScale(3)}
            >
              <Pane display="flex" alignItems="center">
                <TextInput
                  flex="1"
                  id="blockTime"
                  placeholder="Block Duration"
                  isInvalid={errors.blockTime && touched.blockTime}
                  required
                  type="number"
                  min="1"
                  max="60"
                  {...getInputFieldProps(`blockTime`)}
                  marginRight={majorScale(1)}
                />
                <SegmentedControl
                  flex="1"
                  options={blockDurationUnitOptions}
                  {...getSegmentedControlFieldProps(`blockTimeUnit`)}
                />
              </Pane>
            </FormField>

            <FormField
              label="Block Delay"
              labelFor="blockDelay"
              validationMessage={touched.blockDelay && errors.blockDelayUnit}
              marginBottom={majorScale(3)}
            >
              <Pane display="flex" alignItems="center">
                <TextInput
                  flex="1"
                  id="blockDelay"
                  placeholder="Block Delay"
                  type="number"
                  min="1"
                  max="60"
                  {...getInputFieldProps(`blockDelay`)}
                  marginRight={majorScale(1)}
                />
                <SegmentedControl
                  flex="1"
                  options={blockDelayUnitOptions}
                  {...getSegmentedControlFieldProps(`blockDelayUnit`)}
                />
              </Pane>
            </FormField>
          </Pane>
        )}

        <Button
          appearance="primary"
          disabled={disableSubmit}
          marginRight={majorScale(2)}
        >
          Submit
        </Button>
        <Button
          type="button"
          intent="danger"
          onClick={() => navigate(`/monitors/view`)}
        >
          Cancel
        </Button>
      </form>
    </Pane>
  )
}

export default CreateBlockActionForm
