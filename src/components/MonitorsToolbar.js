import React from 'react'
import {
  Pane,
  majorScale,
  SegmentedControl,
  SelectMenu,
  Button,
} from 'evergreen-ui'
import { navigate } from '@reach/router'

const MonitorsToolbar = ({
  handleStatusChange,
  statusValue,
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
        value={statusValue}
        onChange={handleStatusChange}
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
      <Button
        textTransform="capitalize"
        marginLeft="auto"
        appearance="primary"
        intent="success"
        iconBefore="add"
        onClick={() => navigate(`/monitors/add`)}
      >
        add new monitor
      </Button>
    </Pane>
  )
}

export default MonitorsToolbar
