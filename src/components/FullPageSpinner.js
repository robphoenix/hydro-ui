import React from 'react'
import { Pane, Spinner } from 'evergreen-ui'

const FullPageSpinner = (props) => {
  return (
    <Pane display="flex" alignItems="center" justifyContent="center" {...props}>
      <Spinner />
    </Pane>
  )
}

export default FullPageSpinner
