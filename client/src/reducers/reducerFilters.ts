import { FiltersActionInt, FiltersStateInt } from '../interfaces/filtersInterface'
import { AND_OR } from '../pages/CardsList'

export const ACTIONS_FILTERS = {
   // Tags
   TOGGLE_TAG: 'TOGGLE_TAG',
   RESET_TAGS: 'RESET_TAGS',
   SET_TAG_ANDOR: 'SET_TAG_ANDOR',
   // Card Types
   TOGGLE_CARD_TYPE: 'TOGGLE_CARD_TYPE',
}

export const reducerFilters = (state: FiltersStateInt, action: FiltersActionInt) => {
   switch (action.type) {
      // Tags
      case ACTIONS_FILTERS.TOGGLE_TAG:
         return {
            ...state,
            tags: state.tags.includes(action.payload)
               ? state.tags.filter((tag) => tag !== action.payload)
               : [...state.tags, action.payload],
         }
      case ACTIONS_FILTERS.RESET_TAGS:
         return { ...state, tags: [], tagsAndOr: AND_OR.AND }
      case ACTIONS_FILTERS.SET_TAG_ANDOR:
         return { ...state, tagsAndOr: action.payload }
      // Card Types
      case ACTIONS_FILTERS.TOGGLE_CARD_TYPE:
         return {
            ...state,
            cardTypes: state.cardTypes.includes(action.payload)
               ? state.cardTypes.filter((cardType) => cardType !== action.payload)
               : [...state.cardTypes, action.payload],
         }
      default:
         return state
   }
}
