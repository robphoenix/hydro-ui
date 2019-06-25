import React from 'react'
import {
  toaster,
  FormField,
  majorScale,
  Button,
  Pane,
  TextInput,
} from 'evergreen-ui'
import { navigate } from '@reach/router'

import useForm from '../hooks/useForm'
import {
  ActionName,
  ActionDescription,
  ActionHeading,
  ActionEmailText,
  ActionEmailAddresses,
  ActionEmailSubject,
} from './actions'

const CreateEmailRateActionForm = ({ createAction, validateEmailAddress }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const initialValues = {
    name: ``,
    description: ``,
    emailAddresses: [],
    emailSubject: ``,
    emailSendLimit: 0,
    emailText: ``,
  }

  const validate = (values) => {
    let errors = {}
    if (values.name === ``) {
      errors.name = `You must enter an Action name`
    }
    if (values.description === ``) {
      errors.description = `You must enter an Action description`
    }
    if (values.emailAddresses && !values.emailAddresses.length) {
      errors.emailAddresses = `You must provide at least one email address`
    }
    if (!values.emailAddresses.every(validateEmailAddress)) {
      errors.emailAddresses = `All email addresses must be a valid Bet365 email address`
    }
    if (values.emailSubject === ``) {
      errors.emailSubject = `You must specify an email subject`
    }
    if (values.emailText === ``) {
      errors.emailText = `You must provide an email text`
    }
    return errors
  }

  const onSubmit = async (values) => {
    const emailAddresses = values.emailAddresses.join(`;`)
    const emailSendLimit = +values.emailSendLimit
    const actionType = `emailRate`
    const { name, description, emailSubject, emailText } = values
    const metadata = { emailAddresses, emailSubject, emailSendLimit, emailText }

    await createAction({
      name,
      description,
      actionType,
      metadata,
    })
    navigate(`/actions/view`)
    toaster.success(`Action created: ${name}`)
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getTagInputFieldProps,
    getQuillEditorProps,
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
      <ActionHeading>Email Rate</ActionHeading>
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
        <ActionEmailAddresses
          formProps={getTagInputFieldProps(`emailAddresses`)}
          validationMessage={touched.emailAddresses && errors.emailAddresses}
          validate={validateEmailAddress}
        />
        <ActionEmailSubject
          formProps={getInputFieldProps(`emailSubject`)}
          isInvalid={errors.emailSubject && touched.emailSubject}
          validationMessage={touched.emailSubject && errors.emailSubject}
        />

        <FormField
          label="Email Send Limit"
          labelFor="emailSendLimit"
          description="The maximum number of emails to send out in any single hour, this
            resets after every hour. Use -1 to specify an unlimited number of
            emails per hour."
          marginBottom={majorScale(3)}
        >
          <TextInput
            flex="1"
            id="emailSendLimit"
            placeholder="Email Send Limit"
            type="number"
            min="-1"
            {...getInputFieldProps(`emailSendLimit`)}
            marginRight={majorScale(1)}
          />
        </FormField>

        <ActionEmailText
          formProps={getQuillEditorProps(`emailText`)}
          error={errors.emailText}
          touched={touched.emailText}
        />

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
          onClick={() => navigate(`/actions/view`)}
        >
          Cancel
        </Button>
      </form>
    </Pane>
  )
}

export default CreateEmailRateActionForm
