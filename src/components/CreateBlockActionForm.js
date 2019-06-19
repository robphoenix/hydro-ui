import React from 'react'
import {
  toaster,
  TextInputField,
  FormField,
  majorScale,
  Textarea,
  Button,
  Pane,
  SelectMenu,
  Position,
  Switch,
  SegmentedControl,
  TextInput,
  Heading,
} from 'evergreen-ui'
import { navigate } from '@reach/router'

import useForm from '../hooks/useForm'
import ActionName from './ActionName'
import ActionDescription from './ActionDescription'

const CreateBlockActionForm = ({ createAction }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const parameterOptions = [
    { label: `IP Address`, value: `sip` },
    { label: `IP Range`, value: `ipRange` },
    { label: `Session token`, value: `stk` },
    { label: `Response Session Token`, value: `rstk` },
    { label: `UQ ID`, value: `uqid` },
    { label: `User Name`, value: `uname` },
    { label: `User Agent`, value: `userAgent` },
    { label: `X-Forwarded-For`, value: `xForwardedFor` },
  ]

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
    <Pane flex="2">
      <Heading is="h3" size={600} marginBottom={majorScale(3)}>
        Block
      </Heading>
      <form onSubmit={handleSubmit}>
        <ActionName
          formProps={getInputFieldProps(`name`)}
          error={errors.name}
          touched={touched.name}
        />
        <ActionDescription
          formProps={getInputFieldProps(`description`)}
          error={errors.description}
          touched={touched.description}
        />

        <FormField
          label="Parameters"
          labelFor="parameters"
          marginBottom={majorScale(3)}
          isRequired
          validationMessage={touched.parameters && errors.parameters}
        >
          <SelectMenu
            hasTitle={false}
            hasFilter={false}
            isMultiSelect
            position={Position.BOTTOM_LEFT}
            title="Select parameters"
            options={parameterOptions}
            {...getSelectMenuProps(`parameters`)}
            width={400}
          >
            <Button type="button" {...getInputFieldProps(`parameters`)}>
              {getSelectMenuProps(`parameters`) &&
              getSelectMenuProps(`parameters`).selected.length
                ? `${
                    getSelectMenuProps(`parameters`).selected.length
                  } parameter${
                    getSelectMenuProps(`parameters`).selected.length > 1
                      ? `s`
                      : ``
                  } selected`
                : `Select Parameters`}
            </Button>
          </SelectMenu>
        </FormField>

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

        <Button appearance="primary" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </Pane>
  )
}

export default CreateBlockActionForm
