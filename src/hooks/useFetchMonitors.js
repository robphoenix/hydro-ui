import { useState, useCallback } from 'react'

import { useMonitor } from '../context/monitor-context'

const useFetchMonitors = () => {
  const [monitors, setMonitors] = useState([])
  const { getMonitors } = useMonitor()
  const fetchMonitors = useCallback(async () => {
    try {
      const monitors = await getMonitors()
      setMonitors(monitors)
    } catch (error) {
      console.log({ error })
    }
  }, [getMonitors])

  return { monitors, fetchMonitors }
}

export default useFetchMonitors
