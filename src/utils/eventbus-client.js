import EventBus from 'vertx3-eventbus-client'

const eventBusUrl = `http://mn2formlt0002d0:6081/eventbus`
const outputAddress = 'result.pub.output.'
// const cachedAddress = 'result.pub.cached'
// const statusAddress = 'monitor.status'

const newEventBus = (name, cb) => {
  const eb = new EventBus(eventBusUrl, {})
  const address = `${outputAddress}${name}`

  eb.enableReconnect(true)
  eb.onerror = () => console.error(`${name} connection error`)
  eb.onclose = () => console.log(`connection closed`)

  eb.onopen = () => {
    console.log(`connection open`)
    eb.registerHandler(address, {}, cb)
  }
  return eb
}

export { newEventBus }
