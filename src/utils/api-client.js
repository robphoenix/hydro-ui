import axios from 'axios'

const apiUrl = 'http://mn2formlt0001d0:6080'

const client = (method, endpoint, data) => {
  const url = `${apiUrl}/${endpoint}`

  return axios({
    method,
    url,
    data,
  })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      return Promise.reject(err)
    })
}

const get = (endpoint) => {
  return client(`GET`, endpoint)
}

const post = (endpoint, data) => {
  return client(`POST`, endpoint, data)
}

export { get, post }
