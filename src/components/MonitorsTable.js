import React from 'react'
import { Table, majorScale } from 'evergreen-ui'

import MonitorNameCell from './MonitorNameCell'
import ViewEplQueryCell from './ViewEplQueryCell'
import MonitorMenuCell from './MonitorMenuCell'
import MonitorCategories from './MonitorCategories'

const MonitorsTable = ({ handleSearchChange, monitors }) => {
  return (
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
        {monitors.map((monitor) => (
          <Table.Row key={monitor.id} height="auto" padding={majorScale(3)}>
            <Table.Cell flex="2">
              <MonitorNameCell monitor={monitor} />
            </Table.Cell>
            <Table.Cell>
              <ViewEplQueryCell monitor={monitor} />
            </Table.Cell>
            <Table.Cell display="flex" flex="2" flexWrap="wrap">
              <MonitorCategories categories={monitor.categories} />
            </Table.Cell>
            <Table.Cell justifyContent="flex-end" flex="1">
              <MonitorMenuCell monitor={monitor} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default MonitorsTable
