import React, { useState, useEffect } from 'react'
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

const MonitorsTable = ({ monitors }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [monitorsStatus, setMonitorsStatus] = useState('online')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [filterCategoriesButtonText, setFilterCategoriesButtonText] = useState(
    ``,
  )

  const monitorsStatusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Archived', value: 'archived' },
  ]

  const categoryOptions = Array.from(
    new Set(
      monitors.reduce(
        (prev, monitor) => [...prev, ...monitor.categories.map((c) => c.name)],
        [],
      ),
    ),
  ).map((label) => ({ label, value: label }))

  const matchesSearchQuery = (monitor) => {
    const query = searchQuery.trim()
    if (query === '') {
      return true
    }
    const regex = new RegExp(query.toLowerCase(), 'gi')
    const term = `${monitor.name} ${monitor.description}`.toLowerCase()
    const match = term.match(regex)
    return match && match.length > 0
  }

  const hasSelectedCategories = (categories, selected) => {
    if (!selected || !selected.length) {
      return true
    }
    return categories
      .map((category) => category.name)
      .some((name) => selected.includes(name))
  }

  const filter = (monitors) => {
    return monitors.filter((monitor) => {
      return (
        monitor.status === monitorsStatus &&
        matchesSearchQuery(monitor) &&
        hasSelectedCategories(monitor.categories, selectedCategories)
      )
    })
  }

  useEffect(() => {
    let text = `Filter Categories...`
    const numberOfCategories = selectedCategories.length
    if (numberOfCategories === 1) {
      text = selectedCategories
    } else if (numberOfCategories > 1) {
      text = `${numberOfCategories} categories selected`
    }
    setFilterCategoriesButtonText(text)
  }, [selectedCategories])

  const tableItems = filter(monitors)

  return (
    <Pane>
      <Pane display="flex">
        <SegmentedControl
          width={240}
          options={monitorsStatusOptions}
          value={monitorsStatus}
          onChange={setMonitorsStatus}
          marginBottom={majorScale(4)}
          marginRight={majorScale(2)}
        />

        <SelectMenu
          isMultiSelect
          title="Select multiple categories"
          options={categoryOptions}
          selected={selectedCategories}
          onSelect={(item) =>
            setSelectedCategories([...selectedCategories, item.value])
          }
          onDeselect={(item) => {
            const deselectedItemIndex = selectedCategories.indexOf(item.value)
            const selectedItems = selectedCategories.filter(
              (_item, i) => i !== deselectedItemIndex,
            )
            setSelectedCategories(selectedItems)
          }}
        >
          <Button>{filterCategoriesButtonText}</Button>
        </SelectMenu>
      </Pane>

      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            onChange={setSearchQuery}
            placeholder="Search by monitor name and description..."
          />
          <Table.HeaderCell />
        </Table.Head>
        <Table.Body height={700}>
          {tableItems.map((monitor) => (
            <Table.Row key={monitor.id} height="auto" padding={majorScale(3)}>
              <Table.Cell>
                <MonitorNameCell monitor={monitor} />
              </Table.Cell>
              <Table.Cell>
                <ViewEplQueryCell monitor={monitor} />
              </Table.Cell>
              <Table.Cell>
                {monitor.categories.map((category) => (
                  <Badge
                    key={category.id}
                    color="teal"
                    marginRight={majorScale(1)}
                  >
                    {category.name}
                  </Badge>
                ))}
              </Table.Cell>
              <Table.Cell justifyContent="flex-end">
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
