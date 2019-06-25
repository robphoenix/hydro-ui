import React from 'react'
import {
  Pane,
  majorScale,
  SegmentedControl,
  SelectMenu,
  Button,
} from 'evergreen-ui'

const MonitorsToolbar = ({
  getStatusProps,
  getCategoriesProps,
  categoriesButtonText,
}) => {
  return (
    <Pane display="flex" marginBottom={majorScale(4)}>
      <SegmentedControl
        width={240}
        {...getStatusProps()}
        marginRight={majorScale(2)}
      />

      <SelectMenu isMultiSelect {...getCategoriesProps()}>
        <Button>{categoriesButtonText}</Button>
      </SelectMenu>
    </Pane>
  )
}

export default MonitorsToolbar
