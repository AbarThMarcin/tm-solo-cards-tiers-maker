import React from 'react'
import { CARD_TYPES } from '../data/cards'
import { TAGS } from '../data/tags'
import { FiltersActionInt, FiltersStateInt } from '../interfaces/filtersInterface'
import { AND_OR } from '../pages/CardsList'
import { ACTIONS_FILTERS } from '../reducers/reducerFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
   filterCards: () => void
   startTransition: React.TransitionStartFunction
}

export const CardsListFilters: React.FC<Props> = ({
   stateFilters,
   dispatchFilters,
   filterCards,
   startTransition,
}) => {
   function handleFilterClick(callback: () => void): void {
      callback()
      // startTransition(() => filterCards())
   }

   return (
      <div style={{ backgroundColor: 'rgba(255,0,0,0.2)', width: '500px', height: '150px' }}>
         <h4>FILTERS</h4>
         {/* Card Type */}
         <div className="d-flex small w-100">
            <div
               className={`pointer ${
                  stateFilters.cardTypes.includes(CARD_TYPES.GREEN) && 'bg-primary'
               }`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({
                        type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                        payload: CARD_TYPES.GREEN,
                     })
                  )
               }
            >
               automated
            </div>
            <div
               className={`pointer ms-2 ${
                  stateFilters.cardTypes.includes(CARD_TYPES.BLUE) && 'bg-primary'
               }`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({
                        type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                        payload: CARD_TYPES.BLUE,
                     })
                  )
               }
            >
               active
            </div>
            <div
               className={`pointer ms-2 ${
                  stateFilters.cardTypes.includes(CARD_TYPES.RED) && 'bg-primary'
               }`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({
                        type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                        payload: CARD_TYPES.RED,
                     })
                  )
               }
            >
               events
            </div>
         </div>
         {/* Tags */}
         <div className="d-flex small justify-content-between w-100">
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.BUILDING) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.BUILDING })
                  )
               }
            >
               building
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.SPACE) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.SPACE })
                  )
               }
            >
               space
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.SCIENCE) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.SCIENCE })
                  )
               }
            >
               science
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.PLANT) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.PLANT })
                  )
               }
            >
               plant
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.MICROBE) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.MICROBE })
                  )
               }
            >
               microbe
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.ANIMAL) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.ANIMAL })
                  )
               }
            >
               animal
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.POWER) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.POWER })
                  )
               }
            >
               power
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.JOVIAN) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.JOVIAN })
                  )
               }
            >
               jovian
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.EARTH) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.EARTH })
                  )
               }
            >
               earth
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.CITY) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.CITY })
                  )
               }
            >
               city
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.EVENT) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.EVENT })
                  )
               }
            >
               event
            </div>
            <div
               className={`pointer ${stateFilters.tags.includes(TAGS.NONE) && 'bg-primary'}`}
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.NONE })
                  )
               }
            >
               none
            </div>
            <input
               type="radio"
               id="and"
               name="andor"
               checked={stateFilters.tagsAndOr === AND_OR.AND}
               onChange={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.SET_TAG_ANDOR, payload: AND_OR.AND })
                  )
               }
            />
            <label htmlFor="and">And</label>
            <input
               type="radio"
               id="or"
               name="andor"
               checked={stateFilters.tagsAndOr === AND_OR.OR}
               onChange={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.SET_TAG_ANDOR, payload: AND_OR.OR })
                  )
               }
            />
            <label htmlFor="or">Or</label>
            <button
               onClick={() =>
                  handleFilterClick(() =>
                     dispatchFilters({ type: ACTIONS_FILTERS.RESET_TAGS, payload: '' })
                  )
               }
            >
               <small>RESET TAGS</small>
            </button>
         </div>
      </div>
   )
}
