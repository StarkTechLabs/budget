/* global describe, it, expect, beforeEach  */

import { processForDate, processFilters, processTransforms } from './match'

describe('common.match', () => {
  describe('processForDate', () => {
    let data
    beforeEach(() => {
      data = [
        { transactionDate: '01/01/2022' },
        { transactionDate: '01/01/2022' },
        { transactionDate: '02/01/2022' }
      ]
    })
    it('returns function', () => {
      const result = processForDate()
      expect(typeof result).toBe('function')
    })
    it('filters for date', () => {
      expect(data.length).toBe(3)
      expect(data.filter(processForDate('01/01/2022')).length).toBe(2)
      expect(data.filter(processForDate('02/01/2022')).length).toBe(1)
    })
  })
  describe('processFilters', () => {
    let data, filters
    beforeEach(() => {
      data = [
        { key: '1' },
        { key: '2' },
        { key: '3' }
      ]
      filters = [
        {
          operation: 'equals',
          term: '1',
          field: 'key'
        }
      ]
    })
    it('returns function', () => {
      const result = processFilters()
      expect(typeof result).toBe('function')
    })
    it('filters data', () => {
      const results = data.filter(processFilters(filters))
      expect(data.length).toBe(3)
      expect(results.length).toBe(1)
      expect(results[0].key).toBe('1')
    })
    it('filters on not equal', () => {
      filters[0].operation = 'does not equal'
      const results = data.filter(processFilters(filters))
      expect(data.length).toBe(3)
      expect(results.length).toBe(2)
      expect(results[0].key).toBe('2')
      expect(results[1].key).toBe('3')
    })
  })
  describe('processTransforms', () => {
    let data, transforms
    beforeEach(() => {
      data = [
        { key: '1' },
        { key: '2' },
        { key: '3' }
      ]
      transforms = [
        {
          operation: 'equals',
          term: '1',
          field: 'key',
          replaceField: 'key',
          replaceTerm: '4'
        }
      ]
    })
    it('returns function', () => {
      const result = processTransforms()
      expect(typeof result).toBe('function')
    })
    it('transforms data', () => {
      const results = data.map(processTransforms(transforms))
      expect(results.length).toBe(3)
      expect(results[0].key).toBe('4')
      expect(results[1].key).toBe('2')
      expect(results[2].key).toBe('3')
    })
  })
})
