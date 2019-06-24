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
  const [monitorsStatus, setMonitorsStatus] = React.useState('online')
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [
    filterCategoriesButtonText,
    setFilterCategoriesButtonText,
  ] = React.useState(``)

  const monitorsStatusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Archived', value: 'archived' },
  ]

  const { setSearchQuery, matchesSearchQuery } = useSearch()

  const categoryOptions = Array.from(
    new Set(
      monitors.reduce(
        (prev, monitor) => [...prev, ...monitor.categories.map((c) => c.name)],
        [],
      ),
    ),
  ).map((label) => ({ label, value: label }))

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
      const term = `${monitor.name} ${monitor.description}`.toLowerCase()

      return (
        monitor.status === monitorsStatus &&
        matchesSearchQuery(term) &&
        hasSelectedCategories(monitor.categories, selectedCategories)
      )
    })
  }

  React.useEffect(() => {
    let text = `Filter Categories...`
    const numberOfCategories = selectedCategories.length
    if (numberOfCategories === 1) {
      text = selectedCategories[0]
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
            flex="1"
            onChange={setSearchQuery}
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
