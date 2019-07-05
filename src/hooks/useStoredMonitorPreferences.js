import React from 'react'

const useStoredMonitorPreferences = () => {
  const statusKey = `monitorStatus`
  const typeKey = `monitorType`
  const defaultStatusValue = `online`
  const defaultTypeValue = { value: `standard`, label: `Standard Monitors` }

  const [status, setStatus] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(statusKey)
      // Parse stored json or if none return defaultValue
      return item || defaultStatusValue
    } catch (error) {
      // If error also return defaultValue
      console.log(error)
      return defaultStatusValue
    }
  })

  const [type, setType] = React.useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(typeKey)
      // Parse stored json or if none return default value
      return item ? JSON.parse(item) : defaultTypeValue
    } catch (error) {
      // If error also return default value
      console.log(error)
      return defaultTypeValue
    }
  })

  const getStoredMonitorStatus = () => status
  const getStoredMonitorType = () => type
  const setStoredMonitorStatus = (item) => {
    setStatus(item)
    window.localStorage.setItem(statusKey, item)
  }
  const setStoredMonitorType = (item) => {
    setType(item)
    window.localStorage.setItem(typeKey, JSON.stringify(item))
  }

  return {
    getStoredMonitorStatus,
    setStoredMonitorStatus,
    getStoredMonitorType,
    setStoredMonitorType,
  }
}

export default useStoredMonitorPreferences
