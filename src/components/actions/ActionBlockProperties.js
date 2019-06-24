import React from 'react'
import { Pane, Strong, Text } from 'evergreen-ui'

const ActionBlockProperties = ({ metadata }) => {
  const {
    parameters,
    blockTime,
    blockTimeUnit,
    blockDelay,
    blockDelayUnit,
  } = metadata

  return (
    <Pane>
      {parameters && parameters.length && (
        <Pane>
          <Strong size={500}>Parameters: </Strong>
          <Text size={500}>{parameters.join(', ')}</Text>
        </Pane>
      )}
      <Strong size={500}>Block Time: </Strong>
      <Text size={500}>
        {blockTime > 0
          ? `${blockTime} ${blockTimeUnit.toLowerCase()}`
          : `permanently`}
      </Text>
      {!!blockDelay && (
        <Pane>
          <Strong size={500}>Block Delay: </Strong>
          <Text
            size={500}
          >{`${blockDelay} ${blockDelayUnit.toLowerCase()}`}</Text>
        </Pane>
      )}
    </Pane>
  )
}

export default ActionBlockProperties
