import { NEG_ALL_POS, useFilters } from '../../../context/FiltersContext'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import vpAny from '../../../assets/images/game/vp/any.svg'

export const FilterVP: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div className="custom-filters-vp custom-filters-rounded" style={{ width: '40%' }}>
         <div
            className={`pointer ${stateFilters.vp && 'bg-selected'}`}
            onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_VP, payload: 'true' })}
         >
            <div>
               <img src={vpAny} alt="vp_any" />
               <span>VP</span>
            </div>
         </div>
         <div
            className={`pointer ${stateFilters.vp === false && 'bg-selected'}`}
            onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_VP, payload: 'false' })}
         >
            <div>
               <img src={vpAny} alt="vp_any" />
               <span>NOVP</span>
            </div>
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
            className={!stateFilters.vp ? 'opacity-half' : ''}
         />
         <label htmlFor="vpneg" className={!stateFilters.vp ? 'opacity-half' : ''}>NEGATIVE</label>
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
            className={!stateFilters.vp ? 'opacity-half' : ''}
         />
         <label htmlFor="vpall" className={!stateFilters.vp ? 'opacity-half' : ''}>ALL</label>
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
            className={!stateFilters.vp ? 'opacity-half' : ''}
         />
         <label htmlFor="vppos" className={!stateFilters.vp ? 'opacity-half' : ''}>POSITIVE</label>
      </div>
   )
}
