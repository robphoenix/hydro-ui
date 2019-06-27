import React from 'react'
import { useMonitors } from '../context/monitors-context'
import { toaster, Pane, Spinner } from 'evergreen-ui'
import { navigate } from '@reach/router'
import { ActionsTable } from '../components/actions'
import ActionsToolbar from '../components/actions/ActionsToolbar'
import { isSelectedActionType, matchesSearchQuery } from '../utils/filters'
import useFilter from '../hooks/useFilter'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'

const ViewActions = () => {
  const { allActions, fetchActions, errors, isLoading } = useMonitors()

  React.useEffect(() => {
    fetchActions()
  }, [fetchActions])

  React.useEffect(() => {
    if (errors.allActions) {
      const { message, cause } = errors.allActions
      toaster.warning(message, { description: cause, duration: 7 })

      // It feels really awkward if the redirect is too quick
      setTimeout(() => navigate(`/actions/add`), 500)
    }
  }, [errors.allActions])

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

  const {
    handleTableSearchChange,
    getSelectMenuProps,
    actionType,
    searchQuery,
  } = useFilter({
    searchQuery: ``,
    actionType: actionTypeOptions[0],
  })

  const filter = (actions) => {
    return actions.filter((action) => {
      const term = `${action.name} ${action.description}`.toLowerCase()
      return (
        matchesSearchQuery(term, searchQuery) &&
        isSelectedActionType(action.actionType, actionType)
      )
    })
  }

  const filtered = filter(allActions)

  return (
    <PageContainer>
      <PageHeading>actions</PageHeading>

      {isLoading && (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={400}
        >
          <Spinner />
        </Pane>
      )}
      {!isLoading && !errors.allActions && (
        <Pane>
          <ActionsToolbar
            options={actionTypeOptions}
            getProps={getSelectMenuProps}
            actionType={actionType}
          />
          <ActionsTable
            actions={filtered}
            handleChange={handleTableSearchChange}
          />
        </Pane>
      )}
    </PageContainer>
  )
}

export default ViewActions
