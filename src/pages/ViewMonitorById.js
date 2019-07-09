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
import EventBus from 'vertx3-eventbus-client'
import { EVENTBUS_ROOT } from '../utils/environments'

const eventBusUrl = `${EVENTBUS_ROOT}/eventbus`
const outputAddress = 'result.pub.output.'
const cachedAddress = 'result.pub.cached'
const statusAddress = 'monitor.status.'

const reducer = (state, action) => {
  switch (action.type) {
    case `SUCCESS`:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
      }
    case `SET_ERROR`:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      }
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
    isLoading: true,
    monitor: {},
    errors: {},
    cachedConnectionOpened: false,
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

  const { getMonitorById, changeEvent, errors, isLoading } = useMonitors()

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

  const getMessageData = (body) => {
    const { h, d } = body

    const headersMetadata = h.reduce((metadata, header) => {
      const { n: name, t: type, f: format } = header
      metadata[name] = { type, format }
      return metadata
    }, {})

    const headers = h.map((header) => header.n)

    const data = d.map((attributes) => {
      return attributes.reduce((columns, column, i) => {
        columns[headers[i]] = column
        return columns
      }, {})
    })
    return { headersMetadata, headers, data }
  }

  React.useEffect(() => {
    const fetchMonitorById = async (id) => {
      try {
        const monitor = await getMonitorById(id)
        dispatch({ type: 'SUCCESS', payload: { monitor } })
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: { monitorById: error } })
      }
    }
    fetchMonitorById(id)
  }, [getMonitorById, id])

  React.useEffect(() => {
    if (Object.keys(state.monitor).length && !state.cachedConnectionOpened) {
      const eb = new EventBus(eventBusUrl, {})

      eb.enableReconnect(true)
      eb.onerror = () =>
        console.error(`[connection error]: CACHED ${state.monitor.name}`)
      eb.onclose = () =>
        console.log(`[connection closed]: CACHED ${state.monitor.name}`)
      eb.onopen = () => {
        console.log(`[connection open]: CACHED ${state.monitor.name}`)
        dispatch({
          type: `SET_DATA`,
          payload: { cachedConnectionOpened: true },
        })
        eb.send(cachedAddress, state.monitor.name, {}, (error, message) => {
          if (error) {
            console.log({ error })
            eb.close()
          }
          if (message) {
            const { headers, headersMetadata, data } = getMessageData(
              message.body,
            )
            dispatch({
              type: `SET_DATA`,
              payload: { headers, headersMetadata, data },
            })
          }
          // we'll only ever recieve the one message
          eb.close()
        })
      }
      if (state.isLiveData) {
        eb.close()
      }
    }
  }, [state.cachedConnectionOpened, state.isLiveData, state.monitor])

  React.useEffect(() => {
    let eb
    if (Object.keys(state.monitor).length) {
      eb = new EventBus(eventBusUrl, {})
      const address = `${outputAddress}${state.monitor.name}`
      eb.enableReconnect(true)
      eb.onerror = () =>
        console.error(`[connection error]: LIVE ${state.monitor.name}`)
      eb.onclose = () =>
        console.log(`[connection closed]: LIVE ${state.monitor.name}`)
      eb.onopen = () => {
        console.log(`[connection open]: LIVE ${state.monitor.name}`)
        eb.registerHandler(address, {}, (error, message) => {
          if (error) {
            eb.close()
          }
          if (message && message.body) {
            const isLiveData = true
            const receivedAt = dateFnsFormat(new Date(), `HH:mm:ss dd/MM/yyyy`)
            const { headers, headersMetadata, data } = getMessageData(
              message.body,
            )
            dispatch({
              type: `SET_DATA`,
              payload: {
                headers,
                headersMetadata,
                data,
                isLiveData,
                receivedAt,
              },
            })
          }
        })
      }
    }
    return () => {
      dispatch({
        type: `SET_DATA`,
        payload: {
          headers: [],
          headersMetadata: [],
          data: [],
          isLiveData: false,
          receivedAt: ``,
        },
      })
      if (eb) {
        eb.close()
      }
    }
  }, [state.monitor])

  const isFirstChangeEvent = React.useRef(true)
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
    let eb
    if (Object.keys(state.monitor).length) {
      eb = new EventBus(eventBusUrl, {})
      const address = `${statusAddress}${state.monitor.name}`
      eb.enableReconnect(true)
      eb.onerror = () =>
        console.error(`[connection error]: CHANGE EVENTS ${state.monitor.name}`)
      eb.onclose = () =>
        console.log(`[connection closed]: CHANGE EVENTS ${state.monitor.name}`)
      eb.onopen = () => {
        console.log(`[connection open]: CHANGE EVENTS ${state.monitor.name}`)
        eb.registerHandler(address, {}, (error, message) => {
          if (error) {
            eb.close()
          }
          if (message && message.body) {
            console.log({ message })
            // we want to avoid showing a change event dialog on first render
            // https://stackoverflow.com/a/54895884
            if (isFirstChangeEvent.current) {
              isFirstChangeEvent.current = false
              return
            }
            dispatch({
              type: `SET_CHANGE_EVENT`,
              payload: changeEventMessages[message.body],
            })
          }
        })
      }
    }
    return () => {
      if (eb) {
        eb.close()
      }
    }
  }, [state.monitor])

  React.useEffect(() => {
    const error = errors.monitorById
    if (error) {
      const { cause } = error
      toaster.danger(`Cannot view monitor`, { description: cause })
      navigate(`/monitors/view`)
    }
  })

  React.useEffect(() => {}, [changeEvent])

  const showEpl = (show) => {
    const type = show ? `SHOW_EPL` : `HIDE_EPL`
    dispatch({ type })
  }

  const togglePause = () => dispatch({ type: `TOGGLE_PAUSE` })
  const handleSearchChange = (e) =>
    dispatch({ type: `SET_SEARCH_QUERY`, payload: e.target.value })

  return (
    <PageContainer width="80%">
      {state.monitor && !!Object.keys(state.monitor).length && (
        <Pane>
          <Pane marginBottom={majorScale(3)}>
            <PageHeading>{state.monitor.name}</PageHeading>
            <Pane display="flex" flexDirection="column">
              <Text size={600} marginBottom={majorScale(2)}>
                {state.monitor.description}
              </Text>
              <Pane display="flex" alignItems="center">
                <MonitorCategories categories={state.monitor.categories} />
                <Pane marginLeft={majorScale(4)}>
                  {state.monitor && state.data && (
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
                  {state.monitor.query}
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
                    copy(state.monitor.query)
                    toaster.success(
                      `Copied query from monitor ${state.monitor.name}`,
                    )
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
              onClick={() => navigate(`${state.monitor.id}/edit`)}
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
      {state.monitor && state.data && (
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
                  background={i % 2 !== 0 ? `tint1` : ``}
                  borderLeft={i % 2 !== 0 && `1px solid #EDF0F2`}
                >
                  {Object.values(row).map((cell, i) => (
                    <Table.TextCell key={`${i}${cell}`}>{cell}</Table.TextCell>
                  ))}
                </Table.Row>
              )
            })}
          </Table.VirtualBody>
        </Table>
      )}

      <CornerDialog
        title={`${state.monitor.name} Change Event`}
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
