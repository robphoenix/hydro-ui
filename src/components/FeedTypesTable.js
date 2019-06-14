import React from 'react'
import { Table, Heading, majorScale } from 'evergreen-ui'

const FeedTypesTable = ({ esperDataTypes }) => {
  const [searchQuery, setSearchQuery] = React.useState(``)

  const matchesSearchQuery = (esperData) => {
    const query = searchQuery.trim()
    if (query === '') {
      return true
    }
    const regex = new RegExp(query.toLowerCase(), 'gi')
    const term = `${esperData.name} ${esperData.help}`.toLowerCase()
    const match = term.match(regex)
    return match && match.length > 0
  }

  const filter = (esperDataTypes) => {
    return esperDataTypes.filter((esperData) => {
      return matchesSearchQuery(esperData)
    })
  }

  return (
    <Table flex="4">
      <Table.Head display="flex" padding="0">
        <Table.SearchHeaderCell
          flex="4"
          onChange={setSearchQuery}
          placeholder="Search by feed type name and description..."
        />
        <Table.TextHeaderCell flex="1">Type</Table.TextHeaderCell>
        <Table.TextHeaderCell flex="1">Format</Table.TextHeaderCell>
        <Table.TextHeaderCell flex="1">Order</Table.TextHeaderCell>
        <Table.TextHeaderCell flex="1">Java Type</Table.TextHeaderCell>
      </Table.Head>
      <Table.Body height={800}>
        {filter(esperDataTypes).map((esperData) => (
          <Table.Row
            key={`${esperData.name}${esperData.help}`}
            height="auto"
            padding={majorScale(2)}
          >
            <Table.TextCell flex="4">
              <Heading size={500} marginBottom={majorScale(2)}>
                {esperData.name}
              </Heading>
              {esperData.help}
            </Table.TextCell>
            <Table.TextCell flex="1">{esperData.type || `-`}</Table.TextCell>
            <Table.TextCell flex="2">{esperData.format || `-`}</Table.TextCell>
            <Table.TextCell flex="1">{esperData.order || `-`}</Table.TextCell>
            <Table.TextCell flex="1">
              {esperData.javaType || `-`}
            </Table.TextCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default FeedTypesTable
