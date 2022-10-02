import React from 'react'
import { TAGS } from '../../../data/tags'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { AND_OR } from '../../../pages/CardsList'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterTags: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   return (
      <div className="d-flex small justify-content-between w-100">
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.BUILDING) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.BUILDING })
            }
         >
            building
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.SPACE) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.SPACE })
            }
         >
            space
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.SCIENCE) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.SCIENCE })
            }
         >
            science
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.PLANT) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.PLANT })
            }
         >
            plant
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.MICROBE) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.MICROBE })
            }
         >
            microbe
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.ANIMAL) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.ANIMAL })
            }
         >
            animal
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.POWER) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.POWER })
            }
         >
            power
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.JOVIAN) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.JOVIAN })
            }
         >
            jovian
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.EARTH) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.EARTH })
            }
         >
            earth
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.CITY) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.CITY })
            }
         >
            city
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.EVENT) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.EVENT })
            }
         >
            event
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.NONE) && 'bg-primary'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.NONE })
            }
         >
            none
         </div>
         <input
            type="radio"
            id="tagsand"
            name="tagsandor"
            checked={stateFilters.tagsAndOr === AND_OR.AND}
            onChange={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.SET_TAG_ANDOR, payload: AND_OR.AND })
            }
         />
         <label htmlFor="tagsand">And</label>
         <input
            type="radio"
            id="tagsor"
            name="tagsandor"
            checked={stateFilters.tagsAndOr === AND_OR.OR}
            onChange={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.SET_TAG_ANDOR, payload: AND_OR.OR })
            }
         />
         <label htmlFor="tagsor">Or</label>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_TAGS })}>
            <small>RESET TAGS</small>
         </button>
      </div>
   )
}
