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
      default:
         return state
   }
}
