import React from 'react'
import { useMonitors } from '../context/monitors-context'
import {
  Pane,
  Heading,
  majorScale,
  UnorderedList,
  ListItem,
  Button,
} from 'evergreen-ui'
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
            <UnorderedList listStyle="none" flex="1">
              {esperDataTypes.map((option) => (
                <ListItem key={option.value}>
                  <Button
                    type="button"
                    appearance="minimal"
                    color="muted"
                    onClick={() => {
                      console.log({ option })

                      setCurrentFeedType(option.value)
                    }}
                  >
                    {option.label}
                  </Button>
                </ListItem>
              ))}
            </UnorderedList>

            <FeedTypesTable
              esperDataTypes={feedTypes[currentFeedType]}
              feedName={currentFeedType}
            />
          </Pane>
        )}
      </Pane>
    </Pane>
  )
}

export default ViewFeedTypes
