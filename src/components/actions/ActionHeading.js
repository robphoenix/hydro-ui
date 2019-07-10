import React from 'react'
import { Heading, majorScale } from 'evergreen-ui'

const ActionHeading = (props) => {
  return (
    <Heading
      is="h3"
      size={600}
      marginBottom={majorScale(3)}
      textTransform="capitalize"
    >
      {props.children} action
    </Heading>
  )
}

export default ActionHeading
