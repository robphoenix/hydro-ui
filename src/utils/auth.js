import { get, post } from '../utils/api-client'
import { navigate } from '@reach/router'

const tokenKey = '__hydro_token__'

function getToken() {
  return localStorage.getItem(tokenKey)
}

function setToken(token) {
  localStorage.setItem(tokenKey, token)
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
  return post(`login`, { username, password }).then(({ token }) => {
    if (token) {
      setToken(token)
      initTokenRefreshInterval()
    }
  })
}

function logout() {
  localStorage.removeItem(tokenKey)
  navigate(`/`)
  return Promise.resolve()
}

// the token is only valid for 5 minutes
// so we need to continually refresh it
function initTokenRefreshInterval() {
  const refreshInterval = setInterval(() => {
    const validUser = isLoggedIn()
    if (validUser) {
      get(`p/refresh`).then(({ token }) => setToken(token))
    } else {
      clearInterval(refreshInterval)
      logout().then(() => window.location.reload())
    }
  }, 5000)
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
  logout,
}
