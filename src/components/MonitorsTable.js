import React from 'react'
import { Table, majorScale, Button } from 'evergreen-ui'

import MonitorNameCell from './MonitorNameCell'
import ViewEplQueryCell from './ViewEplQueryCell'
import MonitorMenuCell from './MonitorMenuCell'
import MonitorCategories from './MonitorCategories'
import { navigate } from '@reach/router'

const MonitorsTable = ({ handleSearchChange, monitors }) => {
  return (
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell
          flex="1"
          onChange={handleSearchChange}
          placeholder="Search by monitor name and description..."
        />
      </Table.Head>
      <Table.Body height={700}>
        {monitors.map((monitor, i) => (
          <Table.Row
            key={monitor.id}
            height={majorScale(17)}
            padding={majorScale(2)}
            background={i % 2 !== 0 ? 'tint1' : ''}
            borderLeft={i % 2 !== 0 && '1px solid #EDF0F2'}
          >
            <Table.Cell flex="3">
              <MonitorNameCell monitor={monitor} />
            </Table.Cell>
            {monitor.status === `online` && (
              <Table.Cell
                flex="1"
                padding="0"
                display="flex"
                justifyContent="center"
              >
                <Button
                  appearance="primary"
                  iconBefore="offline"
                  onClick={() => navigate(`/monitors/${monitor.id}`)}
                >
                  Live Data
                </Button>
              </Table.Cell>
            )}
            <Table.Cell padding="0" display="flex" justifyContent="center">
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
