import React from 'react'
import {
  toaster,
  TextInputField,
  FormField,
  majorScale,
  Textarea,
  Button,
  Pane,
  TagInput,
} from 'evergreen-ui'

import useForm from '../hooks/useForm'

const CreateEmailRateActionForm = ({ createAction }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const initialValues = {
    name: '',
    description: '',
    emailAddresses: [],
  }

  const validEmailAddress = (emailAddress) => {
    const regex = new RegExp(/\S+\.\S+@bet365\.com/, 'gi')
    return emailAddress.trim().match(regex)
  }

  const validate = (values) => {
    let errors = {}
    if (values.name === '') {
      errors.name = `You must enter an Action name`
    }
    if (values.description === '') {
      errors.description = `You must enter an Action description`
    }
    if (values.emailAddresses && !values.emailAddresses.length) {
      errors.emailAddresses = `You must provide at least one email address`
    }
    if (!values.emailAddresses.every(validEmailAddress)) {
      errors.emailAddresses = `All email addresses must be a valid Bet365 email address`
    }
    return errors
  }

  const onSubmit = async (values) => {
    const emailAddresses = values.emailAddresses.join(`;`)
    console.log(emailAddresses)

    console.log({ values })

    await createAction(values)
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getTagInputFieldProps,
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
          label="Email Addresses"
          isRequired
          labelFor="emailAddresses"
          validationMessage={touched.emailAddresses && errors.emailAddresses}
          marginBottom={majorScale(3)}
        >
          <TagInput
            width="100%"
            id="emailAddresses"
            inputProps={{ placeholder: 'Add email addresses...' }}
            tagProps={(value) =>
              !validEmailAddress(value) ? { color: 'red', isSolid: true } : {}
            }
            {...getTagInputFieldProps(`emailAddresses`)}
          />
        </FormField>

        <Button appearance="primary" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </Pane>
  )
}

export default CreateEmailRateActionForm
