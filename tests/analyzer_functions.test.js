const analyzerFunctions = require('../functions/analyze.js')

it('removes numbers from a string', () => {
  const result = analyzerFunctions.removeNumbersFromAndTrim('123TestString123   ')
  expect(result).toBe('TestString')
})

it('removes non-english characters from a string', () => {
  const result = analyzerFunctions.removeNonEngChars('We are the tsääääääämpiööööns')
  expect(result).toBe('Wearethetsmpins')
})