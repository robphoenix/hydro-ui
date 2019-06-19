import React from 'react'
import { Heading, majorScale } from 'evergreen-ui'

const ActionHeading = (props) => {
  return (
    <Heading is="h3" size={600} marginBottom={majorScale(3)}>
      {props.children}
    </Heading>
  )
}

export default ActionHeading
