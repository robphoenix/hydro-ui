import React from 'react'
import { useMonitors } from '../context/monitors-context'
import { toaster, Pane, Heading, majorScale, Spinner } from 'evergreen-ui'
import { navigate } from '@reach/router'
import { ActionsTable } from '../components/actions'
import ActionsToolbar from '../components/actions/ActionsToolbar'
import useSearch from '../hooks/useSearch'

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

  const [selectedActionType, setSelectedActionType] = React.useState({
    label: `All Action Types`,
    value: ``,
  })
  const { setSearchQuery, matchesSearchQuery } = useSearch()

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

  const filtered = filter(allActions)

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="60%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Actions
        </Heading>
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
              selected={selectedActionType}
              handleSelect={(item) => {
                setSelectedActionType(item)
              }}
            />
            <ActionsTable actions={filtered} handleChange={setSearchQuery} />
          </Pane>
        )}
      </Pane>
    </Pane>
  )
}

export default ViewActions
