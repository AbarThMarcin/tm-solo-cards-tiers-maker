import React from 'react'
import { RESOURCES } from '../../../data/resources'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterUnits: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
      return <div className="d-flex small w-100">
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.MICROBE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.MICROBE })
            }
         >
            microbe
         </div>
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.ANIMAL) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.ANIMAL })
            }
         >
            animal
         </div>
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.SCIENCE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.SCIENCE })
            }
         >
            science
         </div>
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.FIGHTER) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.FIGHTER })
            }
         >
            fighter
         </div>
         <button
            onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_UNITS })}
         >
            <small>RESET UNITS</small>
         </button>
      </div>
}