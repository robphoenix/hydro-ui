import client from './api-client'

const get = (endpoint) => {
  return client(`/p/${endpoint}`)
}

const getMonitors = (handleResponse) => {
  return get(`monitors`)
    .then((monitors) => handleResponse(monitors))
    .catch((error) => console.log({ error }))
}

export { getMonitors }
