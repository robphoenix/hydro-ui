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
} from 'evergreen-ui'
import dateFnsFormat from 'date-fns/format'
import { navigate } from '@reach/router'
import FullPageSpinner from '../components/FullPageSpinner'
import PageHeading from '../components/PageHeading'
import PageContainer from '../components/PageContainer'

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
    </PageContainer>
  )
}

export default ViewMonitorById
