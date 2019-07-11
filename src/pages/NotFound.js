import React from 'react'
import { Pane, Heading, majorScale } from 'evergreen-ui'
import styled from 'styled-components/macro'

const WavyHeading = styled(Heading)({
  textDecoration: 'underline',
  textDecorationStyle: 'wavy',
  textDecorationColor: '#14B5D0',
})

const NotFound = () => {
  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <WavyHeading size={900} marginBottom={majorScale(4)}>
        404
      </WavyHeading>
      <WavyHeading size={900} textTransform="uppercase" letterSpacing="0.1em">
        page not found
      </WavyHeading>
    </Pane>
  )
}

export default NotFound
