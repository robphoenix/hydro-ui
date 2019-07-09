const environments = {
  localhost: `local`,
  mn2formlt0001d0: `dev`,
  ir3hydpoc0010p0: `poc`,
}

const apiPort = 6080
const eventBusPort = 6081

const apiRoots = {
  local: `mn2formlt0001d0`,
  dev: `mn2formlt0001d0`,
  poc: `ir3hydpoc0009p0`,
}

const eventBusRoots = {
  local: `mn2formlt0002d0`,
  dev: `mn2formlt0002d0`,
  poc: `ir3hydpoc0007p0`,
}

const hostname = window && window.location && window.location.hostname
const env = environments[hostname]
const isDev = env === `local` || `dev`

const API_ROOT = `http://${apiRoots[env]}:${apiPort}`
const EVENTBUS_ROOT = `http://${eventBusRoots[env]}:${eventBusPort}`

export { API_ROOT, EVENTBUS_ROOT, isDev }
