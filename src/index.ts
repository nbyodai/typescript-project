import { formattedDate } from "./utils"

interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

const KEY = 'streak'

export function streakCounter(storage: Storage, date: Date): Streak {
  const streakInLocalStorage = storage.getItem(KEY)
  if (streakInLocalStorage){
    const streak = JSON.parse(streakInLocalStorage)
    return streak
  }
  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  }

  // store in localStorage
  storage.setItem(KEY, JSON.stringify(streak))

  return streak
}
