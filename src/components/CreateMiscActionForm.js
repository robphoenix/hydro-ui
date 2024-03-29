import React from 'react'
import { navigate } from '@reach/router'
import { toaster, Pane, majorScale, Button } from 'evergreen-ui'
import useForm from '../hooks/useForm'
import { ActionHeading, ActionName, ActionDescription } from './actions'

const CreateMiscActionForm = ({ createAction, initialValues }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const validate = (values) => {
    let errors = {}
    if (values.name === ``) {
      errors.name = `You must enter an Action name`
    }
    if (values.description === ``) {
      errors.description = `You must enter an Action description`
    }
    return errors
  }

  const onSubmit = (values) => {
    const { id, name, description } = values
    const actionType = `misc`

    // the api call will fail without a metadata object
    createAction({ id, name, description, actionType, metadata: {} })
  }

  const {
    handleSubmit,
    getInputFieldProps,
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
      <ActionHeading>Miscellaneous</ActionHeading>
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

export default CreateMiscActionForm
