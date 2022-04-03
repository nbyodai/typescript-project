export function formattedDate(date: Date): string {
  // returns date as 11/11/2021
  // other times it returns 11/11/2021 12:00:00 AM
  // which is why we call the .splt at the end
  return date.toLocaleDateString('en-US')
}

export function shouldIncrementOrResetStreakCounter(
  currentDate: Date,
  lastLoginDate: string,
): 'increment' | undefined {

  const difference = currentDate.getDate() - parseInt(lastLoginDate.split('/')[1])
  if(difference === 1) {
    return 'increment'
  }
  // otherwise they logged in after a day, which would break the streak
  return undefined
}
