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
  statusOptions,
  getCategoriesProps,
  categoriesOptions,
  categoriesButtonText,
}) => {
  return (
    <Pane display="flex" marginBottom={majorScale(4)}>
      <SegmentedControl
        width={240}
        options={statusOptions}
        {...getStatusProps(`status`)}
        marginRight={majorScale(2)}
      />

      <SelectMenu
        isMultiSelect
        title="Select multiple categories"
        options={categoriesOptions}
        {...getCategoriesProps(`categories`)}
      >
        <Button>{categoriesButtonText}</Button>
      </SelectMenu>
    </Pane>
  )
}

export default MonitorsToolbar
