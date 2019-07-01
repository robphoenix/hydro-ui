import React from 'react'
import { Pane, Strong, Text } from 'evergreen-ui'
import ReactQuill from 'react-quill'

const ActionEmailRateProperties = ({ metadata }) => {
  const { emailAddresses, emailSubject, emailSendLimit, emailText } = metadata
  return (
    <Pane>
      <Pane>
        <Strong size={500}>Email Addresses: </Strong>
        <Text size={500}>{emailAddresses}</Text>
      </Pane>
      <Pane>
        <Strong size={500}>Email Subject: </Strong>
        <Text size={500}>{emailSubject}</Text>
      </Pane>
      <Pane>
        <Strong size={500}>Email Send Limit: </Strong>
        <Text size={500}>{emailSendLimit}</Text>
      </Pane>
      <Pane>
        <Strong size={500}>Email Text: </Strong>
        <ReactQuill modules={{ toolbar: false }} value={emailText} readOnly />
      </Pane>
    </Pane>
  )
}

export default ActionEmailRateProperties
