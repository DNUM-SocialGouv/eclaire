import { RangeModel } from './RangeModel'

describe('shared | models | RangeModel', () => {
  describe('#createAgeRange', () => {
    it('should create a properly formatted model when "0-17 years" is given', () => {
      // WHEN
      const range = RangeModel.createAgeRange('0-17 years')

      // THEN
      expect(range.high.unit).toBe('years')
      expect(range.high.value).toBe(17)
      expect(range.low.unit).toBe('years')
      expect(range.low.value).toBe(0)
    })

    it('should create a properly formatted model when "18-64 years" is given', () => {
      // WHEN
      const range = RangeModel.createAgeRange('18-64 years')

      // THEN
      expect(range.high.unit).toBe('years')
      expect(range.high.value).toBe(64)
      expect(range.low.unit).toBe('years')
      expect(range.low.value).toBe(18)
    })

    it('should create a properly formatted model when "65+ years" is given', () => {
      // WHEN
      const range = RangeModel.createAgeRange('65+ years')

      // THEN
      expect(range.high).toBeUndefined()
      expect(range.low.unit).toBe('years')
      expect(range.low.value).toBe(65)
    })

    it('should create a properly formatted model when no age range is given', () => {
      // WHEN
      const range = RangeModel.createAgeRange('')

      // THEN
      expect(range.high).toBeUndefined()
      expect(range.low).toBeUndefined()
    })
  })
})
