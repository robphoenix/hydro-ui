import React from 'react'
import useForm from '../hooks/useForm'
import { Pane, toaster, Button, majorScale } from 'evergreen-ui'
import {
  ActionHeading,
  ActionName,
  ActionDescription,
  ActionEmailSubject,
  ActionEmailText,
  ActionEmailAddresses,
} from './actions'
import ActionParameters from './actions/ActionParameters'
import { navigate } from '@reach/router'

const CreateEmailAlertActionForm = ({ createAction, validateEmailAddress }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const initialValues = {
    name: '',
    description: '',
    parameters: [],
    emailAddresses: [],
    emailSubject: ``,
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
    if (values.parameters && !values.parameters.length) {
      errors.parameters = `You must choose at least one parameter to block on`
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
    const { name, description, parameters, emailSubject, emailText } = values
    const actionType = `emailAlert`
    const metadata = { emailAddresses, emailSubject, emailText, parameters }
    await createAction({ name, description, actionType, metadata })
    navigate(`/monitors/view`)
    toaster.success(`Action created: ${name}`)
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getSelectMenuProps,
    getQuillEditorProps,
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
    <Pane>
      <ActionHeading>Email Alert</ActionHeading>
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
          onClick={() => navigate(`/monitors/view`)}
        >
          Cancel
        </Button>
      </form>
    </Pane>
  )
}

export default CreateEmailAlertActionForm
