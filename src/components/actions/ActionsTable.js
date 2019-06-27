import React from 'react'
import { Table, majorScale } from 'evergreen-ui'

import {
  ActionNameCell,
  ActionTypeBadge,
  ActionPropertiesCell,
  ActionMenuCell,
} from '.'

const ActionsTable = ({ actions, handleChange }) => {
  return (
    <Table>
      <Table.Head>
        <Table.SearchHeaderCell
          flex="3"
          onChange={handleChange}
          placeholder="Search by action name and description..."
        />
        <Table.TextHeaderCell flex="1">Action Type</Table.TextHeaderCell>
        <Table.TextHeaderCell flex="1" />
        <Table.TextHeaderCell flex="1" />
      </Table.Head>
      <Table.Body height={700}>
        {actions.map((action) => (
          <Table.Row key={action.id} height="auto" padding={majorScale(3)}>
            <Table.Cell flex="3">
              <ActionNameCell action={action} />
            </Table.Cell>
            <Table.Cell flex="1">
              <ActionTypeBadge actionType={action.actionType} />
            </Table.Cell>
            <Table.Cell justifyContent="flex-end" flex="1">
              <ActionPropertiesCell action={action} />
            </Table.Cell>
            <Table.Cell justifyContent="flex-end" flex="1">
              <ActionMenuCell action={action} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default ActionsTable
