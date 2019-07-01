import React from 'react'
import { Pane, Strong, Text } from 'evergreen-ui'
import ReactQuill from 'react-quill'

const ActionEmailBatchProperties = ({ metadata }) => {
  const { emailAddresses, emailSubject, emailText, emailCron } = metadata
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
        <Strong size={500}>Email Cron Expression: </Strong>
        <Text size={500}>{emailCron}</Text>
      </Pane>
      <Pane>
        <Strong size={500}>Email Text: </Strong>
        <ReactQuill modules={{ toolbar: false }} value={emailText} readOnly />
      </Pane>
    </Pane>
  )
}

export default ActionEmailBatchProperties
