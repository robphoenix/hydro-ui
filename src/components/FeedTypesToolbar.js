import React from 'react'
import { Pane, majorScale, SelectMenu, Button } from 'evergreen-ui'

const FeedTypesToolbar = ({ options, handleSelect, selected }) => {
  return (
    <Pane marginBottom={majorScale(4)}>
      <SelectMenu
        title="Select Monitor Feed Type"
        options={options}
        onSelect={handleSelect}
        selected={selected}
      >
        <Button>
          {selected ? `${selected} selected` : `Select Feed Type`}
        </Button>
      </SelectMenu>
    </Pane>
  )
}

export default FeedTypesToolbar
