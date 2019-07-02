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
} from 'evergreen-ui'
import dateFnsFormat from 'date-fns/format'
import { navigate } from '@reach/router'

import FullPageSpinner from '../components/FullPageSpinner'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'
import { Order, compare, sortableIpAddress } from '../utils/sort'
import copy from '../utils/copy-to-clipboard'

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
  })

  const {
    monitor,
    fetchMonitorById,
    liveDataMessage,
    cachedDataMessage,
    initLiveDataConnection,
    initCachedDataConnection,
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

  return (
    <PageContainer width="80%">
      {isLoading && <FullPageSpinner />}
      {!isLoading && monitor && !!Object.keys(monitor).length && (
        <Pane>
          <Pane marginBottom={majorScale(3)}>
            <PageHeading>{monitor.name}</PageHeading>
            <Text size={600}>{monitor.description}</Text>
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
            <Button
              onClick={togglePause}
              disabled={!state.isLiveData}
              marginRight={majorScale(2)}
              intent="warning"
            >
              {state.paused ? 'Run' : 'Pause'}
            </Button>
            <Button onClick={() => showEpl(true)} marginRight={majorScale(2)}>
              View EPL Query
            </Button>
            <Button
              onClick={() => navigate(`${monitor.id}/edit`)}
              appearance="primary"
            >
              Edit
            </Button>
            {monitor && state.data && (
              <Text marginLeft={majorScale(2)}>
                Currently viewing{' '}
                {state.isLiveData ? (
                  <Badge color="green">live</Badge>
                ) : (
                  <Badge color="yellow">cached</Badge>
                )}{' '}
                data
              </Text>
            )}
            {state.isLiveData && <Text>, received at {state.receivedAt}</Text>}
          </Pane>
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
            {sort(state.data).map((row) => {
              return (
                <Table.Row key={Object.values(row).join(``)}>
                  {Object.values(row).map((cell) => (
                    <Table.TextCell key={cell}>{cell || `-`}</Table.TextCell>
                  ))}
                </Table.Row>
              )
            })}
          </Table.VirtualBody>
        </Table>
      )}
    </PageContainer>
  )
}

export default ViewMonitorById
