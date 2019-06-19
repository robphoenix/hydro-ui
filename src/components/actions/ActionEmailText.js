/* eslint-disable no-template-curly-in-string */
import React from 'react'
import { FormField, majorScale, Paragraph, Code } from 'evergreen-ui'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'

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

const description = (
  <Paragraph size={500} marginBottom={majorScale(2)}>
    This text can contain variable data, using the
    <Code>{'${data}'}</Code> substitution tag, where data can be any esper data
    field, such as <Code>{'${uname}'}</Code>, <Code>{'${topic}'}</Code> or{' '}
    <Code>{'${sip}'}</Code>. To display the esperdata there MUST be a{' '}
    <Code>{'${esperData}'}</Code> substitution tag.
  </Paragraph>
)

const ActionEmailText = ({ formProps, error, touched }) => {
  return (
    <FormField
      label="Email Text"
      labelFor="emailText"
      description={description}
      isRequired
      validationMessage={touched && error}
      marginBottom={majorScale(3)}
    >
      <ReactQuill id="emailText" {...formProps} modules={quillModules} />
    </FormField>
  )
}

export default ActionEmailText
