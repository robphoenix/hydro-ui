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
  selectedType,
  handleTypeSelect,
  typeOptions,
  categoriesOptions,
  categoriesButtonText,
  disableCategories,
}) => {
  const { allowsEdit, isAdmin } = useUser()

  return (
    <Pane display="flex" marginBottom={majorScale(4)}>
      <SegmentedControl
        width={240}
        options={statusOptions}
        value={statusValue}
        onChange={handleStatusChange}
        marginRight={majorScale(2)}
      />

      {isAdmin && (
        <SelectMenu
          // TODO: we will be able to do this in a future release
          // https://github.com/segmentio/evergreen/pull/579
          // height="auto"
          height={100}
          width={160}
          hasFilter={false}
          hasTitle={false}
          options={typeOptions}
          selected={selectedType}
          onSelect={handleTypeSelect}
        >
          <Button
            textTransform="capitalize"
            width={140}
            marginRight={majorScale(2)}
            display="flex"
            justifyContent="center"
          >
            {selectedType} monitors
          </Button>
        </SelectMenu>
      )}

      <SelectMenu
        isMultiSelect
        title="Select multiple categories"
        options={categoriesOptions}
        {...getCategoriesProps(`categories`)}
      >
        <Button
          disabled={disableCategories}
          width={160}
          marginRight={majorScale(2)}
          display="flex"
          justifyContent="center"
        >
          {categoriesButtonText}
        </Button>
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
