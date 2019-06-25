import React from 'react'
import {
  toaster,
  Pane,
  TextInputField,
  majorScale,
  Button,
  Paragraph,
} from 'evergreen-ui'
import { navigate } from '@reach/router'

import {
  ActionHeading,
  ActionName,
  ActionDescription,
  ActionEmailAddresses,
  ActionEmailText,
  ActionEmailSubject,
} from './actions'
import useForm from '../hooks/useForm'

const CreateEmailBatchActionForm = ({ createAction, validateEmailAddress }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const initialValues = {
    name: ``,
    description: ``,
    emailAddresses: [],
    emailSubject: ``,
    emailText: ``,
    emailCron: ``,
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
    if (values.emailCron === ``) {
      errors.emailCron = `You must provide a valid cron expression`
    }
    return errors
  }

  const onSubmit = async (values) => {
    const emailAddresses = values.emailAddresses.join(`;`)
    const actionType = `emailRate`
    const { name, description, emailSubject, emailText } = values
    const metadata = { emailAddresses, emailSubject, emailText }

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
      <ActionHeading>Email Batch</ActionHeading>
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

        <TextInputField
          label="Email Cron Expression"
          placeholder="Email Cron Expression"
          description={
            <Paragraph marginBottom={majorScale(2)}>
              Batch together all events and send when the cron expression
              triggers. Automatically adds the event time to each row in the
              table.
              <a
                href="http://www.cronmaker.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Generate Cron Expression
              </a>
            </Paragraph>
          }
          isInvalid={errors.emailCron && touched.emailCron}
          validationMessage={touched.emailCron && errors.emailCron}
          required
          {...getInputFieldProps(`emailCron`)}
        />

        <ActionEmailSubject
          formProps={getInputFieldProps(`emailSubject`)}
          isInvalid={errors.emailSubject && touched.emailSubject}
          validationMessage={touched.emailSubject && errors.emailSubject}
        />

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

export default CreateEmailBatchActionForm
