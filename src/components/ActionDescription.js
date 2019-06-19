import React from 'react'
import { FormField, majorScale, Textarea } from 'evergreen-ui'

const ActionDescription = ({ formProps, isInvalid, validationMessage }) => {
  return (
    <FormField
      label="Action Description"
      isRequired
      validationMessage={validationMessage}
      labelFor="description"
      marginBottom={majorScale(3)}
    >
      <Textarea
        id="description"
        placeholder="Action description..."
        isInvalid={isInvalid}
        required
        {...formProps}
      />
    </FormField>
  )
}

export default ActionDescription
