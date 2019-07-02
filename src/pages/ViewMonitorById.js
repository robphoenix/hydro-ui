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

const ViewMonitorById = ({ id }) => {
  const Order = {
    NONE: 'NONE',
    ASC: 'ASC',
    DESC: 'DESC',
  }

  const [headers, setHeaders] = React.useState([])
  const [headersMetadata, setHeadersMetadata] = React.useState([])
  const [data, setData] = React.useState([])
  const [isLiveData, setIsLiveData] = React.useState(false)
  const [showEplQuery, setShowEplQuery] = React.useState(false)
  const [dataPaused, setDataPaused] = React.useState(false)
  const [dataReceived, setDataReceived] = React.useState(``)
  // const [colToSort, setColToSort] = React.useState(``)
  const [ordering, setOrdering] = React.useState({})

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

  const togglePause = () => {
    setDataPaused(!dataPaused)
  }

  const getIconForOrder = (name) => {
    switch (ordering[name]) {
      case Order.ASC:
        return 'arrow-up'
      case Order.DESC:
        return 'arrow-down'
      default:
        return 'caret-down'
    }
  }

  const compare = (a, b, isAsc) => {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1)
  }

  const sortableIpAddress = (ip) => {
    return ip
      .split('.')
      .map((octet) => octet.padStart(3, '0'))
      .join('')
  }

  const sort = (data) => {
    const col = Object.keys(ordering)[0]
    if (!col) {
      return data
    }

    const type = headersMetadata[col] ? headersMetadata[col].type : ''

    const direction = ordering[col]
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
          return this.compare(new Date(a[col]), new Date(a[col]), isAsc)
        default:
          return compare(a[col], b[col], isAsc)
      }
    })
    return sorted
  }

  React.useEffect(() => {
    if (dataPaused) {
      closeEventBusConnections()
    }
    if (!dataPaused) {
      initLiveDataConnection(monitor.name)
    }
    // TODO: double check that suppressing this warning is the right thing to
    // do, see https://github.com/facebook/create-react-app/issues/6880
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPaused])

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
      setHeaders(liveDataMessage.headers)
      setHeadersMetadata(liveDataMessage.headersMetadata)
      setData(liveDataMessage.data)
      setIsLiveData(true)
      setDataReceived(dateFnsFormat(new Date(), `HH:mm:ss dd/MM/yyyy`))
    }
  }, [headers, liveDataMessage])

  React.useEffect(() => {
    if (!isLiveData) {
      setHeaders(cachedDataMessage.headers)
      setData(cachedDataMessage.data)
    }
  }, [cachedDataMessage, isLiveData])

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
              isShown={showEplQuery}
              title="EPL Query"
              onCloseComplete={() => setShowEplQuery(false)}
              hasFooter={false}
            >
              <Pre maxWidth={1000} whiteSpace="pre-wrap">
                <Code appearance="minimal" size={500}>
                  {monitor.query}
                </Code>
              </Pre>
            </Dialog>
            <Button
              onClick={togglePause}
              disabled={!isLiveData}
              marginRight={majorScale(2)}
              intent="warning"
            >
              {dataPaused ? 'Run' : 'Pause'}
            </Button>
            <Button
              onClick={() => setShowEplQuery(true)}
              marginRight={majorScale(2)}
            >
              View EPL Query
            </Button>
            <Button
              onClick={() => navigate(`${monitor.id}/edit`)}
              appearance="primary"
            >
              Edit
            </Button>
            {monitor && data && (
              <Text marginLeft={majorScale(2)}>
                Currently viewing{' '}
                {isLiveData ? (
                  <Badge color="green">live</Badge>
                ) : (
                  <Badge color="yellow">cached</Badge>
                )}{' '}
                data
              </Text>
            )}
            {isLiveData && <Text>, received at {dataReceived}</Text>}
          </Pane>
        </Pane>
      )}
      {monitor && data && (
        <Table>
          <Table.Head>
            {headers.map((header) => {
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
                          selected={ordering[header] || Order.NONE}
                          onChange={(value) => {
                            setOrdering({ [header]: value })
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
            {sort(data).map((row) => {
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
