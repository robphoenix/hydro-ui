import React from 'react'
import { Table, Pane, majorScale, Badge } from 'evergreen-ui'

import ActionNameCell from './ActionNameCell'
import ActionMenuCell from './ActionMenuCell'

const ActionsTable = ({ actions }) => {
  const [searchQuery, setSearchQuery] = React.useState('')

  const badgeColors = {
    block: `red`,
    emailAlert: `orange`,
    emailRate: `green`,
    emailBatch: `purple`,
    storeDB: `yellow`,
    storeLogins: `teal`,
    storeAnalysis: `blue`,
    misc: `neutral`,
  }

  const actionDisplayName = {
    block: `block`,
    emailAlert: `email alert`,
    emailRate: `email rate`,
    emailBatch: `email batch`,
    storeDB: `store in database`,
    storeLogins: `store logins`,
    storeAnalysis: `store analysis`,
    misc: `miscellaneous`,
  }

  const tableItems = actions

  return (
    <Pane>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            flex="1"
            onChange={setSearchQuery}
            placeholder="Search by action name and description..."
          />
          <Table.TextHeaderCell flex="1">Action Type</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={700}>
          {tableItems.map((action) => (
            <Table.Row key={action.id} height="auto" padding={majorScale(3)}>
              <Table.Cell flex="2">
                <ActionNameCell action={action} />
              </Table.Cell>
              <Table.Cell>
                <Badge color={badgeColors[action.actionType]}>
                  {actionDisplayName[action.actionType]}
                </Badge>
              </Table.Cell>
              <Table.Cell justifyContent="flex-end" flex="1">
                <ActionMenuCell action={action} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  )
}

export default ActionsTable
