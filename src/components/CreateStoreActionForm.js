import React from 'react'
import { navigate } from '@reach/router'
import { toaster, Pane, Button, majorScale, RadioGroup } from 'evergreen-ui'
import useForm from '../hooks/useForm'
import { ActionHeading, ActionName, ActionDescription } from './actions'

const CreateStoreActionForm = ({ createAction }) => {
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const storeOptions = [
    { label: `Store in Database`, value: `storeDB` },
    { label: `Store Logins`, value: `storeLogins` },
    { label: `Store Analysis`, value: `storeAnalysis` },
  ]

  const initialValues = {
    name: ``,
    description: ``,
    actionType: storeOptions[0].value,
  }

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

  const onSubmit = async (values) => {
    const { name, description, actionType } = values
    const metadata = {}

    await createAction({ name, description, actionType, metadata })
    navigate(`/monitors/view`)
    toaster.success(`Action created: ${values.name}`)
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
        <RadioGroup
          size={16}
          label="Store Options"
          options={storeOptions}
          {...getRadioGroupProps(`actionType`)}
          marginBottom={majorScale(4)}
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

export default CreateStoreActionForm