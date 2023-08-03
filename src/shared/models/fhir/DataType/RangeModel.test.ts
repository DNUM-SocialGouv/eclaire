import { RangeModel } from './RangeModel'

describe('rangeModel', () => {
  describe('#createAgeRange', () => {
    it('should create a properly formatted model when "0-17 years" is given', () => {
      expect(RangeModel.createAgeRange('0-17 years')).toMatchInlineSnapshot(`
        RangeModel {
          "high": QuantityModel {
            "code": undefined,
            "comparator": "<=",
            "id": undefined,
            "system": undefined,
            "unit": "years",
            "value": 17,
          },
          "id": undefined,
          "low": QuantityModel {
            "code": undefined,
            "comparator": ">=",
            "id": undefined,
            "system": undefined,
            "unit": "years",
            "value": 0,
          },
        }
      `)
    })

    it('should create a properly formatted model when "18-64 years" is given', () => {
      expect(RangeModel.createAgeRange('18-64 years')).toMatchInlineSnapshot(`
        RangeModel {
          "high": QuantityModel {
            "code": undefined,
            "comparator": "<=",
            "id": undefined,
            "system": undefined,
            "unit": "years",
            "value": 64,
          },
          "id": undefined,
          "low": QuantityModel {
            "code": undefined,
            "comparator": ">=",
            "id": undefined,
            "system": undefined,
            "unit": "years",
            "value": 18,
          },
        }
      `)
    })

    it('should create a properly formatted model when "65+ years" is given', () => {
      expect(RangeModel.createAgeRange('65+ years')).toMatchInlineSnapshot(`
        RangeModel {
          "high": undefined,
          "id": undefined,
          "low": QuantityModel {
            "code": undefined,
            "comparator": ">=",
            "id": undefined,
            "system": undefined,
            "unit": "years",
            "value": 65,
          },
        }
      `)
    })

    it('should create a properly formatted model when no age range is given', () => {
      expect(RangeModel.createAgeRange('')).toMatchInlineSnapshot(`
        RangeModel {
          "high": undefined,
          "id": undefined,
          "low": undefined,
        }
      `)
    })
  })
})
