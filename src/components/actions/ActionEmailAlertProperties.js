import React from 'react'
import { Pane, Strong, Text } from 'evergreen-ui'
import ReactQuill from 'react-quill'

const ActionEmailAlertProperties = ({ metadata }) => {
  const { emailAddresses, emailSubject, emailText, parameters } = metadata
  return (
    <Pane>
      {parameters && parameters.length && (
        <Pane>
          <Strong size={500}>Parameters: </Strong>
          <Text size={500}>{parameters.join(', ')}</Text>
        </Pane>
      )}
      <Pane>
        <Strong size={500}>Email Addresses: </Strong>
        <Text size={500}>{emailAddresses}</Text>
      </Pane>
      <Pane>
        <Strong size={500}>Email Subject: </Strong>
        <Text size={500}>{emailSubject}</Text>
      </Pane>
      <Pane>
        <Strong size={500}>Email Text: </Strong>
        <ReactQuill modules={{ toolbar: false }} value={emailText} readOnly />
      </Pane>
    </Pane>
  )
}

export default ActionEmailAlertProperties
