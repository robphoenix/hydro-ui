import React from 'react'
import { Text, majorScale } from 'evergreen-ui'

import { version } from '../../package.json'

const Version = () => {
  return (
    <Text size={400} marginLeft={majorScale(3)} marginRight={majorScale(3)}>
      v{version}
    </Text>
  )
}

export default Version
