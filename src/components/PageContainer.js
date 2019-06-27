import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'

const PageContainer = (props) => {
  return (
    <Pane display="flex" justifyContent="center" paddingTop={majorScale(4)}>
      <Pane width="60%">{props.children}</Pane>
    </Pane>
  )
}

export default PageContainer
