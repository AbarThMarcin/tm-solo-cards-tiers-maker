import React from 'react'
import { PARAMETERS } from '../../../data/parameters'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { AND_OR } from '../../../pages/CardsList'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterParams: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   return (
      <div className="d-flex small justify-content-between w-100">
         <div
            className={`pointer ${stateFilters.parameters.includes(PARAMETERS.TR) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.TR,
               })
            }
         >
            tr
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.TEMPERATURE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.TEMPERATURE,
               })
            }
         >
            temp
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.OCEAN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.OCEAN,
               })
            }
         >
            ocean
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.GREENERY) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.GREENERY,
               })
            }
         >
            green
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.OXYGEN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.OXYGEN,
               })
            }
         >
            ox
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.NONE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.NONE,
               })
            }
         >
            no param
         </div>
         <input
            type="radio"
            id="paramand"
            name="paramsandor"
            checked={stateFilters.parametersAndOr === AND_OR.AND}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_PARAMETERS_ANDOR,
                  payload: AND_OR.AND,
               })
            }
         />
         <label htmlFor="paramand">And</label>
         <input
            type="radio"
            id="paramor"
            name="paramsandor"
            checked={stateFilters.parametersAndOr === AND_OR.OR}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_PARAMETERS_ANDOR,
                  payload: AND_OR.OR,
               })
            }
         />
         <label htmlFor="paramor">Or</label>
         <button
            onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_PARAMETERS })}
         >
            <small>RESET PARAMS</small>
         </button>
      </div>
   )
}
