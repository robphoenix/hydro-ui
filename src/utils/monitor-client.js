import { get, put, post } from './api-client'

const monitorsUrl = (endpoint = ``) => {
  return `p/monitors${endpoint ? '/' : ''}${endpoint}`
}
const optionsUrl = (endpoint) => {
  return `${monitorsUrl()}/options/${endpoint}`
}

const getMonitors = () => {
  return get(monitorsUrl())
}

const addMonitor = (monitor) => {
  return post(monitorsUrl(), monitor)
}

const disableMonitor = (monitor) => {
  monitor.status = `offline`
  return put(monitorsUrl(monitor.id), monitor)
}

const enableMonitor = (monitor) => {
  monitor.status = `online`
  return put(monitorsUrl(monitor.id), monitor)
}

const archiveMonitor = (monitor) => {
  monitor.status = `archived`
  return put(monitorsUrl(monitor.id), monitor)
}

const unarchiveMonitor = (monitor) => {
  return disableMonitor(monitor)
}

const getAllGroups = () => {
  return get(optionsUrl(`groups`))
}

export {
  getMonitors,
  addMonitor,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
  getAllGroups,
}
