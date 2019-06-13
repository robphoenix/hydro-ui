const thirtySeconds = 30
const oneMinute = 60
const twoMinutes = 2 * oneMinute
const fiveMinutes = 5 * oneMinute
const tenMinutes = 10 * oneMinute
const fifteenMinutes = 15 * oneMinute
const thirtyMinutes = 30 * oneMinute
const oneHour = 60 * oneMinute
const twoHours = 2 * oneHour
const fourHours = 4 * oneHour
const sixHours = 6 * oneHour
const twelveHours = 12 * oneHour
const eighteenHours = 18 * oneHour
const oneDay = 24 * oneHour
const twoDays = 2 * oneDay
const fourDays = 4 * oneDay
const oneWeek = 7 * oneDay

const durations = [
  { value: 0, name: 'off' },
  { value: thirtySeconds, name: '30 Seconds' },
  { value: oneMinute, name: '1 Minute' },
  { value: twoMinutes, name: '2 Minutes' },
  { value: fiveMinutes, name: '5 Minutes' },
  { value: tenMinutes, name: '10 Minutes' },
  { value: fifteenMinutes, name: '15 Minutes' },
  { value: thirtyMinutes, name: '30 Minutes' },
  { value: oneHour, name: '1 Hour' },
  { value: twoHours, name: '2 Hours' },
  { value: fourHours, name: '4 Hours' },
  { value: sixHours, name: '6 Hours' },
  { value: twelveHours, name: '12 Hours' },
  { value: eighteenHours, name: '18 Hours' },
  { value: oneDay, name: '1 Day' },
  { value: twoDays, name: '2 Days' },
  { value: fourDays, name: '4 Days' },
  { value: oneWeek, name: '1 Week' },
]

const useCacheWindowDurations = () => {
  const cacheWindowMin = 0
  const cacheWindowMax = durations.length - 1
  const cacheWindowDurationValues = durations.map((d) => d.value)
  const cacheWindowDurationNames = durations.map((d) => d.name)

  return {
    cacheWindowMin,
    cacheWindowMax,
    cacheWindowDurationValues,
    cacheWindowDurationNames,
  }
}

export default useCacheWindowDurations
