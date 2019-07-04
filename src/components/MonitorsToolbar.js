import React from 'react'
import {
  Pane,
  majorScale,
  SegmentedControl,
  SelectMenu,
  Button,
} from 'evergreen-ui'
import { navigate } from '@reach/router'
import { useUser } from '../context/user-context'

const MonitorsToolbar = ({
  handleStatusChange,
  statusValue,
  statusOptions,
  getCategoriesProps,
  categoriesOptions,
  categoriesButtonText,
  disableCategories,
}) => {
  const { allowsEdit } = useUser()

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
        <Button disabled={disableCategories}>{categoriesButtonText}</Button>
      </SelectMenu>
      {allowsEdit && (
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
      )}
    </Pane>
  )
}

export default MonitorsToolbar
