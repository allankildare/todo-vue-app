import { capitalizeFirstLetter } from './capitalizeFirstLetter'

describe('capitalizeFirstLetter function', () => {
    it('should return sentences with only first letter capitalized', () => {
        expect(capitalizeFirstLetter('vue is awesome')).toStrictEqual('Vue is awesome')
        expect(capitalizeFirstLetter('vue is more reactive the React')).toStrictEqual('Vue is more reactive the React')
        expect(capitalizeFirstLetter('test web apps IS necessary')).toStrictEqual('Test web apps IS necessary')
        expect(capitalizeFirstLetter('Last test, I promise')).toStrictEqual('Last test, I promise')
    })
})
