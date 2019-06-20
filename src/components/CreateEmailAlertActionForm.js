import React from 'react'
import useForm from '../hooks/useForm'
import { Pane, toaster, Button } from 'evergreen-ui'
import { ActionHeading, ActionName, ActionDescription } from './actions'
import ActionParameters from './actions/ActionParameters'

const CreateEmailAlertActionForm = ({ createAction }) => {
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

  const initialValues = {
    name: '',
    description: '',
    parameters: [],
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
    return errors
  }

  const onSubmit = async (values) => {
    console.log({ values })

    // const {
    //   name,
    //   description,
    //   parameters,
    // } = values
    // await createAction({ name, description, actionType, metadata })
    // navigate(`/monitors/view`)
    // toaster.success(`Action created: ${name}`)
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

        <Button appearance="primary" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </Pane>
  )
}

export default CreateEmailAlertActionForm
