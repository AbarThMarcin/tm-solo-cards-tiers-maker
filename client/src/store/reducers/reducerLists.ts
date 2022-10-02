import { ListActionInt, ListInterface } from '../../interfaces/listInterface'
import { ACTIONS_LISTS } from '../actions/actionsLists'

export const reducerLists = (state: ListInterface[], action: ListActionInt): ListInterface[] => {
   switch (action.type) {
      case ACTIONS_LISTS.SET_LISTS: // handles DELETE LIST as well
         return action.payload
      case ACTIONS_LISTS.CREATE_LIST:
         return [...state, action.payload]
      case ACTIONS_LISTS.EDIT_LIST:
         return state.map((l) => (l._id === action.payload._id ? action.payload : l))
      // case ACTIONS_LISTS.CREATE_PLAYER:
      //    return state
      // case ACTIONS_LISTS.DELETE_PLAYER:
      //    return state
      // case ACTIONS_LISTS.EDIT_PLAYER:
      //    return state
      // case ACTIONS_LISTS.ADD_RATE:
      //    return state
      // case ACTIONS_LISTS.EDIT_RATE:
      //    return state
      default:
         return state
   }
}
