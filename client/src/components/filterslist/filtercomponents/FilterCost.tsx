import React from 'react'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { COST_TYPES } from '../../../pages/CardsList'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterCost: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   function handleChangeCost(e: React.ChangeEvent<HTMLInputElement>): void {
      dispatchFilters({ type: ACTIONS_FILTERS.SET_COST, payload: e.target.value })
   }

   return (
      <div className="d-flex small w-100">
         <input
            type="number"
            min={0}
            max={41}
            value={stateFilters.cost}
            onChange={handleChangeCost}
         />
         <input
            type="radio"
            id="costmin"
            name="costminmaxequal"
            checked={stateFilters.costMinMaxEqual === COST_TYPES.MIN}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_COST_MINMAXEQUAL,
                  payload: COST_TYPES.MIN,
               })
            }
         />
         <label htmlFor="costmin">Min</label>
         <input
            type="radio"
            id="costequal"
            name="costminmaxequal"
            checked={stateFilters.costMinMaxEqual === COST_TYPES.EQUAL}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_COST_MINMAXEQUAL,
                  payload: COST_TYPES.EQUAL,
               })
            }
         />
         <label htmlFor="costmax">Equal</label>
         <input
            type="radio"
            id="costmax"
            name="minmaxequal"
            checked={stateFilters.costMinMaxEqual === COST_TYPES.MAX}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_COST_MINMAXEQUAL,
                  payload: COST_TYPES.MAX,
               })
            }
         />
         <label htmlFor="costmax">Max</label>
      </div>
   )
}
