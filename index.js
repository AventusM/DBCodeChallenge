const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const analyzerFunctions = require('./functions/analyze.js')
app.use(bodyParser.json())

app.post('/analyze', (request, response) => {
  const body = request.body
  const text = body.text

  // Error handling here ...
  const missingText = text === undefined
  if (missingText) {
    return response.status(400).json({ error: 'Missing text' })
  }

  // const tooShortText = text.trim().length === 0 // Must reside here to avoid errors in undefined version
  // if (tooShortText) {
  //   return response.status(400).json({ error: 'Your text seems to consist of whitespace only' })
  // }
  // End error handling

  // NOTICE -- CHANGE TEXT TO LOWER CASE
  lowCaseText = text.toLowerCase()
  // END NOTICE
  const analysis = {
    textLength: analyzerFunctions.getTextLengthProps(lowCaseText),
    wordCount: analyzerFunctions.getTextWordCount(lowCaseText),
    characterCount: analyzerFunctions.getCharacterCountFrom(lowCaseText)
  }

  // Return parsed data
  response.json(analysis)
})

// Heroku support along with local testing pusposes
const PORT = process.env.PORT || 3001
const listener = app.listen(PORT)

// For testing with supertest
// https://stackoverflow.com/questions/14515954/how-to-properly-close-node-express-server
module.exports = {
  listener
}