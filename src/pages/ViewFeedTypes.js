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
  const [esperDataTypes, setEsperDataTypes] = React.useState([])
  const [esperDataTypeFields, setEsperDataTypeFields] = React.useState([])
  const [selected, setSelected] = React.useState(``)
  const [searchQuery, setSearchQuery] = React.useState(``)

  React.useEffect(() => {
    fetchFeedTypes()
  }, [fetchFeedTypes])

  React.useEffect(() => {
    const dataTypes = Object.keys(feedTypes)
    if (dataTypes && dataTypes.length) {
      setEsperDataTypes(dataTypes.map((value) => ({ label: value, value })))
    }
  }, [feedTypes])

  React.useEffect(() => {
    const dataTypes = Object.keys(feedTypes)
    if (dataTypes && dataTypes.length) {
      setEsperDataTypeFields(feedTypes[selected])
    }
  }, [feedTypes, selected])

  React.useEffect(() => {
    if (errors.allActions) {
      const { message, cause } = errors.allActions
      toaster.warning(message, { description: cause, duration: 7 })
    }
  }, [errors.allActions])

  const handleSelect = ({ value }) => {
    setSelected(value)
  }

  const handleChange = (value) => {
    setSearchQuery(value)
  }

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
              options={esperDataTypes}
              handleSelect={handleSelect}
              selected={selected}
            />
            <FeedTypesTable
              fields={esperDataTypeFields}
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
