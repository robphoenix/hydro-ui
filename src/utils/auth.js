const apiUrl = 'http://mn2formlt0001d0:6080'
const tokenKey = '__hydro_token__'

const decodeJwt = (token) => {
  var base64Url = token.split('.')[1]
  var base64 = decodeURIComponent(
    atob(base64Url)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(base64)
}

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

const isLoggedIn = () => {
  const token = window.localStorage.getItem(tokenKey)
  console.log({ token })
  const parsed = decodeJwt(token)
  console.log({ parsed })

  return true
}

export { login, isLoggedIn }
