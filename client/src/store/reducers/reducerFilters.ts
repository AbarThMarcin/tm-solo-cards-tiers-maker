import { FiltersActionInt, FiltersStateInt } from "../../interfaces/filtersInterface"
import { initFilters } from "../../pages/CardsList"
import { ACTIONS_FILTERS } from '../actions/actionsFilters'

export const reducerFilters = (state: FiltersStateInt, action: FiltersActionInt): FiltersStateInt => {
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
         return { ...state, tags: [] }
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
      // Cost
      case ACTIONS_FILTERS.SET_COST:
         return { ...state, cost: action.payload }
      case ACTIONS_FILTERS.SET_COST_MINMAXEQUAL:
         return { ...state, costMinMaxEqual: action.payload }
      // Search
      case ACTIONS_FILTERS.SET_SEARCHVALUE:
         return { ...state, searchValue: action.payload }
      // Production
      case ACTIONS_FILTERS.TOGGLE_PRODUCTION:
         return {
            ...state,
            production: state.production.includes(action.payload)
               ? state.production.filter((prod) => prod !== action.payload)
               : [...state.production, action.payload],
         }
      case ACTIONS_FILTERS.RESET_PRODUCTION:
         return { ...state, production: [] }
      case ACTIONS_FILTERS.SET_PRODUCTION_ANDOR:
         return { ...state, productionAndOr: action.payload }
      // VP
      case ACTIONS_FILTERS.TOGGLE_VP:
         const payloadBoolean = action.payload === 'true' ? true : false
         return {
            ...state,
            vp: state.vp !== payloadBoolean ? payloadBoolean : null,
         }
      case ACTIONS_FILTERS.SET_VP_NEGALLPOS:
         return { ...state, vpNegPosAll: action.payload }
      // Requirements
      case ACTIONS_FILTERS.TOGGLE_REQ:
         return {
            ...state,
            requirements: state.requirements.includes(action.payload)
               ? state.requirements.filter((req) => req !== action.payload)
               : [...state.requirements, action.payload],
         }
      case ACTIONS_FILTERS.RESET_REQS:
         return { ...state, requirements: [] }
      case ACTIONS_FILTERS.SET_REQ_ANDOR:
         return { ...state, requirementsAndOr: action.payload }
      // Parameters
      case ACTIONS_FILTERS.TOGGLE_PARAMETER:
         return {
            ...state,
            parameters: state.parameters.includes(action.payload)
               ? state.parameters.filter((param) => param !== action.payload)
               : [...state.parameters, action.payload],
         }
      case ACTIONS_FILTERS.RESET_PARAMETERS:
         return { ...state, parameters: [] }
      case ACTIONS_FILTERS.SET_PARAMETERS_ANDOR:
         return { ...state, parametersAndOr: action.payload }
      // Can Have Units
      case ACTIONS_FILTERS.TOGGLE_UNIT:
         return {
            ...state,
            canHaveUnits: state.canHaveUnits.includes(action.payload)
               ? state.canHaveUnits.filter((unit) => unit !== action.payload)
               : [...state.canHaveUnits, action.payload],
         }
      case ACTIONS_FILTERS.RESET_UNITS:
         return { ...state, canHaveUnits: [] }
      // Reset All
      case ACTIONS_FILTERS.RESET_ALL:
         return initFilters
      default:
         return state
   }
}