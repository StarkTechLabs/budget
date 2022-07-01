/* global describe, it, expect  */

import dayjs from 'dayjs'
import { findDateOpts, range, inRange } from './date'

describe('common.date', () => {
  describe('findDateOpts', () => {
    it('returns array', () => {
      const result = findDateOpts()
      expect(Array.isArray(result)).toBeTruthy()
    })
  })
  describe('range', () => {
    it('returns array', () => {
      const result = range()
      expect(Array.isArray(result)).toBeTruthy()
    })
    it('returns array of dates in order', () => {
      expect(JSON.stringify(range(dayjs('01/01/2022'), 1, 'month'))).toBe(JSON.stringify([dayjs('01/01/2022'), dayjs('12/01/2021')]))
      expect(range(dayjs('01/01/2022'), 1, 'month', true)[1].toString()).toBe(dayjs('02/01/2022').toString())
      expect(range(dayjs('01/01/2022'), 2, 'month').length).toBe(3)
      expect(range(dayjs('01/01/2022'), 2, 'month', true).length).toBe(3)
    })
  })
  describe('inRange', () => {
    it('should be inRange', () => {
      expect(inRange(dayjs('01/01/2022'), dayjs('01/02/2022'), dayjs('01/01/2022'))).toBeTruthy()
      expect(inRange(dayjs('01/01/2022'), dayjs('01/02/2022'), dayjs('01/02/2022'))).toBeTruthy()
      expect(inRange(dayjs('01/01/2022'), dayjs('01/02/2023'), dayjs('06/21/2022'))).toBeTruthy()
    })
    it('should be out of Range', () => {
      expect(inRange(dayjs('01/01/2022'), dayjs('01/02/2022'), dayjs('01/01/1997'))).toBeFalsy()
      expect(inRange(dayjs('01/01/2022'), dayjs('01/02/2022'), dayjs('01/02/1000'))).toBeFalsy()
      expect(inRange(dayjs('01/01/2022'), dayjs('01/02/2022'), dayjs('01/03/2022'))).toBeFalsy()
    })
  })
})
