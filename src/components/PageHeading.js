import React from 'react'
import { Heading, majorScale } from 'evergreen-ui'

const PageHeading = (props) => {
  const size = props.small ? 800 : 900
  return (
    <Heading
      is="h2"
      size={size}
      marginBottom={majorScale(4)}
      paddingBottom={majorScale(1)}
      borderBottom="2px solid #D0DF69"
      fontWeight="normal"
      textTransform="capitalize"
    >
      {props.children}
    </Heading>
  )
}

export default PageHeading
