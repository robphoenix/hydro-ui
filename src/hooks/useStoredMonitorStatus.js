import React from 'react'

const useStoredMonitorStatus = () => {
  const key = `monitorStatus`
  const defaultValue = `online`

  const [status, setStatus] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return defaultValue
      return item || defaultValue
    } catch (error) {
      // If error also return defaultValue
      console.log(error)
      return defaultValue
    }
  })

  const getStoredMonitorStatus = () => status

  const setStoredMonitorStatus = (item) => {
    setStatus(item)
    window.localStorage.setItem(key, item)
  }

  return { getStoredMonitorStatus, setStoredMonitorStatus }
}

export default useStoredMonitorStatus
