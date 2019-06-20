import React from 'react'
import { TextInputField } from 'evergreen-ui'

const ActionEmailSubject = ({ formProps, isInvalid, validationMessage }) => {
  return (
    <TextInputField
      label="Email Subject"
      placeholder="Email Subject"
      isInvalid={isInvalid}
      validationMessage={validationMessage}
      required
      {...formProps}
    />
  )
}

export default ActionEmailSubject
