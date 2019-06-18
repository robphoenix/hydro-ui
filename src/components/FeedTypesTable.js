import React from 'react'
import { Pane, Table, Heading, majorScale } from 'evergreen-ui'

const FeedTypesTable = ({ esperDataTypes, feedName }) => {
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
    <Pane flex="5">
      <Heading is="h3" size={600} marginBottom={majorScale(3)}>
        {feedName}
      </Heading>
      <Table flex="4">
        <Table.Head display="flex">
          <Table.SearchHeaderCell
            flex="4"
            onChange={setSearchQuery}
            placeholder="Search by feed type name and description..."
          />
          <Table.TextHeaderCell flex="1" textAlign="center">
            Type
          </Table.TextHeaderCell>
          <Table.TextHeaderCell flex="2" textAlign="center">
            Format
          </Table.TextHeaderCell>
          <Table.TextHeaderCell flex="1" textAlign="center">
            Order
          </Table.TextHeaderCell>
          <Table.TextHeaderCell flex="1" textAlign="center">
            Java Type
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={800}>
          {filter(esperDataTypes).map((esperData) => (
            <Table.Row
              key={`${esperData.name}${esperData.help}`}
              height="auto"
              paddingY={majorScale(3)}
            >
              <Table.TextCell flex="4" paddingLeft={majorScale(2)}>
                <Heading size={500} marginBottom={majorScale(2)}>
                  {esperData.name}
                </Heading>
                {esperData.help}
              </Table.TextCell>
              <Table.TextCell flex="1" textAlign="center">
                {esperData.type || `-`}
              </Table.TextCell>
              <Table.TextCell flex="2" textAlign="center">
                {esperData.format || `-`}
              </Table.TextCell>
              <Table.TextCell flex="1" textAlign="center">
                {esperData.order || `-`}
              </Table.TextCell>
              <Table.TextCell flex="1" textAlign="center">
                {esperData.javaType || `-`}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}

export default FeedTypesTable
