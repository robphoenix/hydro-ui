import axios from 'axios'

const client = (method, endpoint, data) => {
  const url = `${process.env.REACT_APP_API_ROOT}/${endpoint}`

  return axios({
    method,
    url,
    data,
  })
    .then((response) => {
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
