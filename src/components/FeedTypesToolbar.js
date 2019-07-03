import React from 'react'
import { Pane, majorScale, SelectMenu, Button } from 'evergreen-ui'

const FeedTypesToolbar = ({
  options,
  handleSelect,
  selected,
  handleReload,
}) => {
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
      <Button
        type="button"
        onClick={handleReload}
        marginLeft={majorScale(2)}
        intent="warning"
        appearance="primary"
      >
        Reload Feed Types Cache
      </Button>
    </Pane>
  )
}

export default FeedTypesToolbar
