import React from 'react'
import {
  Pane,
  majorScale,
  SegmentedControl,
  SelectMenu,
  Button,
  SearchInput,
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
  getSearchProps,
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
          // we'll still see an error here until a new release
          // https://github.com/segmentio/evergreen/pull/594
          height="auto"
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
          width={160}
          marginRight={majorScale(2)}
          display="flex"
          justifyContent="center"
        >
          {categoriesButtonText}
        </Button>
      </SelectMenu>

      <SearchInput
        placeholder="Search Monitors..."
        {...getSearchProps(`searchQuery`)}
      />

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
