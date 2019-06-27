import React from 'react'
import {
  Text,
  TextInputField,
  FormField,
  majorScale,
  Textarea,
  Pane,
  Switch,
  SegmentedControl,
  SelectMenu,
  Position,
  Button,
  TagInput,
  toaster,
} from 'evergreen-ui'
import { useMonitors } from '../context/monitors-context'
import useForm from '../hooks/useForm'
import { navigate } from '@reach/router'
import useCacheWindowDurations from '../hooks/useCacheWindowDurations'

const CreateMonitorForm = (props) => {
  const { initialValues, createMonitor } = props
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
    cacheWindowMin,
    cacheWindowMax,
    cacheWindowDurationValues,
    cacheWindowDurationNames,
  } = useCacheWindowDurations()

  const {
    addCategories,
    allGroups,
    fetchGroups,
    allCategories,
    fetchCategories,
    allActions,
    fetchActions,
  } = useMonitors()

  React.useEffect(() => {
    fetchGroups()
    fetchCategories()
    fetchActions()
  }, [fetchActions, fetchCategories, fetchGroups])

  const selectedItems = (selected, allItems) => {
    return allItems.filter((item) =>
      selected.map((value) => +value).includes(item.id),
    )
  }

  const onSubmit = async (values) => {
    const type = `standard`
    const status = values.status ? `online` : `offline`
    const cacheWindow = cacheWindowDurationValues[values.cacheWindow]
    const groups = selectedItems(values.groups, allGroups)
    const actions = selectedItems(values.actions, allActions)
    const categories = selectedItems(values.categories, allCategories)

    // NOTE: priority is not yet used
    const { name, description, query, id } = values
    const monitor = {
      id,
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

    await createMonitor(monitor)
    navigate(`/monitors/view`)
  }

  const validate = (values) => {
    let errors = {}
    if (!/^[a-zA-Z0-9 _-]+$/.test(values.name)) {
      errors.name = `Monitor name cannot contain punctuation marks, except dashes and underscores`
    }
    if (values.name && values.name.length > nameMaxChars) {
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
    if (values.groups && values.groups.length === 0) {
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

  const categoriesButtonText = () => {
    let text = `No Categories Avaliable`
    if (allCategories && allCategories.length) {
      const categoriesProps = getSelectMenuProps(`categories`)
      const { selected } = categoriesProps
      if (selected && selected.length) {
        const numCategories = selected && selected.length
        text = `${numCategories} categor${
          numCategories > 1 ? `ies` : `y`
        } selected`
      } else {
        text = `Select Categories`
      }
    }
    return text
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        autoFocus
        disabled={props.disableNameInput}
        label="Monitor Name"
        description={
          props.disableNameInput
            ? `Monitor name cannot be edited`
            : `Monitor Name must be unique, and cannot contain punctuation marks`
        }
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
          min={cacheWindowMin}
          max={cacheWindowMax}
          {...getInputFieldProps('cacheWindow')}
          style={{
            width: `100%`,
          }}
        />
        <Text>
          {cacheWindowDurationNames[getInputFieldProps('cacheWindow').value]}
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
          <Button
            type="button"
            iconAfter="caret-down"
            disabled={!(allCategories && !!allCategories.length)}
          >
            {categoriesButtonText()}
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
            disabled={
              getTagInputFieldProps('newCategories').values &&
              getTagInputFieldProps('newCategories').values.length === 0
            }
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
          <Button
            type="button"
            iconAfter="caret-down"
            disabled={!(allActions && !!allActions.length)}
          >
            {!allActions.length
              ? `No Actions Available`
              : getSelectMenuProps(`actions`).selected.length
              ? `${getSelectMenuProps(`actions`).selected.length} action${
                  getSelectMenuProps(`actions`).selected.length > 1 ? `s` : ``
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
            {getSelectMenuProps(`groups`).selected &&
            getSelectMenuProps(`groups`).selected.length
              ? `${getSelectMenuProps(`groups`).selected.length} group${
                  getSelectMenuProps(`groups`).selected.length > 1 ? `s` : ``
                } selected`
              : `Select Groups`}
          </Button>
        </SelectMenu>
      </FormField>

      <Button
        appearance="primary"
        disabled={!!Object.keys(errors).length}
        marginRight={majorScale(2)}
      >
        Save
      </Button>

      <Button
        type="button"
        intent="danger"
        onClick={() => navigate(`/monitors/view`)}
      >
        Cancel
      </Button>
    </form>
  )
}

export default CreateMonitorForm
