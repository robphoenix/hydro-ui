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

const enableMonitor = (monitor) => {
  monitor.status = `online`
  return put(monitorsUrl(`/${monitor.id}`), monitor)
}

const archiveMonitor = (monitor) => {
  monitor.status = `archived`
  return put(monitorsUrl(`/${monitor.id}`), monitor)
}

const unarchiveMonitor = (monitor) => {
  return disableMonitor(monitor)
}

export {
  getMonitors,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
}
