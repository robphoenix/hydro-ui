import { get } from './api-client'

const p = (endpoint) => {
  return `/p/${endpoint}`
}

const getMonitors = (handleResponse) => {
  return get(p(`monitors`))
    .then((monitors) => handleResponse(monitors))
    .catch((error) => console.log({ error }))
}

export { getMonitors }
