import axios from 'axios'

const apiUrl = 'http://mn2formlt0001d0:6080'

function client(endpoint, data) {
  const method = data ? 'post' : 'get'
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

export default client
