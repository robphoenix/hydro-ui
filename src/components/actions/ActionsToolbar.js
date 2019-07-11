import React from 'react'
import { Pane, majorScale, SelectMenu, Button, SearchInput } from 'evergreen-ui'

import { navigate } from '@reach/router'
import { useUser } from '../../context/user-context'

const ActionsToolbar = ({
  options,
  getTypeProps,
  actionType,
  getSearchProps,
}) => {
  const { isAdmin } = useUser()

  return (
    <Pane marginBottom={majorScale(4)} display="flex">
      <SelectMenu
        hasTitle={false}
        hasFilter={false}
        options={options}
        {...getTypeProps(`actionType`)}
      >
        <Button>{`${actionType.label} selected`}</Button>
      </SelectMenu>

      <SearchInput
        placeholder="Search Monitors..."
        marginLeft={majorScale(2)}
        {...getSearchProps(`searchQuery`)}
      />

      {isAdmin && (
        <Button
          textTransform="capitalize"
          appearance="primary"
          marginLeft="auto"
          intent="success"
          iconBefore="add"
          onClick={() => navigate(`/actions/add`)}
        >
          add new action
        </Button>
      )}
    </Pane>
  )
}

export default ActionsToolbar
