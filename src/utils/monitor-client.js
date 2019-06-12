import { get, put, post } from './api-client'

const monitorsUrl = (endpoint = ``) => {
  return `p/monitors${endpoint ? '/' : ''}${endpoint}`
}
const optionsUrl = (endpoint) => {
  return `${monitorsUrl()}/options/${endpoint}`
}
const groupsUrl = optionsUrl(`groups`)
const actionsUrl = optionsUrl(`actions`)
const categoriesUrl = optionsUrl(`categories`)

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
  return get(groupsUrl)
}

const getAllCategories = () => {
  return get(categoriesUrl)
}

const getAllActions = () => {
  return get(actionsUrl)
}

const addCategories = (categories) => {
  return post(categoriesUrl, { categories })
}

export {
  getMonitors,
  addMonitor,
  addCategories,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
  getAllGroups,
  getAllCategories,
  getAllActions,
}
