import React from 'react'
import { useMonitors } from '../context/monitors-context'
import {
  Pane,
  Text,
  majorScale,
  Button,
  Table,
  Dialog,
  Pre,
  Code,
  Badge,
  toaster,
  Popover,
  Position,
  Menu,
  TextDropdownButton,
  SearchInput,
  Strong,
  CornerDialog,
} from 'evergreen-ui'
import dateFnsFormat from 'date-fns/format'
import { navigate } from '@reach/router'

import FullPageSpinner from '../components/FullPageSpinner'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'
import { Order, compare, sortableIpAddress } from '../utils/sort'
import copy from '../utils/copy-to-clipboard'
import MonitorCategories from '../components/MonitorCategories'
import { matchesSearchQuery } from '../utils/filters'

const reducer = (state, action) => {
  switch (action.type) {
    case `SET_DATA`:
      return {
        ...state,
        ...action.payload,
      }
    case `TOGGLE_PAUSE`:
      return {
        ...state,
        paused: !state.paused,
      }
    case `SHOW_EPL`:
      return {
        ...state,
        showEplQuery: true,
      }
    case `HIDE_EPL`:
      return {
        ...state,
        showEplQuery: false,
      }
    case `SET_DIRECTION`:
      return {
        ...state,
        direction: {
          ...action.payload,
        },
      }
    case `SET_SEARCH_QUERY`:
      return {
        ...state,
        searchQuery: action.payload,
      }
    case `SET_CHANGE_EVENT`:
      return {
        ...state,
        showChangeEvent: true,
        changeEventMessage: action.payload,
      }
    case `SET_CHANGE_EVENT_CLOSE`:
      return {
        ...state,
        showChangeEvent: false,
        changeEventMessage: ``,
      }
    default:
      return state
  }
}

const ViewMonitorById = ({ id }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    headers: [],
    headersMetadata: [],
    data: [],
    isLiveData: false,
    showEplQuery: false,
    paused: false,
    receivedAt: ``,
    direction: {},
    searchQuery: ``,
    showChangeEvent: false,
    changeEventMessage: ``,
  })

  const {
    monitor,
    fetchMonitorById,
    liveDataMessage,
    cachedDataMessage,
    changeEvent,
    initLiveDataConnection,
    initCachedDataConnection,
    initChangeEventsConnection,
    closeEventBusConnections,
    errors,
    isLoading,
  } = useMonitors()

  const getIconForOrder = (name) => {
    switch (state.direction[name]) {
      case Order.ASC:
        return 'arrow-up'
      case Order.DESC:
        return 'arrow-down'
      default:
        return 'caret-down'
    }
  }

  const filter = (data) => {
    const searchQuery = state.searchQuery.trim()
    if (!searchQuery) {
      return data
    }
    const filtered = data.filter((row) => {
      return matchesSearchQuery(Object.values(row).join(` `), searchQuery)
    })
    return filtered
  }

  const sort = (data) => {
    const col = Object.keys(state.direction)[0]
    if (!col) {
      return data
    }

    const type = state.headersMetadata[col]
      ? state.headersMetadata[col].type
      : ''

    const direction = state.direction[col]
    if (direction === Order.NONE) {
      return data
    }
    const isAsc = direction === Order.ASC
    const sorted = data.sort((a, b) => {
      switch (type) {
        case 'ip':
          return compare(
            sortableIpAddress(a[col]),
            sortableIpAddress(b[col]),
            isAsc,
          )
        case 'dateTime':
          return compare(new Date(a[col]), new Date(a[col]), isAsc)
        default:
          return compare(a[col], b[col], isAsc)
      }
    })
    return sorted
  }

  React.useEffect(() => {
    if (state.paused) {
      closeEventBusConnections()
    }
    if (!state.paused) {
      initLiveDataConnection(monitor.name)
    }
    // TODO: double check that suppressing this warning is the right thing to
    // do, see https://github.com/facebook/create-react-app/issues/6880
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.paused])

  React.useEffect(() => {
    fetchMonitorById(id)
  }, [fetchMonitorById, id])

  React.useEffect(() => {
    const error = errors.monitorById
    if (error) {
      const { cause } = error
      toaster.danger(`Cannot view monitor`, { description: cause })
      navigate(`/monitors/view`)
    }
  })

  React.useEffect(() => {
    if (monitor) {
      initCachedDataConnection(monitor.name)
    }
  }, [initCachedDataConnection, monitor])

  React.useEffect(() => {
    if (monitor) {
      initLiveDataConnection(monitor.name)
    }
  }, [initLiveDataConnection, monitor])

  React.useEffect(() => {
    if (monitor) {
      initChangeEventsConnection(monitor.name)
    }
  }, [initChangeEventsConnection, monitor])

  const isFirst = React.useRef(true)
  React.useEffect(() => {
    const changeEventMessages = {
      // this monitor was just removed from the monitor cache, which means it got archived;
      removed: `The monitor has been archived by another user.`,
      // this monitor just got its status changed to online;
      online: `The monitor status has been changed to online by another user.`,
      // this monitor just got its status changed to online;
      offline: `The monitor status has been changed to offline by another user.`,
      // the EPL query for this monitor was updated;
      eplUpdated: `The monitor EPL Query has been changed by another user.`,
      // the cache window for this monitor was updated.
      cacheWindowChanged: `The monitor cache window has been changed by another user.`,
    }

    // we want to avoid showing a change event dialog on first render
    // https://stackoverflow.com/a/54895884
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    dispatch({
      type: `SET_CHANGE_EVENT`,
      payload: changeEventMessages[changeEvent.body],
    })
  }, [changeEvent])

  React.useEffect(() => {
    if (Object.keys(liveDataMessage) && Object.keys(liveDataMessage).length) {
      const { headers, headersMetadata, data } = liveDataMessage
      const isLiveData = true
      const receivedAt = dateFnsFormat(new Date(), `HH:mm:ss dd/MM/yyyy`)
      dispatch({
        type: `SET_DATA`,
        payload: { headers, headersMetadata, data, isLiveData, receivedAt },
      })
    }
  }, [liveDataMessage])

  React.useEffect(() => {
    if (!state.isLiveData) {
      const { headers, headersMetadata, data } = cachedDataMessage
      dispatch({
        type: `SET_DATA`,
        payload: { headers, headersMetadata, data },
      })
    }
  }, [cachedDataMessage, state.isLiveData])

  const showEpl = (show) => {
    const type = show ? `SHOW_EPL` : `HIDE_EPL`
    dispatch({ type })
  }

  const togglePause = () => dispatch({ type: `TOGGLE_PAUSE` })
  const handleSearchChange = (e) =>
    dispatch({ type: `SET_SEARCH_QUERY`, payload: e.target.value })

  return (
    <PageContainer width="80%">
      {!isLoading && monitor && !!Object.keys(monitor).length && (
        <Pane>
          <Pane marginBottom={majorScale(3)}>
            <PageHeading>{monitor.name}</PageHeading>
            <Pane display="flex" flexDirection="column">
              <Text size={600} marginBottom={majorScale(2)}>
                {monitor.description}
              </Text>
              <Pane display="flex" alignItems="center">
                <MonitorCategories categories={monitor.categories} />
                <Pane marginLeft={majorScale(4)}>
                  {monitor && state.data && (
                    <Text size={500}>
                      Currently viewing{' '}
                      {state.isLiveData ? (
                        <Badge color="green">live</Badge>
                      ) : (
                        <Badge color="yellow">cached</Badge>
                      )}{' '}
                      data
                    </Text>
                  )}
                  {state.isLiveData && (
                    <Text size={500}>
                      , received at <Strong>{state.receivedAt}</Strong>{' '}
                    </Text>
                  )}
                </Pane>
              </Pane>
            </Pane>
          </Pane>
          <Pane display="flex" alignItems="center" marginBottom={majorScale(4)}>
            <Dialog
              isShown={state.showEplQuery}
              onCloseComplete={() => showEpl(false)}
              hasFooter={false}
              hasHeader={false}
              hasClose={true}
            >
              <Pre
                maxWidth={600}
                whiteSpace="pre-wrap"
                marginBottom={majorScale(2)}
              >
                <Code appearance="minimal" size={500}>
                  {monitor.query}
                </Code>
              </Pre>
              <Pane display="flex" justifyContent="flex-end">
                <Button
                  color="danger"
                  appearance="minimal"
                  onClick={() => showEpl(false)}
                >
                  Close
                </Button>
                <Button
                  appearance="minimal"
                  onClick={() => {
                    copy(monitor.query)
                    toaster.success(`Copied query from monitor ${monitor.name}`)
                    showEpl(false)
                  }}
                >
                  Copy Epl Query
                </Button>
              </Pane>
            </Dialog>
            <Pane width="30%" marginRight={majorScale(2)}>
              <SearchInput
                placeholder="Search Monitor Data"
                width="100%"
                onChange={handleSearchChange}
                value={state.searchQuery}
              />
            </Pane>
            <Button onClick={() => showEpl(true)} marginRight={majorScale(2)}>
              View EPL Query
            </Button>
            <Button
              onClick={() => navigate(`${monitor.id}/edit`)}
              appearance="primary"
              marginRight={majorScale(2)}
            >
              Edit
            </Button>
            <Button
              onClick={togglePause}
              disabled={!state.isLiveData}
              marginRight={majorScale(2)}
              intent={state.paused ? 'success' : 'warning'}
              appearance="primary"
            >
              {state.paused ? 'Run' : 'Pause'}
            </Button>
          </Pane>
        </Pane>
      )}
      {!state.data && (
        <Pane>
          <FullPageSpinner height={400} />
          <Text />
        </Pane>
      )}
      {monitor && state.data && (
        <Table>
          <Table.Head>
            {state.headers.map((header) => {
              return (
                <Table.TextHeaderCell key={header}>
                  <Popover
                    position={Position.BOTTOM_LEFT}
                    content={({ close }) => (
                      <Menu>
                        <Menu.OptionsGroup
                          title="Order"
                          options={[
                            { label: 'Ascending', value: Order.ASC },
                            { label: 'Descending', value: Order.DESC },
                            { label: 'None', value: Order.NONE },
                          ]}
                          selected={state.direction[header] || Order.NONE}
                          onChange={(value) => {
                            dispatch({
                              type: `SET_DIRECTION`,
                              payload: { [header]: value },
                            })
                            // Close the popover when you select a value.
                            close()
                          }}
                        />
                      </Menu>
                    )}
                  >
                    <TextDropdownButton icon={getIconForOrder(header)}>
                      <Text size={500} marginRight={majorScale(1)}>
                        {header}
                      </Text>
                    </TextDropdownButton>
                  </Popover>
                </Table.TextHeaderCell>
              )
            })}
          </Table.Head>
          <Table.VirtualBody height={700}>
            {filter(sort(state.data)).map((row, i) => {
              return (
                <Table.Row
                  key={Object.values(row).join(``)}
                  background={i % 2 !== 0 && 'tint1'}
                  borderLeft={i % 2 !== 0 && '1px solid #EDF0F2'}
                >
                  {Object.values(row).map((cell) => (
                    <Table.TextCell key={cell}>{cell || `-`}</Table.TextCell>
                  ))}
                </Table.Row>
              )
            })}
          </Table.VirtualBody>
        </Table>
      )}

      <CornerDialog
        title={`${monitor.name} Change Event`}
        isShown={state.showChangeEvent}
        onCloseComplete={() => dispatch({ type: `SET_CHANGE_EVENT_CLOSE` })}
        hasFooter={false}
      >
        <Text>{state.changeEventMessage}</Text>
      </CornerDialog>
    </PageContainer>
  )
}

export default ViewMonitorById
