import { PARAMETERS } from '../data/parameters'
import { REQUIREMENTS } from '../data/requirements'
import { RESOURCES } from '../data/resources'
import { TAGS } from '../data/tags'
import { CardInterface } from '../interfaces/cardInterface'

export function matchesAnd(arr: string[], filterArr: string[]): boolean {
   let match: boolean = true
   filterArr.forEach((filterEl) => {
      // Exception for NONE tag
      if (
         filterEl === TAGS.NONE || // Exception for NONE tag
         filterEl === RESOURCES.NONE || // Exception for NO production
         filterEl === REQUIREMENTS.NONE || // Exception for NO requirements
         filterEl === PARAMETERS.NONE // Exception for NO parameters
      ) {
         if (arr.length > 0) {
            match = false
            return
         }
         // Exception for Requirements OTHER
      } else if (filterEl === REQUIREMENTS.OTHER) {
         if (
            !arr.includes(REQUIREMENTS.ROBOTIC_WORKFORCE) &&
            !arr.includes(REQUIREMENTS.CEOS_FAVOURITE_PROJECT) &&
            !arr.includes(REQUIREMENTS.RAD_SUITS)
         ) {
            match = false
            return
         }
         // Everything else
      } else {
         if (!arr.includes(filterEl)) {
            match = false
            return
         }
      }
   })
   return match
}

export function matchesOr(arr: string[], filterArr: string[]): boolean {
   let match: boolean = false
   filterArr.forEach((filterEl) => {
      if (
         filterEl === TAGS.NONE || // Exception for NONE tag
         filterEl === RESOURCES.NONE || // Exception for NO production
         filterEl === REQUIREMENTS.NONE || // Exception for NO requirements
         filterEl === PARAMETERS.NONE // Exception for NO parameters
      ) {
         if (arr.length === 0) {
            match = true
            return
         }
         // Exception for Requirements OTHER
      } else if (filterEl === REQUIREMENTS.OTHER) {
         if (
            arr.includes(REQUIREMENTS.ROBOTIC_WORKFORCE) ||
            arr.includes(REQUIREMENTS.CEOS_FAVOURITE_PROJECT) ||
            arr.includes(REQUIREMENTS.RAD_SUITS) ||
            arr.includes(REQUIREMENTS.ECOLOGICAL_ZONE)
         ) {
            match = true
            return
         }
         // Everything else
      } else {
         if (arr.includes(filterEl)) {
            match = true
            return
         }
      }
   })
   return match
}

// Returns given cards filtered by ids with the ids' order
export const getCards = (initCards: CardInterface[], ids: number[]): CardInterface[] => {
   let cards: CardInterface[] = []
   ids.forEach((id) => cards.push(initCards[id - 1]))
   return cards
}

// Returns sequence of consecutive integers
export const sequence = (start: number, end: number): number[] => {
   return Array(end - start + 1)
      .fill(1)
      .map((_, idx) => start + idx)
}
