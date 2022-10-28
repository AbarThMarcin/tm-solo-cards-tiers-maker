import { AND_OR, useFilters } from '../../../context/FiltersContext'
import { RESOURCES } from '../../../data/resources'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import Tippy from '@tippyjs/react'
import prodBg from '../../../assets/images/game/resources/prodBg.svg'
import mln from '../../../assets/images/game/resources/mln.svg'
import steel from '../../../assets/images/game/resources/steel.svg'
import titan from '../../../assets/images/game/resources/titan.svg'
import plant from '../../../assets/images/game/resources/plant.svg'
import energy from '../../../assets/images/game/resources/energy.svg'
import heat from '../../../assets/images/game/resources/heat.svg'
import card from '../../../assets/images/game/resources/card.png'

export const FilterProduction: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div style={{ width: '73%' }} className="custom-filters-production custom-filters-rect">
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.MLN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.MLN,
               })
            }
         >
            <div>
               <img src={prodBg} alt="production_bg" />
               <img src={mln} alt="resource_mln" />
               <span>M</span>
            </div>
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.STEEL) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.STEEL,
               })
            }
         >
            <div>
               <img src={prodBg} alt="production_bg" />
               <img src={steel} alt="resource_steel" />
            </div>
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.TITAN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.TITAN,
               })
            }
         >
            <div>
               <img src={prodBg} alt="production_bg" />
               <img src={titan} alt="resource_titan" />
            </div>
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.PLANT) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.PLANT,
               })
            }
         >
            <div>
               <img src={prodBg} alt="production_bg" />
               <img src={plant} alt="resource_plant" />
            </div>
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.ENERGY) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.ENERGY,
               })
            }
         >
            <div>
               <img src={prodBg} alt="production_bg" />
               <img src={energy} alt="resource_energy" />
            </div>
         </div>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.HEAT) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.HEAT,
               })
            }
         >
            <div>
               <img src={prodBg} alt="production_bg" />
               <img src={heat} alt="resource_heat" />
            </div>
         </div>
         <Tippy content="Any cards with immediate action, action or effect, that gives you one or more cards" delay={[200, null]}>
            <div
               className={`pointer ${
                  stateFilters.production.includes(RESOURCES.CARD) && 'bg-selected'
               }`}
               onClick={() =>
                  dispatchFilters({
                     type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                     payload: RESOURCES.CARD,
                  })
               }
            >
               <div>
                  <img src={prodBg} alt="production_bg" />
                  <img src={card} alt="resource_card" style={{ height: '82%' }} />
               </div>
            </div>
         </Tippy>
         <div
            className={`pointer ${
               stateFilters.production.includes(RESOURCES.NONE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_PRODUCTION,
                  payload: RESOURCES.NONE,
               })
            }
         >
            <div className="no-value">NO PROD</div>
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
         <label htmlFor="prodand">AND</label>
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
         <label htmlFor="prodor">OR</label>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_PRODUCTION })}>
            <small>RESET PROD</small>
         </button>
      </div>
   )
}
