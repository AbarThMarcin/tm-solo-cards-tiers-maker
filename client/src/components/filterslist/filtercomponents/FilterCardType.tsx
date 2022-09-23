import React from 'react'
import { CARD_TYPES } from '../../../data/cards'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { ACTIONS_FILTERS } from '../../../store/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterCardType: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   return (
      <div className="d-flex small w-100">
         <div
            className={`pointer ${
               stateFilters.cardTypes.includes(CARD_TYPES.GREEN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                  payload: CARD_TYPES.GREEN,
               })
            }
         >
            automated
         </div>
         <div
            className={`pointer ms-2 ${
               stateFilters.cardTypes.includes(CARD_TYPES.BLUE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                  payload: CARD_TYPES.BLUE,
               })
            }
         >
            active
         </div>
         <div
            className={`pointer ms-2 ${
               stateFilters.cardTypes.includes(CARD_TYPES.RED) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                  payload: CARD_TYPES.RED,
               })
            }
         >
            events
         </div>
      </div>
   )
}
