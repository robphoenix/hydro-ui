// @ts-nocheck
import EventBus from 'vertx3-eventbus-client'
import { EVENTBUS_ROOT } from './environments'

const eventBusUrl = `${EVENTBUS_ROOT}/eventbus`
const outputAddress = 'result.pub.output.'
const cachedAddress = 'result.pub.cached'
// const statusAddress = 'monitor.status'

const eventBusLiveData = (name, cb) => {
  const eb = new EventBus(eventBusUrl, {})
  const address = `${outputAddress}${name}`

  eb.enableReconnect(true)
  eb.onerror = () => console.error(`[connection error]: LIVE ${name}`)
  eb.onclose = () => console.log(`[connection closed]: LIVE ${name}`)

  eb.onopen = () => {
    console.log(`[connection open]: LIVE ${name}`)
    eb.registerHandler(address, {}, cb)
  }
  return eb
}

const eventBusCachedData = (name, cb) => {
  const eb = new EventBus(eventBusUrl, {})

  eb.enableReconnect(true)
  eb.onerror = () => console.error(`[connection error]: CACHED ${name}`)
  eb.onclose = () => console.log(`[connection closed]: CACHED ${name}`)

  eb.onopen = () => {
    console.log(`[connection open]: CACHED ${name}`)
    eb.send(cachedAddress, name, {}, cb)
  }
  return eb
}

export { eventBusLiveData, eventBusCachedData }
