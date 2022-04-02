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
})
