import React from 'react'
import { TextInputField } from 'evergreen-ui'

const ActionName = ({ formProps, isInvalid, validationMessage }) => {
  return (
    <TextInputField
      label="Action Name"
      placeholder="Action Name"
      isInvalid={isInvalid}
      validationMessage={validationMessage}
      required
      {...formProps}
    />
  )
}

export default ActionName
