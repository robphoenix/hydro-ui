import React from 'react'
import { TextInputField, Button, majorScale, Alert, Pane } from 'evergreen-ui'

import useForm from '../hooks/useForm'
import { useAuth } from '../context/auth-context'

const LoginForm = () => {
  const { login } = useAuth()

  const initialValues = { username: ``, password: `` }
  const onSubmit = async (values) => await login(values)
  const validate = (values) => {
    let errors = {}
    if (values.username === ``) {
      errors.username = `You must enter your Bet365 username`
    }
    if (values.password === ``) {
      errors.password = `You must enter your Bet365 password`
    }
    return errors
  }

  const {
    handleSubmit,
    getInputFieldProps,
    touched,
    errors,
    submitError,
  } = useForm({ initialValues, onSubmit, validate })

  return (
    <form onSubmit={handleSubmit}>
      <Pane marginBottom={majorScale(3)}>
        <TextInputField
          height={majorScale(6)}
          autoFocus
          placeholder="Username"
          label="Username"
          name="username"
          required
          {...getInputFieldProps(`username`)}
          isInvalid={errors.username && touched.username}
          validationMessage={touched.username && errors.username}
        />

        <TextInputField
          placeholder="Password"
          label="Password"
          type="password"
          name="password"
          {...getInputFieldProps(`password`)}
          required
          isInvalid={errors.password && touched.password}
          validationMessage={touched.password && errors.password}
        />
      </Pane>

      <Button
        type="submit"
        appearance="primary"
        textTransform="uppercase"
        letterSpacing="0.1em"
      >
        log in
      </Button>
      {submitError && (
        <Alert
          intent="danger"
          title={submitError.message}
          marginTop={majorScale(4)}
        />
      )}
    </form>
  )
}

export default LoginForm
