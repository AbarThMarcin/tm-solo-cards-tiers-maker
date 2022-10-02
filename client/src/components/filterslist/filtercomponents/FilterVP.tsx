import React from 'react'
import { FiltersActionInt, FiltersStateInt } from '../../../interfaces/filtersInterface'
import { NEG_ALL_POS } from '../../../pages/CardsList'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   stateFilters: FiltersStateInt
   dispatchFilters: React.Dispatch<FiltersActionInt>
}

export const FilterVP: React.FC<Props> = ({ stateFilters, dispatchFilters }) => {
   return (
      <div className="d-flex small w-100">
         <div
            className={`pointer ${stateFilters.vp && 'bg-primary'}`}
            onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_VP, payload: 'true' })}
         >
            VP
         </div>
         <div
            className={`pointer ${stateFilters.vp === false && 'bg-primary'}`}
            onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_VP, payload: 'false' })}
         >
            NO VP
         </div>
         <input
            type="radio"
            id="vpneg"
            name="vbnegposall"
            checked={stateFilters.vpNegPosAll === NEG_ALL_POS.NEGATIVE}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_VP_NEGALLPOS,
                  payload: NEG_ALL_POS.NEGATIVE,
               })
            }
            disabled={!stateFilters.vp}
         />
         <label htmlFor="vpneg">NEGATIVE</label>
         <input
            type="radio"
            id="vpall"
            name="vbnegposall"
            checked={stateFilters.vpNegPosAll === NEG_ALL_POS.ALL}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_VP_NEGALLPOS,
                  payload: NEG_ALL_POS.ALL,
               })
            }
            disabled={!stateFilters.vp}
         />
         <label htmlFor="vpall">ALL</label>
         <input
            type="radio"
            id="vppos"
            name="vbnegposall"
            checked={stateFilters.vpNegPosAll === NEG_ALL_POS.POSITIVE}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_VP_NEGALLPOS,
                  payload: NEG_ALL_POS.POSITIVE,
               })
            }
            disabled={!stateFilters.vp}
         />
         <label htmlFor="vppos">POSITIVE</label>
      </div>
   )
}
