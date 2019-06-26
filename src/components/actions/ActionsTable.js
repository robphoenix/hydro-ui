import React from 'react'
import { Table, Pane, majorScale, SelectMenu, Button } from 'evergreen-ui'

import useMonitorsFilters from '../../hooks/useFilter'
import {
  ActionNameCell,
  ActionTypeBadge,
  ActionPropertiesCell,
  ActionMenuCell,
} from '.'

const ActionsTable = ({ actions }) => {
  const [selectedActionType, setSelectedActionType] = React.useState({
    label: `All Action Types`,
    value: ``,
  })
  // TODO: create useActionsFilters or add actions to useFilters?
  const { setSearchQuery, matchesSearchQuery } = useMonitorsFilters()

  const isSelectedActionType = (actionType) => {
    if (!selectedActionType.value) {
      return true
    }
    return selectedActionType.value === actionType
  }

  const filter = (actions) => {
    return actions.filter((action) => {
      const term = `${action.name} ${action.description}`.toLowerCase()

      return matchesSearchQuery(term) && isSelectedActionType(action.actionType)
    })
  }

  const actionTypeOptions = [
    { label: `All Action Types`, value: `` },
    { label: `Block`, value: `block` },
    { label: `Email Alert`, value: `emailAlert` },
    { label: `Email Rate`, value: `emailRate` },
    { label: `Email Batch`, value: `emailBatch` },
    { label: `Store in Database`, value: `storeDB` },
    { label: `Store Logins`, value: `storeLogins` },
    { label: `Store Analysis`, value: `storeAnalysis` },
    { label: `Miscellaneous`, value: `misc` },
  ]

  const tableItems = filter(actions)

  return (
    <Pane>
      <Pane marginBottom={majorScale(4)}>
        <SelectMenu
          title="Select action type"
          hasFilter={false}
          hasTitle={false}
          options={actionTypeOptions}
          selected={selectedActionType.value}
          onSelect={(item) => {
            setSelectedActionType(item)
          }}
        >
          <Button>{`${selectedActionType.label} selected`}</Button>
        </SelectMenu>
      </Pane>

      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            flex="4"
            onChange={setSearchQuery}
            placeholder="Search by action name and description..."
          />
          <Table.TextHeaderCell flex="1">Action Type</Table.TextHeaderCell>
          <Table.TextHeaderCell flex="1" />
          <Table.TextHeaderCell flex="1" />
        </Table.Head>
        <Table.Body height={700}>
          {tableItems.map((action) => (
            <Table.Row key={action.id} height="auto" padding={majorScale(3)}>
              <Table.Cell flex="4">
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
    </Pane>
  )
}

export default ActionsTable
