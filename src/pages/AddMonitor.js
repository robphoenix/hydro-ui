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
  Position,
  toaster,
  TagInput,
} from 'evergreen-ui'

import useForm from '../hooks/useForm'
import { useMonitors } from '../context/monitors-context'
import { useUser } from '../context/user-context'
import { navigate } from '@reach/router'

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
  const categoriesMax = 4
  const priorityOptions = [
    { label: 'Lowest', value: 'lowest' },
    { label: 'Low', value: 'low' },
    { label: 'Mid', value: 'mid' },
    { label: 'High', value: 'high' },
    { label: 'Highest', value: 'highest' },
  ]

  const {
    addMonitor,
    addCategories,
    allGroups,
    fetchGroups,
    allCategories,
    fetchCategories,
    allActions,
    fetchActions,
  } = useMonitors()
  const { groups: userGroups } = useUser()

  React.useEffect(() => {
    fetchGroups()
    fetchCategories()
    fetchActions()
  }, [fetchActions, fetchCategories, fetchGroups])

  const selectedItems = (selected, all) => {
    return all.filter((category) =>
      selected.map((value) => +value).includes(category.id),
    )
  }

  const initialValues = {
    name: '',
    description: '',
    status: false,
    priority: 'mid',
    query: '',
    cacheWindow: min,
    groups: userGroups.map((g) => `${g.id}`),
    categories: [],
    newCategories: [],
    actions: [],
  }
  const onSubmit = async (values) => {
    const type = `standard`
    const status = values.status ? `online` : `offline`
    const cacheWindow = durationValues()[values.cacheWindow]
    const groups = selectedItems(values.groups, allGroups)
    const actions = selectedItems(values.actions, allActions)
    const categories = selectedItems(values.categories, allCategories)

    // NOTE: priority is not yet used
    const { name, description, query } = values
    const monitor = {
      name,
      description,
      status,
      query,
      cacheWindow,
      groups,
      type,
      actions,
      categories,
    }

    await addMonitor(monitor)
    navigate(`/monitors/view`)
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
      errors.name = `You must enter a Monitor name`
    }
    if (values.description === '') {
      errors.description = `You must enter a Monitor description`
    }
    if (values.query === '') {
      errors.query = `You must enter an EPL Query`
    }
    if (values.groups.length === 0) {
      errors.groups = `You must select at least one group`
    }
    if (values.categories && values.categories.length > 4) {
      errors.categories = `You can only select up to ${categoriesMax} categories`
    }
    return errors
  }

  const {
    handleSubmit,
    getInputFieldProps,
    getTagInputFieldProps,
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

  React.useEffect(() => {
    if (submitError) {
      const { message, cause, uuid } = submitError
      toaster.danger(message, {
        description: `${cause}  [Error id: ${uuid}]`,
      })
    }
  }, [submitError])

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
              fontFamily="mono"
              rows="10"
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
            validationMessage={errors.categories}
          >
            <SelectMenu
              id="categories"
              isMultiSelect
              title="Select Categories"
              description={`You can select up to ${categoriesMax} categories`}
              position={Position.BOTTOM_LEFT}
              options={allCategories.map((category) => ({
                label: category.name,
                value: `${category.id}`,
              }))}
              {...getSelectMenuProps(`categories`)}
              width={400}
            >
              <Button type="button" iconAfter="caret-down">
                {getSelectMenuProps(`categories`).selected.length
                  ? `${
                      getSelectMenuProps(`categories`).selected.length
                    } categor${
                      getSelectMenuProps(`categories`).selected.length > 1
                        ? `ies`
                        : `y`
                    } selected`
                  : `Select Categories`}
              </Button>
            </SelectMenu>
          </FormField>

          <FormField
            label="Create New Categories"
            labelFor="newCategories"
            marginBottom={majorScale(2)}
          >
            <Pane display="flex" alignItems="center">
              <TagInput
                inputProps={{ placeholder: 'Add Categories...' }}
                tagProps={{
                  color: 'teal',
                }}
                addOnBlur={true}
                {...getTagInputFieldProps('newCategories')}
                flex="2"
              />
              <Button
                type="button"
                marginLeft={majorScale(2)}
                onClick={async () => {
                  const props = getTagInputFieldProps('newCategories')
                  const { values, onChange } = props
                  await addCategories(values)
                  toaster.success(`New categories created: ${values}`)
                  onChange([])
                  fetchCategories()
                }}
              >
                Add Categories
              </Button>
            </Pane>
          </FormField>

          <FormField
            label="Actions"
            labelFor="actions"
            marginBottom={majorScale(2)}
          >
            <SelectMenu
              id="actions"
              isMultiSelect
              title="Select Actions"
              position={Position.BOTTOM_LEFT}
              options={allActions.map((action) => ({
                label: action.name,
                value: `${action.id}`,
              }))}
              {...getSelectMenuProps(`actions`)}
              width={400}
            >
              <Button type="button" iconAfter="caret-down">
                {getSelectMenuProps(`actions`).selected.length
                  ? `${getSelectMenuProps(`actions`).selected.length} action${
                      getSelectMenuProps(`actions`).selected.length > 1
                        ? `s`
                        : ``
                    } selected`
                  : `Select Actions`}
              </Button>
            </SelectMenu>
          </FormField>

          <FormField
            label="Groups"
            labelFor="groups"
            marginBottom={majorScale(3)}
            isRequired
            validationMessage={errors.groups}
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

          <Button appearance="primary" disabled={!!Object.keys(errors).length}>
            Submit
          </Button>
        </form>
      </Pane>
    </Pane>
  )
}

export default AddMonitor
