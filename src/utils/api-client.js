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
      console.log({ response })

      if (response) {
        return response.data
      }
    })
    .catch((err) => Promise.reject(err))
}

const get = (endpoint) => {
  return client(`GET`, endpoint)
}

const post = (endpoint, data) => {
  return client(`POST`, endpoint, data)
}

const put = (endpoint, data) => {
  return client(`PUT`, endpoint, data)
}

export { get, post, put }
