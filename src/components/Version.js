import React from 'react'
import { Text } from 'evergreen-ui'

import { version } from '../../package.json'

const Version = () => {
  return (
    <Text size={400} color="muted">
      v{version}
    </Text>
  )
}

export default Version
