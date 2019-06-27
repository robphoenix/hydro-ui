import React from 'react'
import { Table, Heading, majorScale, Text, Pane } from 'evergreen-ui'

const FeedTypesTable = ({ fields, handleChange, filter }) => {
  return (
    <Table flex="5">
      <Table.Head display="flex">
        <Table.SearchHeaderCell
          flex="5"
          onChange={handleChange}
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
        {!fields ||
          (!fields.length && (
            <Pane
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={majorScale(20)}
            >
              <Text size={600}>This feed type has no fields to view</Text>
            </Pane>
          ))}
        {fields &&
          !!fields.length &&
          filter(fields).map((esperData) => (
            <Table.Row
              key={`${esperData.name}${esperData.help}`}
              height="auto"
              paddingY={majorScale(3)}
            >
              <Table.TextCell flex="4" paddingLeft={majorScale(2)}>
                <Heading size={600} marginBottom={majorScale(2)}>
                  {esperData.name}
                </Heading>
                <Text
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {esperData.help}
                </Text>
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
  )
}

export default FeedTypesTable
