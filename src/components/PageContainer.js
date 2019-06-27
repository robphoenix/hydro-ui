import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'

const PageContainer = (props) => {
  const width = props.width || '60%'
  return (
    <Pane display="flex" justifyContent="center" paddingTop={majorScale(4)}>
      <Pane width={width}>{props.children}</Pane>
    </Pane>
  )
}

export default PageContainer
