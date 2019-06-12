import React from 'react'
import { Pane, Heading, Text, Link } from 'evergreen-ui'
import { Link as RouterLink } from '@reach/router'

const MonitorNameCell = ({ monitor }) => {
  return (
    <Pane display="flex" flexDirection="column">
      <Link
        is={RouterLink}
        to={`/monitors/${monitor.id}`}
        textDecoration="none"
        color="neutral"
      >
        <Heading size={600}>{monitor.name}</Heading>
        <Text size={500}>{monitor.description}</Text>
      </Link>
    </Pane>
  )
}

export default MonitorNameCell
