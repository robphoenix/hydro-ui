import React from 'react'
import {
  toaster,
  TextInputField,
  FormField,
  majorScale,
  Button,
  Pane,
  TagInput,
  TextInput,
} from 'evergreen-ui'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import useForm from '../hooks/useForm'
import { navigate } from '@reach/router'
import ActionName from './ActionName'
import ActionDescription from './ActionDescription'
import ActionHeading from './ActionHeading'

const CreateEmailRateActionForm = ({ createAction }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const initialValues = {
    name: ``,
    description: ``,
    emailAddresses: [],
    emailSubject: ``,
    emailSendLimit: 0,
    emailText: ``,
  }

  const validEmailAddress = (emailAddress) => {
    const regex = new RegExp(/\S+\.\S+@bet365\.com/, `gi`)
    return emailAddress.trim().match(regex)
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
    if (!values.emailAddresses.every(validEmailAddress)) {
      errors.emailAddresses = `All email addresses must be a valid Bet365 email address`
    }
    if (values.emailSubject === ``) {
      errors.emailSubject = `You must specify an email subject`
    }
    return errors
  }

  const onSubmit = async (values) => {
    console.log({ values })

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
    navigate(`/monitors/view`)
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
    <Pane flex="2">
      <ActionHeading>Email Rate</ActionHeading>
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

        <TextInputField
          label="Email Subject"
          placeholder="Email Subject"
          isInvalid={errors.emailSubject && touched.emailSubject}
          validationMessage={touched.emailSubject && errors.emailSubject}
          required
          {...getInputFieldProps(`emailSubject`)}
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

        <ReactQuill {...getQuillEditorProps(`emailText`)} />

        <Button appearance="primary" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </Pane>
  )
}

export default CreateEmailRateActionForm
