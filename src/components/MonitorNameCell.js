import React from 'react'
import { Pane, Heading, Text, majorScale } from 'evergreen-ui'
import { Link } from '@reach/router'
import styled from 'styled-components/macro'

const MonitorLink = styled(Link)({
  textDecoration: 'none',
  color: '#234361',
  backgroundImage: 'linear-gradient(180deg, #d2eef3, #d2eef3)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 bottom',
  backgroundSize: '100% 10%',
  transition: 'background-size 0.2s ease-in-out',
  '&:hover': {
    backgroundSize: '100% 100%',
  },
})

const MonitorName = (props) => <MonitorLink {...props} />

const MonitorNameCell = ({ monitor }) => {
  return (
    <Pane display="flex" flexDirection="column">
      <Heading size={600} marginBottom={majorScale(2)}>
        <MonitorName to={`/monitors/${monitor.id}`}>{monitor.name}</MonitorName>
      </Heading>
      <Text size={500}>{monitor.description}</Text>
    </Pane>
  )
}

export default MonitorNameCell
