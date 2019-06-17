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
} from 'evergreen-ui'

import useForm from '../hooks/useForm'

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
    blockPermanently: false,
    blockDuration: ``,
    blockDurationUnit: `minutes`,
    blockDelay: ``,
    blockDelayUnit: `seconds`,
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
    if (!values.blockPermanently && values.blockDuration === ``) {
      errors.blockDuration = `You must specify a block duration or block permanently`
    }
    return errors
  }

  const onSubmit = async (values) => {
    console.log({ values })

    await createAction(values)
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
      <form onSubmit={handleSubmit}>
        <TextInputField
          label="Action Name"
          placeholder="Action Name"
          isInvalid={errors.name && touched.name}
          validationMessage={touched.name && errors.name}
          required
          {...getInputFieldProps('name')}
        />
        <FormField
          label="Action Description"
          isRequired
          validationMessage={touched.description && errors.description}
          labelFor="description"
          marginBottom={majorScale(3)}
        >
          <Textarea
            id="description"
            placeholder="Action description..."
            isInvalid={errors.description && touched.description}
            required
            {...getInputFieldProps('description')}
          />
        </FormField>

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
          labelFor="blockPermanently"
          marginBottom={majorScale(3)}
        >
          <Pane display="flex" alignItems="center">
            <Switch
              id="blockPermanently"
              {...getSwitchFieldProps('blockPermanently')}
              marginRight={majorScale(1)}
            />
          </Pane>
        </FormField>

        {!getSwitchFieldProps(`blockPermanently`).checked && (
          <Pane width="50%">
            <FormField
              label="Block Duration"
              labelFor="blockDuration"
              validationMessage={touched.blockDuration && errors.blockDuration}
              isRequired
              marginBottom={majorScale(3)}
            >
              <Pane display="flex" alignItems="center">
                <TextInput
                  flex="1"
                  id="blockDuration"
                  placeholder="Block Duration"
                  isInvalid={errors.blockDuration && touched.blockDuration}
                  required
                  type="number"
                  min="1"
                  max="60"
                  {...getInputFieldProps(`blockDuration`)}
                  marginRight={majorScale(1)}
                />
                <SegmentedControl
                  flex="1"
                  options={blockDurationUnitOptions}
                  {...getSegmentedControlFieldProps(`blockDurationUnit`)}
                />
              </Pane>
            </FormField>

            <Pane display="flex" alignItems="center">
              <TextInputField
                flex="1"
                label="Block Delay"
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
