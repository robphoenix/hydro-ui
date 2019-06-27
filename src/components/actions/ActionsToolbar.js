import React from 'react'
import { Pane, majorScale, SelectMenu, Button } from 'evergreen-ui'

const ActionsToolbar = ({ options, getProps, actionType }) => {
  return (
    <Pane marginBottom={majorScale(4)}>
      <SelectMenu
        hasTitle={false}
        hasFilter={false}
        options={options}
        {...getProps(`actionType`)}
      >
        <Button>{`${actionType.label} selected`}</Button>
      </SelectMenu>
    </Pane>
  )
}

export default ActionsToolbar
