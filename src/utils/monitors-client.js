import { get, put } from './api-client'

const monitorsUrl = (endpoint = ``) => {
  return `p/monitors${endpoint}`
}

const getMonitors = () => {
  return get(monitorsUrl())
}

const disableMonitor = (monitor) => {
  monitor.status = `offline`
  return put(monitorsUrl(`/${monitor.id}`), monitor)
}

export { getMonitors, disableMonitor }
