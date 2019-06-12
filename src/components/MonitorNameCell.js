import React from 'react'
import { Pane, Heading, Text, majorScale } from 'evergreen-ui'
import { Link } from '@reach/router'
import styled from 'styled-components/macro'

const MonitorNameCell = ({ monitor }) => {
  return (
    <Pane display="flex" flexDirection="column">
      <Heading size={600} marginBottom={majorScale(2)}>
        <Link
          to={`/monitors/${monitor.id}`}
          css={`
            text-decoration: none;
            color: #234361;
            background-image: linear-gradient(180deg, #d2eef3, #d2eef3);
            background-repeat: no-repeat;
            background-position: 0 bottom;
            background-size: 100% 10%;
            transition: background-size 0.1s linear;

            &:hover {
              background-size: 100% 100%;
            }
          `}
        >
          {monitor.name}
        </Link>
      </Heading>
      <Text size={500}>{monitor.description}</Text>
    </Pane>
  )
}

export default MonitorNameCell
