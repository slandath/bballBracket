import type { Ref } from 'vue'
import type { BracketResponse, Data, Match } from '../lib/data/types'
import { computed, ref, watch } from 'vue'
import { getTemplateResults } from '../api'
import { evaluateUserPicks, scoreUserPics } from '../lib/results_comparison'
import { showToast } from './useToast'

export function useBracketScore(currentBracketData: Ref<BracketResponse | null | undefined>): { score: Ref<number | null> } {
  const score = ref<number | null>(null)
  const templateId = computed(() => currentBracketData.value?.bracket?.template_id)

  watch([currentBracketData], async ([bracketData]) => {
    if (!bracketData?.bracket) {
      score.value = null
      return
    }
    const id = templateId.value
    if (!id) {
      score.value = null
      return
    }
    try {
      const resultsResponse = await getTemplateResults(id)
      const actualResults = resultsResponse.results as Match[]
      const userBracket = bracketData.bracket.data as Data
      if (!userBracket?.matches) {
        score.value = null
        return
      }
      const mergedData = evaluateUserPicks(userBracket, actualResults)
      if (!mergedData?.matches || mergedData.matches.length === 0) {
        score.value = null
        return
      }
      score.value = scoreUserPics(mergedData.matches).correctPicks
    }
    catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to calculate bracket score', 'error')
      score.value = null
    }
  }, { immediate: true })
  return { score }
}
