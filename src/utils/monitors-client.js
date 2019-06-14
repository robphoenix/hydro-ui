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

const getMonitorById = (id) => {
  return get(monitorsUrl(id))
}

const addMonitor = (monitor) => {
  return post(monitorsUrl(), monitor)
}

const updateMonitor = (monitor) => {
  return put(monitorsUrl(monitor.id), monitor)
}

const disableMonitor = (monitor) => {
  monitor.status = `offline`
  return updateMonitor(monitor)
}

const enableMonitor = (monitor) => {
  monitor.status = `online`
  return updateMonitor(monitor)
}

const archiveMonitor = (monitor) => {
  monitor.status = `archived`
  return updateMonitor(monitor)
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
  getMonitorById,
  addMonitor,
  updateMonitor,
  addCategories,
  disableMonitor,
  enableMonitor,
  archiveMonitor,
  unarchiveMonitor,
  getAllGroups,
  getAllCategories,
  getAllActions,
}
