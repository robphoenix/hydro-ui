import React from 'react'
import { Pane, majorScale, SelectMenu, Button } from 'evergreen-ui'
import { navigate } from '@reach/router'

const ActionsToolbar = ({ options, getProps, actionType }) => {
  return (
    <Pane
      marginBottom={majorScale(4)}
      display="flex"
      justifyContent="space-between"
    >
      <SelectMenu
        hasTitle={false}
        hasFilter={false}
        options={options}
        {...getProps(`actionType`)}
      >
        <Button>{`${actionType.label} selected`}</Button>
      </SelectMenu>
      <Button
        textTransform="capitalize"
        appearance="primary"
        intent="success"
        iconBefore="add"
        onClick={() => navigate(`/actions/add`)}
      >
        add new action
      </Button>
    </Pane>
  )
}

export default ActionsToolbar
