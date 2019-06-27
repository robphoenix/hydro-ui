import React from 'react'
import { Text, Pane, majorScale } from 'evergreen-ui'

import Version from './Version'

const Footer = () => {
  return (
    <Pane
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={majorScale(4)}
      marginTop={majorScale(4)}
    >
      <Text color="muted" marginRight={majorScale(1)}>
        Hydro UI
      </Text>{' '}
      <Version />
    </Pane>
  )
}

export default Footer
