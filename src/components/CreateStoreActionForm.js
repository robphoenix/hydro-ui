import React from 'react'
import { navigate } from '@reach/router'
import {
  toaster,
  Pane,
  Button,
  majorScale,
  RadioGroup,
  FormField,
} from 'evergreen-ui'
import useForm from '../hooks/useForm'
import { ActionHeading, ActionName, ActionDescription } from './actions'

const CreateStoreActionForm = ({
  createAction,
  initialValues,
  storeOptions,
}) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const validate = (values) => {
    let errors = {}
    if (values.name === ``) {
      errors.name = `You must enter an Action name`
    }
    if (values.description === ``) {
      errors.description = `You must enter an Action description`
    }
    if (!values.actionType.startsWith(`store`)) {
      errors.actionType = `You must choose a store type`
    }
    return errors
  }

  const onSubmit = (values) => {
    const { id, name, description, actionType } = values
    const metadata = {}

    createAction({ id, name, description, actionType, metadata })
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getRadioGroupProps,
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
      <ActionHeading>Store</ActionHeading>
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
        <FormField
          label="Store Options"
          isRequired
          validationMessage={errors.actionType}
          marginBottom={majorScale(4)}
        >
          <RadioGroup
            isRequired
            id="storeOptions"
            size={16}
            options={storeOptions}
            {...getRadioGroupProps(`actionType`)}
          />
        </FormField>

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

export default CreateStoreActionForm
