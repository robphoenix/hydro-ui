import React from 'react'
import { useMonitors } from '../context/monitors-context'
import { Pane, Heading, majorScale, RadioGroup } from 'evergreen-ui'
import FeedTypesTable from '../components/FeedTypesTable'

const ViewFeedTypes = () => {
  const { feedTypes, fetchFeedTypes } = useMonitors()
  const [esperDataTypes, setEsperDataTypes] = React.useState([])
  const [currentFeedType, setCurrentFeedType] = React.useState(``)

  React.useEffect(() => {
    fetchFeedTypes()
  }, [fetchFeedTypes])

  React.useEffect(() => {
    const dataTypes = Object.keys(feedTypes)
    if (dataTypes && dataTypes.length) {
      setEsperDataTypes(dataTypes.map((d) => ({ label: d, value: d })))
      if (!currentFeedType) {
        setCurrentFeedType(dataTypes[0])
      }
    }
  }, [currentFeedType, feedTypes])

  return (
    <Pane display="flex" alignItems="center" flexDirection="column">
      <Pane width="60%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Monitor Feed Types
        </Heading>
      </Pane>
      <Pane width="80%">
        {esperDataTypes && !!esperDataTypes.length && (
          <Pane display="flex" width="100%">
            <RadioGroup
              flex="1"
              marginTop={40}
              size={16}
              label="Feed Types"
              value={currentFeedType}
              options={esperDataTypes}
              onChange={(value) => setCurrentFeedType(value)}
            />

            <FeedTypesTable esperDataTypes={feedTypes[currentFeedType]} />
          </Pane>
        )}
      </Pane>
    </Pane>
  )
}

export default ViewFeedTypes
