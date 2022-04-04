import { buildStreak, formattedDate, shouldIncrementOrResetStreakCounter, Streak } from './utils'

const KEY = 'streak'

export function streakCounter (storage: Storage, date: Date): Streak {
  const streakInLocalStorage = storage.getItem(KEY)
  if (streakInLocalStorage) {
    try {
      const streak: Streak = JSON.parse(streakInLocalStorage)
      const state = shouldIncrementOrResetStreakCounter(date, streak.lastLoginDate)
      const SHOULD_INCREMENT = state === 'increment'
      const SHOULD_RESET = state === 'reset'

      if (SHOULD_INCREMENT) {
        const updatedStreak: Streak = buildStreak(date, {
          ...streak,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date)
        })
        // store in localStorage
        storage.setItem(KEY, JSON.stringify(updatedStreak))

        return updatedStreak
      }
      if (SHOULD_RESET) {
        const updatedStreak: Streak = buildStreak(date)
        // store in localStorage
        storage.setItem(KEY, JSON.stringify(updatedStreak))

        return updatedStreak
      }

      return streak
    } catch (error) {
      console.error('Failed to parse streak from localStorage')
    }
  }
  const streak = buildStreak(date)

  // store in localStorage
  storage.setItem(KEY, JSON.stringify(streak))

  return streak
}
