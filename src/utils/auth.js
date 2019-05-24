const apiUrl = 'http://mn2formlt0001d0:6080'
const tokenKey = '__hydro_token__'

function getToken() {
  return window.localStorage.getItem(tokenKey)
}

function setToken(token) {
  window.localStorage.setItem(tokenKey, token)
}

// https://stackoverflow.com/a/38552302
function decodeJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = decodeURIComponent(
    atob(base64Url)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  )
  return JSON.parse(base64)
}

function isTokenValid(token) {
  const { exp } = decodeJwt(token)
  const now = Date.now() / 1000
  return now < exp
}

function login({ username, password }) {
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
    .then(({ token }) => setToken(token))
}

function isLoggedIn() {
  const token = getToken()

  if (!token) {
    return false
  }

  return isTokenValid(token)
}

export { login, isLoggedIn }
