import React from 'react'
import { TextInputField } from 'evergreen-ui'

const ActionName = ({ formProps, error, touched }) => {
  return (
    <TextInputField
      label="Action Name"
      placeholder="Action Name"
      isInvalid={error && touched}
      validationMessage={touched && error}
      required
      {...formProps}
    />
  )
}

export default ActionName
