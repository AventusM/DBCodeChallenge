const supertest = require('supertest')
const { listener } = require('../index')
const api = supertest(listener)

const testText = [
  { text: "  Jäätelötie 1  " },
  { text: "             " },
  { text: "elefantti" }
]

it('returns error message on empty request', async () => {
  const response =
    await api
      .post('/analyze')
      .expect(400)
  expect(response.body.error).toContain('Missing text')
})

it('returns error message on actually empty string', async () => {
  const response =
    await api
      .post('/analyze')
      .send(testText[1]) // "             "
      .expect(400)
  expect(response.body.error).toContain('Your text seems to consist of whitespace only')
})

it('returns valid information on stripped text', async () => {
  const response =
    await api
      .post('/analyze')
      .send(testText[0])
      .expect(200)

  // Destructuring
  const { textLength, wordCount, characterCount } = response.body

  expect(textLength.withSpaces).toBe(16)
  expect(textLength.withoutSpaces).toBe(11)
  expect(wordCount).toBe(2)

  // Millaisia testitapauksia tämmöiselle pitäisi mielestänne laittaa..?
  // Laitan pari erillistä testiä tekstinkäsittelymetodeista
  expect(characterCount[0]['e']).toBe(2) // käsitelty merkkijono 'jteltie'
})

it('returns valid information on valid and trimmed text', async () => {
  const response =
    await api
      .post('/analyze')
      .send(testText[2])
      .expect(200)

  const { textLength, wordCount, characterCount } = response.body
  expect(textLength.withSpaces).toBe(textLength.withoutSpaces)
  expect(textLength.withSpaces).toBe(9)
  expect(wordCount).toBe(1)
})

afterAll(() => {
  listener.close()
})