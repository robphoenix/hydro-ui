import React from 'react'
import { useMonitors } from '../context/monitors-context'
import { Pane, Heading, Text, majorScale, Button, Table } from 'evergreen-ui'

const ViewMonitorById = ({ id }) => {
  const [headers, setHeaders] = React.useState([])
  const [data, setData] = React.useState([])

  const {
    monitor,
    fetchMonitorById,
    eventBusMessage,
    initEventBus,
  } = useMonitors()

  React.useEffect(() => {
    fetchMonitorById(id)
  }, [fetchMonitorById, id])

  React.useEffect(() => {
    if (monitor) {
      const { name } = monitor
      initEventBus(name)
    }
  }, [initEventBus, monitor])

  React.useEffect(() => {
    if (Object.keys(eventBusMessage) && Object.keys(eventBusMessage).length) {
      setHeaders(eventBusMessage.headers)
      setData(eventBusMessage.data)
    }
  }, [eventBusMessage])

  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="75%">
        {monitor && (
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
            <Text size={600} marginBottom={majorScale(2)}>
              {monitor.description}
            </Text>
            <Button>View EPL Query</Button>
          </Pane>
        )}
        {monitor && (
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