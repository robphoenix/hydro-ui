import client from './api-client'

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

function getDecodedToken() {
  const token = getToken()
  return token ? decodeJwt(token) : ''
}

function isTokenValid(token) {
  const { exp } = decodeJwt(token)
  const now = Date.now() / 1000
  return now < exp
}

function login({ username, password }) {
  client('login', { username, password }).then(({ token }) => {
    setToken(token)
    // the token is only valid for 5 minutes
    // so we need to continually refresh it
    initTokenRefreshInterval()
  })
}

function initTokenRefreshInterval() {
  // TODO: we need to make sure this is also started off when the app is
  // refreshed in the browser, not just on login
  const oneMinute = 60000
  setInterval(() => {
    console.log(Date.now().toString())
    console.log('refresh')

    client('p/refresh').then(({ token }) => setToken(token))
  }, oneMinute)
}

function isLoggedIn() {
  const token = getToken()
  if (!token) {
    return false
  }
  return isTokenValid(token)
}

export {
  login,
  isLoggedIn,
  getToken,
  getDecodedToken,
  initTokenRefreshInterval,
}
