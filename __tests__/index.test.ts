import { JSDOM } from "jsdom";
import { streakCounter } from "../src/index";
import { formattedDate } from "../src/utils";

describe("streakCounter", () => {
  let mockLocalStorage: Storage

  beforeEach(() => {
    const mockJSDom = new JSDOM("", { url: "https://locahlhost" })

    mockLocalStorage = mockJSDom.window.localStorage

  })

  afterEach(() => {
    mockLocalStorage.clear()
  })

  it("should return a streak object with currentCount, startDate and lastLoginDate", () => {
    const date = new Date()
    const streak = streakCounter(mockLocalStorage, date)

    expect(streak.hasOwnProperty('currentCount')).toBe(true)
    expect(streak.hasOwnProperty('startDate')).toBe(true)
    expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
  });

  it("should return a streak counting at 1 and keep track of lastLoginDate", () => {
    const date = new Date()
    const streak = streakCounter(mockLocalStorage, date)
    const dateFormated = formattedDate(date)

    expect(streak.currentCount).toBe(1)
    expect(streak.lastLoginDate).toBe(dateFormated)
  })

  it("should store the streak in localStorage", () => {
    const date = new Date()
    const key = 'streak'
    streakCounter(mockLocalStorage, date)

    const streakAsString = mockLocalStorage.getItem(key)
    expect(streakAsString).not.toBeNull()
  })

  describe("with a pre-populated streak", () => {
    let mockLocalStorage: Storage

    beforeEach(() => {
      const mockJSDom = new JSDOM("", { url: "https://locahlhost" })

      mockLocalStorage = mockJSDom.window.localStorage

      // use date in past so it's always the same

      const date = new Date('12/12/2021')

      const streak = {
        currentCount: 1,
        startDate: formattedDate(date),
        lastLoginDate: formattedDate(date),
      }

      mockLocalStorage.setItem('streak', JSON.stringify(streak))
    })

    afterEach(() => {
      mockLocalStorage.clear()
    })

    it("should return the streak from localStorage", () => {
      const date = new Date()
      const streak = streakCounter(mockLocalStorage, date)

      // should match the dates used to set up the tests
      expect(streak.startDate).toBe('12/12/2021')
    })

    it("should increment the streak", () => {
      const date = new Date('12/13/2021')
      const streak = streakCounter(mockLocalStorage, date)

      expect(streak.currentCount).toBe(2)
    })

    it("should not increment the streak when login days not consecutive", () => {
      // it should not increment because this is two days after
      // the streak started and days are not consecutive
      const date = new Date('12/14/2021')
      const streak = streakCounter(mockLocalStorage, date)

      expect(streak.currentCount).toBe(1)
    })

    it("should save the incremented streak to localStorage", () => {
      const key = 'streak'
      const date = new Date("12/13/2021")

      // call it once so it updates the streak
      streakCounter(mockLocalStorage, date)

      const streakAsString = mockLocalStorage.getItem(key)
      // normally you should wrap in try/catch in case the JSON is bad
      // but since i authored it, we can skip here
      const streak = JSON.parse(streakAsString || '')

      expect(streak.currentCount).toBe(2)
    })

  })
})
