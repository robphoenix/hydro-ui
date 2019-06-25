import React from 'react'
import { useMonitors } from '../context/monitors-context'
import {
  Pane,
  Heading,
  majorScale,
  UnorderedList,
  ListItem,
  Button,
  Text,
} from 'evergreen-ui'
import FeedTypesTable from '../components/FeedTypesTable'

const ViewFeedTypes = () => {
  const { feedTypes, fetchFeedTypes } = useMonitors()
  const [esperDataTypes, setEsperDataTypes] = React.useState([])
  const [esperDataTypeFields, setEsperDataTypeFields] = React.useState([])
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

  React.useEffect(() => {
    const dataTypes = Object.keys(feedTypes)
    if (dataTypes && dataTypes.length && currentFeedType) {
      setEsperDataTypeFields(feedTypes[currentFeedType])
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
      <Pane width="60%">
        {esperDataTypes && !!esperDataTypes.length && (
          <Pane display="flex" width="100%">
            <UnorderedList listStyle="none" flex="1" paddingX={majorScale(3)}>
              {esperDataTypes.map((option) => (
                <ListItem key={option.value}>
                  <Button
                    type="button"
                    appearance="minimal"
                    color="muted"
                    height={majorScale(6)}
                    width="100%"
                    onClick={() => {
                      setCurrentFeedType(option.value)
                      setEsperDataTypeFields(feedTypes[currentFeedType])
                    }}
                  >
                    {option.label}
                  </Button>
                </ListItem>
              ))}
            </UnorderedList>

            <Pane flex="5">
              <Heading is="h3" size={600} marginBottom={majorScale(3)}>
                {currentFeedType}
              </Heading>
              {!!esperDataTypeFields.length && (
                <FeedTypesTable fields={esperDataTypeFields} />
              )}
              {!esperDataTypeFields.length && (
                <Text>This feed type currently has no fields.</Text>
              )}
            </Pane>
          </Pane>
        )}
      </Pane>
    </Pane>
  )
}

export default ViewFeedTypes
