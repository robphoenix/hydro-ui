import React, { useState, useEffect } from 'react'
import { Table, Pane, Heading, Text, majorScale } from 'evergreen-ui'

const MonitorsTable = ({ monitors }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filter = (monitors) => {
    if (searchQuery === '') return monitors

    return monitors.filter((monitor) => {
      const regex = new RegExp(searchQuery.toLowerCase(), 'gi')
      const term = `${monitor.name} ${monitor.description}`.toLowerCase()
      const match = term.match(regex)
      return match && match.length > 0
    })
  }

  const tableItems = filter(monitors)

  return (
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
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default MonitorsTable
