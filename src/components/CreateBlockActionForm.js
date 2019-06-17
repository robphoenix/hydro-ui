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
} from 'evergreen-ui'

import useForm from '../hooks/useForm'

const CreateBlockActionForm = ({ createAction }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)
  const [parametersTouched, setParametersTouched] = React.useState(false)

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

  const initialValues = {
    name: '',
    description: '',
    parameters: [],
  }

  const validate = (values) => {
    let errors = {}
    if (values.name === '') {
      errors.name = `You must enter an Action name`
    }
    if (values.description === '') {
      errors.description = `You must enter an Action description`
    }
    if (values.parameters && !values.parameters.length) {
      errors.parameters = `You must choose at least one parameter to block on`
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
              Select parameters
            </Button>
          </SelectMenu>
        </FormField>

        <Button appearance="primary" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </Pane>
  )
}

export default CreateBlockActionForm
