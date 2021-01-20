let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
let color = "skyblue"

export function createEventId() {
  return String(eventGuid++)
}