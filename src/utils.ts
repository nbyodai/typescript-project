export interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

export function formattedDate (date: Date): string {
  // returns date as 11/11/2021
  // other times it returns 11/11/2021 12:00:00 AM
  // which is why we call the .splt at the end
  return date.toLocaleDateString('en-US')
}

export function shouldIncrementOrResetStreakCounter (
  currentDate: Date,
  lastLoginDate: string
): 'increment' | 'reset'| 'none' {
  const difference = currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])
  if (difference === 1) {
    return 'increment'
  }
  // same-day login, do nothing
  if (difference === 0) {
    return 'none'
  }

  // otherwise they logged in after a day, which would break the streak
  return 'reset'
}

export function buildStreak (
  date: Date,
  overrideDefaults?: Partial<Streak>
): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date)
  }

  return {
    ...defaultStreak,
    ...overrideDefaults
  }
}
