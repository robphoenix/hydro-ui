import React from 'react'
import { Table, majorScale } from 'evergreen-ui'

import {
  ActionNameCell,
  ActionTypeBadge,
  ActionPropertiesCell,
  ActionMenuCell,
} from '.'
import { useUser } from '../../context/user-context'

const ActionsTable = ({ actions }) => {
  const { isAdmin } = useUser()

  return (
    <Table>
      <Table.Head>
        <Table.TextHeaderCell
          flex="3"
          textTransform="uppercase"
          letterSpacing="0.1em"
        >
          all actions
        </Table.TextHeaderCell>
        <Table.TextHeaderCell flex="1">Action Type</Table.TextHeaderCell>
        <Table.TextHeaderCell flex="1" />
        <Table.TextHeaderCell flex="1" />
      </Table.Head>
      <Table.Body height={700}>
        {actions.map((action, i) => (
          <Table.Row
            key={action.id}
            height={majorScale(15)}
            padding={majorScale(2)}
            background={i % 2 !== 0 ? 'tint1' : ''}
            borderLeft={i % 2 !== 0 && '1px solid #EDF0F2'}
          >
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
              {isAdmin && <ActionMenuCell action={action} />}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default ActionsTable
