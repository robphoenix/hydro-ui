import React from 'react'
import { Pane, majorScale, SelectMenu, Button } from 'evergreen-ui'

const ActionsToolbar = ({ options, selected, handleSelect }) => {
  return (
    <Pane marginBottom={majorScale(4)}>
      <SelectMenu
        hasTitle={false}
        hasFilter={false}
        title="Select action type"
        options={options}
        selected={selected.value}
        onSelect={handleSelect}
      >
        <Button>{`${selected.label} selected`}</Button>
      </SelectMenu>
    </Pane>
  )
}

export default ActionsToolbar
