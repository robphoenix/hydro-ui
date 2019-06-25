import React from 'react'
import {
  Table,
  Pane,
  majorScale,
  SegmentedControl,
  Badge,
  SelectMenu,
  Button,
} from 'evergreen-ui'

import MonitorNameCell from './MonitorNameCell'
import ViewEplQueryCell from './ViewEplQueryCell'
import MonitorMenuCell from './MonitorMenuCell'
import useSearch from '../hooks/useSearch'

const MonitorsTable = ({ monitors }) => {
  const {
    handleSearchChange,
    matchesSearchQuery,
    statusOptions,
    status,
    handleStatusChange,
    categoryOptions,
    hasSelectedCategories,
    categoriesButtonText,
    handleCategorySelect,
    handleCategoryDeselect,
    selectedCategories,
  } = useSearch(monitors)

  const filter = (monitors) => {
    return monitors.filter((monitor) => {
      const term = `${monitor.name} ${monitor.description}`.toLowerCase()

      return (
        monitor.status === status &&
        matchesSearchQuery(term) &&
        hasSelectedCategories(monitor.categories, selectedCategories)
      )
    })
  }

  const tableItems = filter(monitors)

  return (
    <Pane>
      <Pane display="flex" marginBottom={majorScale(4)}>
        <SegmentedControl
          width={240}
          options={statusOptions}
          value={status}
          onChange={handleStatusChange}
          marginRight={majorScale(2)}
        />

        <SelectMenu
          isMultiSelect
          title="Select multiple categories"
          options={categoryOptions}
          selected={selectedCategories}
          onSelect={handleCategorySelect}
          onDeselect={handleCategoryDeselect}
        >
          <Button>{categoriesButtonText}</Button>
        </SelectMenu>
      </Pane>

      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            flex="1"
            onChange={handleSearchChange}
            placeholder="Search by monitor name and description..."
          />
          <Table.TextHeaderCell flex="1" padding="0">
            Categories
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={700}>
          {tableItems.map((monitor) => (
            <Table.Row key={monitor.id} height="auto" padding={majorScale(3)}>
              <Table.Cell flex="2">
                <MonitorNameCell monitor={monitor} />
              </Table.Cell>
              <Table.Cell>
                <ViewEplQueryCell monitor={monitor} />
              </Table.Cell>
              <Table.Cell display="flex" flex="2" flexWrap="wrap">
                {monitor.categories.map((category) => (
                  <Badge
                    key={category.id}
                    color="teal"
                    marginRight={majorScale(1)}
                  >
                    {category.name}
                  </Badge>
                ))}
                {!monitor.categories.length && (
                  <Badge color="yellow">no categories</Badge>
                )}
              </Table.Cell>
              <Table.Cell justifyContent="flex-end" flex="1">
                <MonitorMenuCell monitor={monitor} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}

export default MonitorsTable
