import React from 'react'
import { RESOURCES } from '../../../data/resources'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { AND_OR } from '../../../pages/CardsList'
import { ACTIONS_FILTERS } from '../../../store/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterProduction: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
      return <div className="d-flex small justify-content-between w-100">
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.MLN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.MLN,
               })
            }
         >
            mln
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.STEEL) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.STEEL,
               })
            }
         >
            steel
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.TITAN) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.TITAN,
               })
            }
         >
            titan
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.PLANT) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.PLANT,
               })
            }
         >
            plant
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.ENERGY) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.ENERGY,
               })
            }
         >
            energy
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.HEAT) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.HEAT,
               })
            }
         >
            heat
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.CARD) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.CARD,
               })
            }
         >
            card
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.NONE) && 'bg-primary'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.NONE,
               })
            }
         >
            no prod
         </div>
         <input
            type="radio"
            id="prodand"
            name="prodsandor"
            checked={stateFilters.productionAndOr === AND_OR.AND}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_PRODUCTION_ANDOR,
                  payload: AND_OR.AND,
               })
            }
         />
         <label htmlFor="prodand">And</label>
         <input
            type="radio"
            id="prodor"
            name="prodsandor"
            checked={stateFilters.productionAndOr === AND_OR.OR}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_PRODUCTION_ANDOR,
                  payload: AND_OR.OR,
               })
            }
         />
         <label htmlFor="prodor">Or</label>
         <button
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.RESET_PRODUCTION, payload: '' })
            }
         >
            <small>RESET PRODUCTION</small>
         </button>
      </div>
}