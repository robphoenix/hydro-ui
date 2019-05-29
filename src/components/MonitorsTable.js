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

  const copyToClipboard = (monitor) => {
    document.addEventListener('copy', (e) => {
      e.clipboardData.setData('text/plain', monitor.query)
      e.preventDefault()
      document.removeEventListener('copy', null)
    })
    document.execCommand('copy')
    toaster.success(`Copied query from monitor ${monitor.name}`)
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
                <Pane display="flex" flexDirection="column">
                  <Heading size={600}>{monitor.name}</Heading>
                  <Text size={500}>{monitor.description}</Text>
                </Pane>
              </Table.Cell>
              <Table.Cell>
                <Popover
                  content={({ close }) => (
                    <Pane
                      width="auto"
                      height="auto"
                      padding={majorScale(4)}
                      background="tint1"
                      display="flex"
                    >
                      <Pre maxWidth={600} whiteSpace="pre-wrap">
                        <Code appearance="minimal" size={500}>
                          {monitor.query}
                        </Code>
                      </Pre>
                      <Pane display="flex" alignItems="flex-end">
                        <Icon
                          icon="duplicate"
                          color="success"
                          cursor="pointer"
                          onClick={() => {
                            copyToClipboard(monitor)
                            close()
                          }}
                          marginLeft={majorScale(2)}
                        />
                      </Pane>
                    </Pane>
                  )}
                >
                  <Button appearance="primary">View EPL Query</Button>
                </Popover>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}

export default MonitorsTable
