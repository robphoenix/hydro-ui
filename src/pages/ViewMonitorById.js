import React from 'react'
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
  SearchInput,
  Strong,
  CornerDialog,
} from 'evergreen-ui'
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
import useMonitor from '../hooks/useMonitor'

const eventBusUrl = `${EVENTBUS_ROOT}/eventbus`
const outputAddress = 'result.pub.output.'
const cachedAddress = 'result.pub.cached'
const statusAddress = 'monitor.status.'

const ViewMonitorById = ({ id }) => {
  const {
    monitor,
    searchQuery,
    direction,
    headersMetadata,
    isLiveData,
    paused,
    headers,
    data,
    maxLengths,
    showEplQuery,
    receivedAt,
    showChangeEvent,
    changeEventMessage,
    isLoading,
    errors,
    fetchMonitorById,
    handleCachedMessage,
    handleLiveMessage,
    handleChangeEventMessage,
    showEpl,
    togglePause,
    handleSearchChange,
    handleSortOrderChange,
    handleChangeEventClose,
  } = useMonitor()

  const filter = (data) => {
    if (!searchQuery) {
      return data
    }
    return data.filter((row) => {
      // @ts-ignore
      return matchesSearchQuery(Object.values(row).join(` `), searchQuery)
    })
  }

  const sort = (data) => {
    const col = Object.keys(direction)[0]
    if (!col) {
      return data
    }

    const type = headersMetadata[col] ? headersMetadata[col].type : ''

    const order = direction[col]
    if (order === Order.NONE) {
      return data
    }
    const isAsc = order === Order.ASC
    return data.sort((a, b) => {
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
  }

  React.useEffect(() => {
    fetchMonitorById(id)
  }, [fetchMonitorById, id])

  React.useEffect(() => {
    if (Object.keys(monitor).length) {
      const eb = new EventBus(eventBusUrl, {})

      eb.enableReconnect(true)
      eb.onerror = () =>
        console.error(`[connection error]: CACHED ${monitor.name}`)
      // @ts-ignore
      eb.onclose = () =>
        console.log(`[connection closed]: CACHED ${monitor.name}`)
      // @ts-ignore
      eb.onopen = () => {
        console.log(`[connection open]: CACHED ${monitor.name}`)
        eb.send(cachedAddress, monitor.name, {}, (error, message) => {
          if (error) {
            console.log({ error })
            eb.close()
          }
          if (message) {
            handleCachedMessage(message)
          }
          // we'll only ever recieve the one message
          if (eb) {
            eb.close()
          }
        })
      }
      if (isLiveData) {
        eb.close()
      }
    }
  }, [handleCachedMessage, isLiveData, monitor])

  React.useEffect(() => {
    let eb
    if (Object.keys(monitor).length) {
      if (paused && eb) {
        // @ts-ignore
        eb.close()
      }
      if (!paused) {
        eb = new EventBus(eventBusUrl, {})
        const address = `${outputAddress}${monitor.name}`
        eb.enableReconnect(true)
        eb.onerror = () =>
          console.error(`[connection error]: LIVE ${monitor.name}`)
        // @ts-ignore
        eb.onclose = () =>
          console.log(`[connection closed]: LIVE ${monitor.name}`)
        // @ts-ignore
        eb.onopen = () => {
          console.log(`[connection open]: LIVE ${monitor.name}`)
          eb.registerHandler(address, {}, (error, message) => {
            if (error) {
              eb.close()
            }
            if (message) {
              handleLiveMessage(message)
            }
          })
        }
      }
      return () => {
        if (eb) {
          eb.close()
        }
      }
    }
  }, [handleLiveMessage, monitor, paused])

  React.useEffect(() => {
    let eb
    if (Object.keys(monitor).length) {
      eb = new EventBus(eventBusUrl, {})
      const address = `${statusAddress}${monitor.name}`
      eb.enableReconnect(true)
      eb.onerror = () =>
        console.error(`[connection error]: CHANGE EVENTS ${monitor.name}`)
      // @ts-ignore
      eb.onclose = () =>
        console.log(`[connection closed]: CHANGE EVENTS ${monitor.name}`)
      // @ts-ignore
      eb.onopen = () => {
        console.log(`[connection open]: CHANGE EVENTS ${monitor.name}`)
        eb.registerHandler(address, {}, (error, message) => {
          if (error) {
            eb.close()
          }
          if (message) {
            handleChangeEventMessage(message)
          }
        })
      }
    }
    return () => {
      if (eb) {
        eb.close()
      }
    }
  }, [handleChangeEventMessage, monitor])

  React.useEffect(() => {
    const error = errors.monitorById
    if (error) {
      const { cause } = error
      toaster.danger(`Cannot view monitor`, { description: cause })
      navigate(`/monitors/view`)
    }
  })

  const getFlexValue = (column) => {
    const cellMaxLength = maxLengths[column]
    if (cellMaxLength < 18) {
      return 1
    }
    if (cellMaxLength < 40) {
      return 3
    }
    return 4
  }

  return (
    <PageContainer width="80%">
      {!isLoading && (
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
                  {monitor && data && (
                    <Text size={500}>
                      Currently viewing{' '}
                      {isLiveData ? (
                        <Badge color="green">live</Badge>
                      ) : (
                        <Badge color="yellow">cached</Badge>
                      )}{' '}
                      data
                    </Text>
                  )}
                  {isLiveData && (
                    <Text size={500}>
                      , received at <Strong>{receivedAt}</Strong>{' '}
                    </Text>
                  )}
                </Pane>
              </Pane>
            </Pane>
          </Pane>
          <Pane display="flex" alignItems="center" marginBottom={majorScale(4)}>
            <Dialog
              isShown={showEplQuery}
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
                value={searchQuery}
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
              disabled={!isLiveData}
              marginRight={majorScale(2)}
              intent={paused ? 'success' : 'warning'}
              appearance="primary"
            >
              {paused ? 'Run' : 'Pause'}
            </Button>
          </Pane>
        </Pane>
      )}
      {!data && (
        <Pane>
          <FullPageSpinner height={400} />
          <Text />
        </Pane>
      )}
      {monitor && data && (
        <Table>
          <Table.Head paddingRight="0">
            {headers.map((column) => (
              <Table.TextHeaderCell key={column} flex={getFlexValue(column)}>
                {column}
              </Table.TextHeaderCell>
            ))}
          </Table.Head>
          <Table.VirtualBody height={700}>
            <Pane>
              {filter(sort(data)).map((row, i) => {
                return (
                  <Table.Row
                    // @ts-ignore
                    key={Object.values(row).join(``)}
                    background={i % 2 !== 0 ? `tint1` : ``}
                    borderLeft={i % 2 !== 0 && `1px solid #EDF0F2`}
                  >
                    {Object.keys(row).map((column, i) => (
                      <Table.TextCell
                        key={`${i}${row[column]}`}
                        flex={getFlexValue(column)}
                      >
                        {row[column]}
                      </Table.TextCell>
                    ))}
                  </Table.Row>
                )
              })}
            </Pane>
          </Table.VirtualBody>
        </Table>
      )}

      <CornerDialog
        title={`${monitor.name} Change Event`}
        hasFooter={false}
        isShown={showChangeEvent}
        onCloseComplete={handleChangeEventClose}
      >
        <Text>{changeEventMessage}</Text>
      </CornerDialog>
    </PageContainer>
  )
}

export default ViewMonitorById
