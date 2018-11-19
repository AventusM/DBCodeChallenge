//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#Sort_an_array
const sortTextArray = (arr) => {
  return arr.sort((a, b) => a.localeCompare(b))
}

// Sources from previous commit!
const removeNumbersFromAndTrim = (param) => {
  return param.replace(/[0-9]/g, '').trim() // Remove outer spaces
}

const removeNonEngChars = (param) => {
  return param.replace(/[^A-Za-z]/g, '')
}

const getCharacterCountFrom = (param) => {
  const outTrimNoNumText = removeNumbersFromAndTrim(param)
  const outTrimNoNumEngText = removeNonEngChars(outTrimNoNumText)

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

module.exports = {
  sortTextArray,
  removeNumbersFromAndTrim,
  removeNonEngChars,
  getCharacterCountFrom,
  getTextLengthProps,
  getTextWordCount
}