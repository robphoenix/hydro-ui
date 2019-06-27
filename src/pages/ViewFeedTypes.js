import React from 'react'
import { Pane, toaster } from 'evergreen-ui'

import { useMonitors } from '../context/monitors-context'
import FeedTypesTable from '../components/FeedTypesTable'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'
import FeedTypesToolbar from '../components/FeedTypesToolbar'
import { matchesSearchQuery } from '../utils/filters'

const ViewFeedTypes = () => {
  const { feedTypes, fetchFeedTypes, isLoading, errors } = useMonitors()
  const [selected, setSelected] = React.useState(``)
  const [searchQuery, setSearchQuery] = React.useState(``)

  React.useEffect(() => {
    fetchFeedTypes()
  }, [fetchFeedTypes])

  const options = Object.keys(feedTypes).map((value) => ({
    label: value,
    value,
  }))

  React.useEffect(() => {
    if (errors.feedTypes) {
      const { message, cause } = errors.feedTypes
      toaster.warning(message, { description: cause, duration: 7 })
    }
  }, [errors.feedTypes])

  const handleSelect = ({ value }) => setSelected(value)
  const handleChange = (value) => setSearchQuery(value)
  const filter = (fields) => {
    return fields.filter((esperData) => {
      const term = `${esperData.name} ${esperData.help}`.toLowerCase()
      return matchesSearchQuery(term, searchQuery)
    })
  }

  return (
    <PageContainer>
      <Pane>
        <PageHeading>feed types</PageHeading>
        {!isLoading && (
          <Pane>
            <FeedTypesToolbar
              options={options}
              handleSelect={handleSelect}
              selected={selected}
            />
            <FeedTypesTable
              fields={feedTypes[selected]}
              handleChange={handleChange}
              filter={filter}
            />
          </Pane>
        )}
      </Pane>
    </PageContainer>
  )
}

export default ViewFeedTypes
