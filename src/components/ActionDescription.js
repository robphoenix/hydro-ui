import React from 'react'
import { FormField, majorScale, Textarea } from 'evergreen-ui'

const ActionDescription = ({ formProps, error, touched }) => {
  return (
    <FormField
      label="Action Description"
      isRequired
      validationMessage={touched && error}
      labelFor="description"
      marginBottom={majorScale(3)}
    >
      <Textarea
        id="description"
        placeholder="Action description..."
        isInvalid={error && touched}
        required
        {...formProps}
      />
    </FormField>
  )
}

export default ActionDescription
