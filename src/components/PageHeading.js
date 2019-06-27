import React from 'react'
import { Heading, majorScale } from 'evergreen-ui'

const PageHeading = (props) => {
  return (
    <Heading
      is="h2"
      size={900}
      marginBottom={majorScale(4)}
      paddingBottom={majorScale(1)}
      borderBottom="1px solid #D0DF69"
      fontWeight="normal"
      textTransform="capitalize"
    >
      {props.children}
    </Heading>
  )
}

export default PageHeading
