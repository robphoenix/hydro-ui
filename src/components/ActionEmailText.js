/* eslint-disable no-template-curly-in-string */
import React from 'react'
import { FormField, majorScale, Pane, Paragraph, Code } from 'evergreen-ui'
import ReactQuill from 'react-quill'

import './ActionEmailText.css'

const quillModules = {
  toolbar: [
    [{ size: ['small', false, 'large'] }],
    ['bold', 'italic', 'underline'],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ indent: '-1' }, { indent: '+1' }],

    [
      { align: '' },
      { align: 'center' },
      { align: 'right' },
      { align: 'justify' },
    ],
    [{ list: 'bullet' }, { list: 'ordered' }],
    ['link', 'image'],
  ],
}

const ActionEmailText = ({ formProps, error, touched }) => {
  return (
    <FormField
      label="Email Text"
      labelFor="emailText"
      isRequired
      validationMessage={touched && error}
      marginBottom={majorScale(3)}
    >
      <Pane marginBottom={majorScale(2)}>
        <Paragraph size={500}>
          This text can contain variable data, using the
          <Code>{'${data}'}</Code> substitution tag, where data can be any esper
          data field, such as <Code>{'${uname}'}</Code>,{' '}
          <Code>{'${topic}'}</Code> or <Code>{'${sip}'}</Code>. To display the
          esperdata there MUST be a <Code>{'${esperData}'}</Code> substitution
          tag.
        </Paragraph>
      </Pane>
      <ReactQuill id="emailText" {...formProps} modules={quillModules} />
    </FormField>
  )
}

export default ActionEmailText
