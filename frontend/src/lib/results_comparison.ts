import type { BracketScore, Data, Match } from './data/types'

function evaluateUserPicks(
  userBracket: Data,
  actualResults: Match[],
): Data | null {
  const mergedMatches = (userBracket.matches || []).map((prediction: Match) => {
    const resultMatch = actualResults.find(m => m.id === prediction.id)
    if (!resultMatch)
      return null

    if (!resultMatch.result) {
      const status = resultMatch.matchStatus
      const isScheduled = typeof status === 'string'
        && (
          status.toLowerCase() === 'scheduled'
          || /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/.test(status)
        )
      if (isScheduled) {
        return {
          ...prediction,
          matchStatus: status,
          sides: resultMatch.sides || prediction.sides,
          result: null,
        }
      }
      return null
    }
    return {
      ...prediction,
      result: resultMatch.result,
      sides: resultMatch.sides || prediction.sides,
      matchStatus: resultMatch.matchStatus || prediction.matchStatus,
    }
  }).filter(Boolean) as Match[]

  return { ...userBracket, matches: mergedMatches }
}

function scoreUserPics(matchArray: Match[]) {
  const scoreObject: BracketScore = {
    correctPicks: 0,
  }
  const evaluation = matchArray.reduce((count, currentValue) => {
    if (currentValue.prediction === currentValue.result) {
      return count + 1
    }
    else {
      return count
    }
  }, 0)
  scoreObject.correctPicks = evaluation
  return scoreObject
}

export { evaluateUserPicks, scoreUserPics }
