import React from 'react'
import { TextInputField, Button, majorScale, Alert } from 'evergreen-ui'

import useForm from '../hooks/useForm'
import { useAuth } from '../context/auth-context'

const LoginForm = () => {
  const { login } = useAuth()

  const initialValues = { username: '', password: '' }
  const onSubmit = async (values) => await login(values)
  const validate = (values) => {
    let errors = {}
    if (values.username === '') {
      errors.username = 'You must enter your Bet365 username'
    }
    if (values.password === '') {
      errors.password = 'You must enter your Bet365 password'
    }
    return errors
  }

  const { handleSubmit, getFieldProps, touched, errors, submitError } = useForm(
    { initialValues, onSubmit, validate },
  )

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        autoFocus
        placeholder="Username"
        label="Username"
        name="username"
        required
        {...getFieldProps('username')}
        isInvalid={errors.username && touched.username}
        validationMessage={touched.username && errors.username}
      />

      <TextInputField
        placeholder="Password"
        label="Password"
        type="password"
        name="password"
        {...getFieldProps('password')}
        required
        isInvalid={errors.password && touched.password}
        validationMessage={touched.password && errors.password}
      />

      <Button type="submit" appearance="primary">
        LOG IN
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
