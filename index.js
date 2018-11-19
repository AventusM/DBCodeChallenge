const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/analyze', (request, response) => {
  const body = request.body
  const text = body.text

  // Error handling here ...
  const missingText = text === undefined
  if (missingText) {
    return response.status(400).json({ error: 'Missing text' })
  }

  const tooShortText = text.trim().length === 0 // Must reside here to avoid errors in undefined version
  if (tooShortText) {
    return response.status(400).json({ error: 'Your text seems to consist of whitespace only' })
  }
  // End error handling

  // NOTICE -- CHANGE TEXT TO LOWER CASE
  lowCaseText = text.toLowerCase()
  // END NOTICE
  const analysis = {
    textLength: getTextLengthProps(lowCaseText),
    wordCount: getTextWordCount(lowCaseText),
    characterCount: getCharacterCountFrom(lowCaseText)
  }

  // Return parsed data
  response.json(analysis)
})

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#Sort_an_array
const sortTextArray = (arr) => {
  return arr.sort((a, b) => a.localeCompare(b))
}

const getCharacterCountFrom = (param) => {
  // Removed numbers from text through replace, my regex skills were insufficient so this SO answer
  // was good source https://stackoverflow.com/questions/4993764/removing-numbers-from-string?answertab=votes#tab-top
  // Apply filter function 1 to remove numbers
  const outTrimNoNumText = param.replace(/[0-9]/g, '').trim() // Remove outer spaces
  // Apply filter function 2 to remove non A-Z text (upper/lower case)
  // Source (https://stackoverflow.com/a/32192557)
  const outTrimNoNumEngText = outTrimNoNumText.replace(/[^A-Za-z]/g, '')

  const inTrimNoNumEngText = outTrimNoNumEngText.split(' ').join('') // Remove inner spaces
  const sortedText = sortTextArray(inTrimNoNumEngText.split('')) // Could join this and use .charAt in the loop

  let occurences = [];
  for (let i = 0; i < sortedText.length; i++) {
    const char = sortedText[i]

    // First occurence will show an error (initial object is empty) --> need to initiate it
    if (!occurences[char]) {
      occurences[char] = 1
    } else {
      // Increasing the occurence amount of current array item
      // Note to self, no need to make unnecessary if-statements, this is counter-intuitive in this task
      occurences[char]++
    }
  }

  // Unable to traverse via indexes, need to use Object.keys() to traverse
  // Dan Cron's answer to put these '[]' around the key solves my problem,
  // where the key of the object is actually named correctly instead of 'element' in this case
  // accessing value of key happens by using occurences[element]
  const reformatArr = Object.keys(occurences).map(element => ({ [element]: occurences[element] }))
  return reformatArr
}

const getTextLengthProps = (param) => {
  // https://stackoverflow.com/a/25248404
  // Instead of regex
  const withoutSpaceTextLength = param.split(' ').join('').length
  const withSpaceTextLength = param.length

  return {
    withSpaces: withSpaceTextLength,
    withoutSpaces: withoutSpaceTextLength
  }
}

const getTextWordCount = (param) => {
  const trimmedTextArray = param.trim().split(' ')
  return trimmedTextArray.length
}

// Heroku support along with local testing pusposes
const PORT = process.env.PORT || 3001
const listener = app.listen(PORT)

// For testing with supertest
// https://stackoverflow.com/questions/14515954/how-to-properly-close-node-express-server
module.exports = {
  listener
}