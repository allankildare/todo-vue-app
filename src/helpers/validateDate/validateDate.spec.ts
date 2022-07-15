import { formatDate, isTaskLate } from './validateDate'

describe('validateDate function', () => {
    it('should return formatted dates', () => {
        expect(formatDate('2022-07-15T10:22:31.434Z')).toStrictEqual('15/07/2022 at 7:22 AM')
        expect(formatDate('2022-09-23T10:22:31.434Z')).toStrictEqual('23/09/2022 at 7:22 AM')
        expect(formatDate('2022-07-15T10:14:59.434Z')).toStrictEqual('15/07/2022 at 7:14 AM')
        expect(formatDate('2050-12-15T10:22:31.434Z')).toStrictEqual('15/12/2050 at 7:22 AM')
    })
    it('should return if task is late', () => {
        expect(isTaskLate('2022-01-15T10:22:31.434Z')).toBeTruthy()
        expect(isTaskLate('2022-01-14T10:22:31.434Z')).toBeTruthy()
        expect(isTaskLate('2022-01-15T10:22:31.434Z')).toBeTruthy()
        expect(isTaskLate('2022-01-18T10:22:31.434Z')).toBeTruthy()
        expect(isTaskLate('2050-08-15T10:22:31.434Z')).not.toBeTruthy()
        expect(isTaskLate('2050-12-15T10:22:31.434Z')).not.toBeTruthy()
    })
})
