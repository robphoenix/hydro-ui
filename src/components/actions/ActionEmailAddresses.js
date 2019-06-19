import React from 'react'
import { FormField, majorScale, TagInput } from 'evergreen-ui'

const ActionEmailAddresses = ({ formProps, validationMessage, validate }) => {
  return (
    <FormField
      label="Email Addresses"
      isRequired
      labelFor="emailAddresses"
      validationMessage={validationMessage}
      marginBottom={majorScale(3)}
    >
      <TagInput
        width="100%"
        id="emailAddresses"
        inputProps={{ placeholder: 'Add email addresses...' }}
        tagProps={(value) =>
          !validate(value) ? { color: 'red', isSolid: true } : {}
        }
        {...formProps}
      />
    </FormField>
  )
}

export default ActionEmailAddresses
