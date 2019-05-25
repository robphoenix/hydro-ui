// should probs change this to user,
// returning a user object
// and put it in a user.js file
function getDisplayName() {
  const token = getToken()
  if (!token) {
    return ''
  }
  const { displayName } = decodeJwt(token)
  return displayName
}
