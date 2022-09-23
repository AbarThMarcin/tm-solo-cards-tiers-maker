import React from 'react'
import { REQUIREMENTS } from '../../../data/requirements'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { AND_OR } from '../../../pages/CardsList'
import { ACTIONS_FILTERS } from '../../../store/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterReqs: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   return (
      <div className="d-flex small justify-content-between w-100">
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.TEMPERATURE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.TEMPERATURE,
               })
            }
         >
            temp
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.OXYGEN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.OXYGEN,
               })
            }
         >
            ox
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.OCEAN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.OCEAN })
            }
         >
            ocean
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.TAGS) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.TAGS })
            }
         >
            tags
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.PRODUCTION) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.PRODUCTION,
               })
            }
         >
            prod
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.RESOURCES) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.RESOURCES,
               })
            }
         >
            res
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.BOARD) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.BOARD })
            }
         >
            board
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.OTHER) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.OTHER })
            }
         >
            other
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.NONE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.NONE })
            }
         >
            no req
         </div>
         <input
            type="radio"
            id="reqand"
            name="reqsandor"
            checked={stateFilters.requirementsAndOr === AND_OR.AND}
            onChange={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.SET_REQ_ANDOR, payload: AND_OR.AND })
            }
         />
         <label htmlFor="reqand">And</label>
         <input
            type="radio"
            id="reqor"
            name="reqsandor"
            checked={stateFilters.requirementsAndOr === AND_OR.OR}
            onChange={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.SET_REQ_ANDOR, payload: AND_OR.OR })
            }
         />
         <label htmlFor="reqor">Or</label>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_REQS, payload: '' })}>
            <small>RESET REQS</small>
         </button>
      </div>
   )
}
