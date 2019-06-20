import React from 'react'
import { useMonitors } from '../context/monitors-context'
import {
  Pane,
  Heading,
  Text,
  majorScale,
  Button,
  Table,
  Dialog,
  Pre,
  Code,
  Badge,
  toaster,
  Spinner,
} from 'evergreen-ui'
import dateFnsFormat from 'date-fns/format'
import { navigate } from '@reach/router'

const ViewMonitorById = ({ id }) => {
  const [headers, setHeaders] = React.useState([])
  const [data, setData] = React.useState([])
  const [isLiveData, setIsLiveData] = React.useState(false)
  const [showEplQuery, setShowEplQuery] = React.useState(false)
  const [dataPaused, setDataPaused] = React.useState(false)
  const [dataReceived, setDataReceived] = React.useState(``)

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
    if (dataPaused) {
      closeEventBusConnections()
    } else {
      initLiveDataConnection(monitor.name)
    }
  }

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
      const { name } = monitor
      initLiveDataConnection(name)
    }
  }, [initLiveDataConnection, monitor])

  React.useEffect(() => {
    if (monitor) {
      const { name } = monitor
      initCachedDataConnection(name)
    }
  }, [initCachedDataConnection, monitor])

  React.useEffect(() => {
    if (Object.keys(liveDataMessage) && Object.keys(liveDataMessage).length) {
      setHeaders(liveDataMessage.headers)
      setData(liveDataMessage.data)
      setIsLiveData(true)
      setDataReceived(dateFnsFormat(new Date(), `HH:mm:ss dd/MM/yyyy`))
    }
  }, [liveDataMessage])

  React.useEffect(() => {
    if (!isLiveData) {
      setHeaders(cachedDataMessage.headers)
      setData(cachedDataMessage.data)
    }
  }, [cachedDataMessage, isLiveData])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="75%">
        {isLoading && (
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={400}
          >
            <Spinner />
          </Pane>
        )}
        {!isLoading && monitor && !!Object.keys(monitor).length && (
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            marginBottom={majorScale(4)}
          >
            <Heading
              is="h2"
              size={800}
              marginTop="default"
              marginBottom={majorScale(3)}
            >
              {monitor.name}
            </Heading>
            <Text size={600} marginBottom={majorScale(3)}>
              {monitor.description}
            </Text>
            <Pane display="flex" alignItems="center">
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
              {headers.map((header) => (
                <Table.TextHeaderCell key={header.n}>
                  {header.n}
                </Table.TextHeaderCell>
              ))}
            </Table.Head>
            <Table.VirtualBody height={700}>
              {data.map((row) => (
                <Table.Row key={row.join('')}>
                  {row.map((cell) => (
                    <Table.TextCell key={cell}>{cell || `-`}</Table.TextCell>
                  ))}
                </Table.Row>
              ))}
            </Table.VirtualBody>
          </Table>
        )}
      </Pane>
    </Pane>
  )
}

export default ViewMonitorById
