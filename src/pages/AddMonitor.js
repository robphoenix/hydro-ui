import React, { useState } from 'react'
import {
  Pane,
  Heading,
  majorScale,
  TextInputField,
  Textarea,
  FormField,
  Switch,
  Text,
  SegmentedControl,
  SelectMenu,
  Button,
} from 'evergreen-ui'

const AddMonitor = () => {
  const priorityOptions = [
    { label: 'Lowest', value: 'lowest' },
    { label: 'Low', value: 'low' },
    { label: 'Mid', value: 'mid' },
    { label: 'High', value: 'high' },
    { label: 'Highest', value: 'highest' },
  ]

  const [rangeValue, setRangeValue] = useState(50)

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="30%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Add Monitor
        </Heading>
        <form>
          <TextInputField
            label="Monitor Name"
            hint="Monitor Name must be unique, and cannot contain punctuation marks"
            placeholder="Monitor Name"
            required
          />
          <FormField
            label="Monitor Description"
            isRequired
            labelFor="description"
            marginBottom={majorScale(3)}
          >
            <Textarea
              id="description"
              placeholder="Monitor description..."
              required
            />
          </FormField>
          <FormField
            label="Monitor Status"
            labelFor="status"
            marginBottom={majorScale(3)}
          >
            <Pane display="flex" alignItems="center">
              <Switch id="status" marginRight={majorScale(1)} />
              <Text>Offline</Text>
            </Pane>
          </FormField>
          <FormField
            label="Priority"
            labelFor="priority"
            marginBottom={majorScale(3)}
          >
            <SegmentedControl
              options={priorityOptions}
              value={priorityOptions[2].value}
            />
          </FormField>

          <FormField
            label="EPL Query"
            isRequired
            labelFor="eplQuery"
            marginBottom={majorScale(2)}
          >
            <Textarea id="eplQuery" placeholder="EPL Query..." required />
          </FormField>
          <FormField label="Cache Window" labelFor="cacheWindow">
            <input
              id="cacheWindow"
              type="range"
              min="1"
              max="100"
              value={rangeValue}
              onChange={(e) => {
                setRangeValue(e.currentTarget.value)
                console.log(rangeValue)
              }}
              style={{
                width: `100%`,
              }}
            />
          </FormField>
          <FormField label="Categories" labelFor="categories">
            <SelectMenu id="categories" isMultiSelect title="Select Categories">
              <Button type="button">Select Categories</Button>
            </SelectMenu>
          </FormField>
          <FormField label="Actions" labelFor="actions">
            <SelectMenu id="actions" isMultiSelect title="Select Actions">
              <Button type="button">Select Actions</Button>
            </SelectMenu>
          </FormField>
          <FormField label="Groups" labelFor="groups">
            <SelectMenu id="groups" isMultiSelect title="Select Groups">
              <Button type="button">Select Groups</Button>
            </SelectMenu>
          </FormField>
        </form>
      </Pane>
    </Pane>
  )
}

export default AddMonitor
