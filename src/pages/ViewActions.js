import React from 'react'
import { useMonitors } from '../context/monitors-context'
import { toaster, Pane, Heading, majorScale, Spinner } from 'evergreen-ui'
import { navigate } from '@reach/router'
import { ActionsTable } from '../components/actions'

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
          <ActionsTable actions={allActions} />
        )}
      </Pane>
    </Pane>
  )
}

export default ViewActions
