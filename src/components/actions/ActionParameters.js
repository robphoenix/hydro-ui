import React from 'react'
import {
  FormField,
  majorScale,
  SelectMenu,
  Position,
  Button,
} from 'evergreen-ui'

const ActionParameters = ({
  selectMenuProps,
  inputFieldProps,
  validationMessage,
}) => {
  const parameterOptions = [
    { label: `IP Address`, value: `sip` },
    { label: `IP Range`, value: `ipRange` },
    { label: `Session token`, value: `stk` },
    { label: `Response Session Token`, value: `rstk` },
    { label: `UQ ID`, value: `uqid` },
    { label: `User Name`, value: `uname` },
    { label: `User Agent`, value: `userAgent` },
    { label: `X-Forwarded-For`, value: `xForwardedFor` },
  ]

  const getButtonText = () => {
    const { selected } = selectMenuProps
    const len = selected.length
    return selectMenuProps && len
      ? `${len} parameter${len > 1 ? `s` : ``} selected`
      : `Select Parameters`
  }

  return (
    <FormField
      label="Parameters"
      labelFor="parameters"
      marginBottom={majorScale(3)}
      isRequired
      validationMessage={validationMessage}
    >
      <SelectMenu
        hasTitle={false}
        hasFilter={false}
        isMultiSelect
        position={Position.BOTTOM_LEFT}
        title="Select parameters"
        options={parameterOptions}
        {...selectMenuProps}
        width={400}
      >
        <Button type="button" {...inputFieldProps}>
          {getButtonText()}
        </Button>
      </SelectMenu>
    </FormField>
  )
}

export default ActionParameters
