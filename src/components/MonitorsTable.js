import React, { useState } from 'react'
import {
  Table,
  Pane,
  Heading,
  Text,
  majorScale,
  SegmentedControl,
  Code,
  Pre,
  Popover,
  Button,
  Icon,
  toaster,
} from 'evergreen-ui'
import MonitorNameCell from './MonitorNameCell'
import ViewEplQueryCell from './ViewEplQueryCell'

const MonitorsTable = ({ monitors }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [monitorsStatus, setMonitorsStatus] = useState('online')

  const monitorsStatusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Archived', value: 'archived' },
  ]

  const matchesSearchQuery = (monitor) => {
    if (searchQuery === '') {
      return true
    }
    const regex = new RegExp(searchQuery.toLowerCase(), 'gi')
    const term = `${monitor.name} ${monitor.description}`.toLowerCase()
    const match = term.match(regex)
    return match && match.length > 0
  }

  const filter = (monitors) => {
    return monitors.filter((monitor) => {
      return monitor.status === monitorsStatus && matchesSearchQuery(monitor)
    })
  }

  const tableItems = filter(monitors)

  return (
    <Pane>
      <SegmentedControl
        width={240}
        options={monitorsStatusOptions}
        value={monitorsStatus}
        onChange={(value) => setMonitorsStatus(value)}
        marginBottom={majorScale(4)}
      />

      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            onChange={(value) => setSearchQuery(value.trim())}
            placeholder="Search by monitor name and description..."
          />
        </Table.Head>
        <Table.Body height={580}>
          {tableItems.map((monitor) => (
            <Table.Row key={monitor.id} height="auto" padding={majorScale(3)}>
              <Table.Cell>
                <MonitorNameCell monitor={monitor} />
              </Table.Cell>
              <Table.Cell>
                <ViewEplQueryCell monitor={monitor} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}

export default MonitorsTable
