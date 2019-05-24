import { getToken } from './auth'

const apiUrl = 'http://mn2formlt0001d0:6080'

function client(endpoint, body) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const config = {
    method: body ? 'POST' : 'GET',
    headers: {
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config).then((res) => {
    console.log({ res })

    return res.json()
  })
}

export default client
