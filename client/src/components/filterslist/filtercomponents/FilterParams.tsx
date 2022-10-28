import { AND_OR, useFilters } from '../../../context/FiltersContext'
import { PARAMETERS } from '../../../data/parameters'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import Tippy from '@tippyjs/react'
import paramTr from '../../../assets/images/game/parameters/tr.svg'
import paramTemp from '../../../assets/images/game/other/tempIcon.svg'
import paramOcean from '../../../assets/images/game/tiles/ocean.svg'
import paramGreenery from '../../../assets/images/game/tiles/greenery.svg'
import paramOx from '../../../assets/images/game/other/oxIcon.svg'

export const FilterParams: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div style={{ width: '59%' }} className="custom-filters-params">
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.TR) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.TR,
               })
            }
         >
            <img src={paramTr} alt="param_tr" />
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.TEMPERATURE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.TEMPERATURE,
               })
            }
         >
            <img src={paramTemp} alt="param_temp" />
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.OCEAN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.OCEAN,
               })
            }
         >
            <img src={paramOcean} alt="param_ocean" />
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.GREENERY) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.GREENERY,
               })
            }
         >
            <img src={paramGreenery} alt="param_greenery" />
         </div>
         <div
            className={`pointer ${
               stateFilters.parameters.includes(PARAMETERS.OXYGEN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                  payload: PARAMETERS.OXYGEN,
               })
            }
         >
            <img src={paramOx} alt="param_ox" />
         </div>
         <Tippy
            content="Any cards without any of the following immediate actions / actions: raise TR, raise temperature, place ocean, place greenery, raise oxygen"
            delay={[200, null]}
         >
            <div
               className={`pointer ${
                  stateFilters.parameters.includes(PARAMETERS.NONE) && 'bg-selected'
               }`}
               onClick={() =>
                  dispatchFilters({
                     type: ACTIONS_FILTERS.TOGGLE_PARAMETER,
                     payload: PARAMETERS.NONE,
                  })
               }
            >
               <div className="no-value">NO PARAM</div>
            </div>
         </Tippy>
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
         <label htmlFor="paramand">AND</label>
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
         <label htmlFor="paramor">OR</label>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_PARAMETERS })}>
            <small>RESET PARAMS</small>
         </button>
      </div>
   )
}
