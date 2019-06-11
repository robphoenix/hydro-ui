import React from 'react'
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
  Alert,
  Position,
} from 'evergreen-ui'

import useForm from '../hooks/useForm'
import { useMonitors } from '../context/monitors-context'
import { useUser } from '../context/user-context'

const thirtySeconds = 30
const oneMinute = 60
const twoMinutes = 2 * oneMinute
const fiveMinutes = 5 * oneMinute
const tenMinutes = 10 * oneMinute
const fifteenMinutes = 15 * oneMinute
const thirtyMinutes = 30 * oneMinute
const oneHour = 60 * oneMinute
const twoHours = 2 * oneHour
const fourHours = 4 * oneHour
const sixHours = 6 * oneHour
const twelveHours = 12 * oneHour
const eighteenHours = 18 * oneHour
const oneDay = 24 * oneHour
const twoDays = 2 * oneDay
const fourDays = 4 * oneDay
const oneWeek = 7 * oneDay

const durations = [
  { value: 0, name: 'off' },
  { value: thirtySeconds, name: '30 Seconds' },
  { value: oneMinute, name: '1 Minute' },
  { value: twoMinutes, name: '2 Minutes' },
  { value: fiveMinutes, name: '5 Minutes' },
  { value: tenMinutes, name: '10 Minutes' },
  { value: fifteenMinutes, name: '15 Minutes' },
  { value: thirtyMinutes, name: '30 Minutes' },
  { value: oneHour, name: '1 Hour' },
  { value: twoHours, name: '2 Hours' },
  { value: fourHours, name: '4 Hours' },
  { value: sixHours, name: '6 Hours' },
  { value: twelveHours, name: '12 Hours' },
  { value: eighteenHours, name: '18 Hours' },
  { value: oneDay, name: '1 Day' },
  { value: twoDays, name: '2 Days' },
  { value: fourDays, name: '4 Days' },
  { value: oneWeek, name: '1 Week' },
]

const min = 0
const max = durations.length - 1
const durationValues = () => durations.map((d) => d.value)
const durationNames = () => durations.map((d) => d.name)

const AddMonitor = () => {
  const nameMaxChars = 50
  const priorityOptions = [
    { label: 'Lowest', value: 'lowest' },
    { label: 'Low', value: 'low' },
    { label: 'Mid', value: 'mid' },
    { label: 'High', value: 'high' },
    { label: 'Highest', value: 'highest' },
  ]

  const { addMonitor, allGroups, fetchGroups } = useMonitors()
  const { groups: userGroups } = useUser()

  React.useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  const selectedGroups = (selected) =>
    allGroups.filter((group) =>
      selected.map((value) => +value).includes(group.id),
    )

  const initialValues = {
    name: '',
    description: '',
    status: false,
    priority: 'mid',
    query: '',
    cacheWindow: min,
    groups: userGroups.map((g) => `${g.id}`),
  }
  const onSubmit = async (values) => {
    const status = values.status ? `online` : `offline`
    const cacheWindow = durationValues()[values.cacheWindow]
    const groups = selectedGroups(values.groups)

    // NOTE: priority is not yet used
    const { name, description, query } = values
    const monitor = {
      name,
      description,
      status,
      query,
      cacheWindow,
      groups,
    }

    // addMonitor(monitor)

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    await sleep(1000)
    alert(JSON.stringify(monitor, null, 2))
  }
  const validate = (values) => {
    let errors = {}
    if (!/^[a-zA-Z0-9 _-]+$/.test(values.name)) {
      errors.name = `Monitor name cannot contain punctuation marks, except dashes and underscores`
    }
    if (values.name.length > nameMaxChars) {
      errors.name = `Monitor name cannot be longer than ${nameMaxChars} characters`
    }
    if (values.name === '') {
      errors.name = 'You must enter a Monitor name'
    }
    if (values.description === '') {
      errors.description = 'You must enter a Monitor description'
    }
    if (values.query === '') {
      errors.query = 'You must enter an EPL Query'
    }
    return errors
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getSwitchFieldProps,
    getSegmentedControlFieldProps,
    getSelectMenuProps,
    errors,
    touched,
    submitError,
  } = useForm({
    initialValues,
    onSubmit,
    validate,
  })

  return (
    <Pane display="flex" justifyContent="center" marginBottom={majorScale(4)}>
      <Pane width="30%">
        <Heading
          is="h2"
          size={800}
          marginTop="default"
          marginBottom={majorScale(3)}
        >
          Add Monitor
        </Heading>
        {submitError && (
          <Alert
            intent="danger"
            title={submitError.message}
            marginTop={majorScale(4)}
          />
        )}
        <form onSubmit={handleSubmit}>
          <TextInputField
            autoFocus
            label="Monitor Name"
            description="Monitor Name must be unique, and cannot contain punctuation marks"
            placeholder="Monitor Name"
            isInvalid={errors.name && touched.name}
            validationMessage={touched.name && errors.name}
            required
            {...getInputFieldProps('name')}
          />
          <FormField
            label="Monitor Description"
            isRequired
            validationMessage={touched.description && errors.description}
            labelFor="description"
            marginBottom={majorScale(3)}
          >
            <Textarea
              id="description"
              placeholder="Monitor description..."
              isInvalid={errors.description && touched.description}
              required
              {...getInputFieldProps('description')}
            />
          </FormField>
          <FormField
            label="Monitor Status"
            labelFor="status"
            marginBottom={majorScale(3)}
          >
            <Pane display="flex" alignItems="center">
              <Switch
                id="status"
                {...getSwitchFieldProps('status')}
                marginRight={majorScale(1)}
              />
              <Text>
                {getSwitchFieldProps('status').checked ? `Online` : `Offline`}
              </Text>
            </Pane>
          </FormField>
          <FormField
            label="Priority"
            labelFor="priority"
            marginBottom={majorScale(3)}
          >
            <SegmentedControl
              options={priorityOptions}
              {...getSegmentedControlFieldProps('priority')}
            />
          </FormField>

          <FormField
            label="EPL Query"
            isRequired
            labelFor="query"
            marginBottom={majorScale(2)}
            validationMessage={touched.query && errors.query}
          >
            <Textarea
              id="query"
              placeholder="EPL Query..."
              required
              {...getInputFieldProps('query')}
              isInvalid={errors.query && touched.query}
            />
          </FormField>
          <FormField
            label="Cache Window"
            labelFor="cacheWindow"
            marginBottom={majorScale(2)}
          >
            <input
              id="cacheWindow"
              type="range"
              min={min}
              max={max}
              {...getInputFieldProps('cacheWindow')}
              style={{
                width: `100%`,
              }}
            />
            <Text>
              {durationNames()[getInputFieldProps('cacheWindow').value]}
            </Text>
          </FormField>
          <FormField
            label="Categories"
            labelFor="categories"
            marginBottom={majorScale(2)}
          >
            <SelectMenu id="categories" isMultiSelect title="Select Categories">
              <Button type="button" iconAfter="caret-down">
                Select Categories
              </Button>
            </SelectMenu>
          </FormField>
          <FormField
            label="Actions"
            labelFor="actions"
            marginBottom={majorScale(2)}
          >
            <SelectMenu id="actions" isMultiSelect title="Select Actions">
              <Button type="button" iconAfter="caret-down">
                Select Actions
              </Button>
            </SelectMenu>
          </FormField>
          <Pane display="flex">
            <FormField
              label="Groups"
              labelFor="groups"
              marginBottom={majorScale(3)}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
            >
              <SelectMenu
                id="groups"
                isMultiSelect
                position={Position.BOTTOM_LEFT}
                title="Select Groups"
                options={allGroups.map((group) => ({
                  label: group.name,
                  value: `${group.id}`,
                }))}
                {...getSelectMenuProps(`groups`)}
                width={400}
              >
                <Button type="button" iconAfter="caret-down">
                  {getSelectMenuProps(`groups`).selected.length
                    ? `${getSelectMenuProps(`groups`).selected.length} group${
                        getSelectMenuProps(`groups`).selected.length > 1
                          ? `s`
                          : ``
                      } selected`
                    : `Select Groups`}
                </Button>
              </SelectMenu>
            </FormField>
          </Pane>
          <Button appearance="primary">Submit</Button>
        </form>
      </Pane>
    </Pane>
  )
}

export default AddMonitor
