import axios from 'axios'

import { getToken } from './auth'

const apiUrl = 'http://mn2formlt0001d0:6080'

function client(endpoint, data) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

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

  // const config = {
  //   method: body ? 'POST' : 'GET',
  //   headers: {
  //     ...headers,
  //   },
  // }

  // if (body) {
  //   config.body = JSON.stringify(body)
  // }

  // return fetch(`${apiUrl}/${endpoint}`, config)
  //   .then((response) => {
  //     if (!response.ok) {
  //       console.log(`not ok`)
  //       console.log(response.json())

  //       throw new Error(`fffuucckk`)
  //     } else {
  //       return response.json()
  //     }
  //   })
  //   .catch((err) => console.log(`fetch in err: ${err}`))
}

export default client
