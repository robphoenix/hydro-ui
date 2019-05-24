const apiUrl = 'http://mn2formlt0001d0:6080'
const tokenKey = '__hydro_token__'

const login = ({ username, password }) => {
  const url = `${apiUrl}/login`
  const headers = { 'Content-Type': 'application/json' }
  const method = 'POST'
  const body = JSON.stringify({ username, password })
  const config = {
    method,
    headers,
    body,
  }

  window
    .fetch(url, config)
    .then((res) => res.json())
    .then(({ token }) => {
      window.localStorage.setItem(tokenKey, token)
    })
}

export { login }
