import { AND_OR, useFilters } from '../../../context/FiltersContext'
import { REQUIREMENTS } from '../../../data/requirements'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import Tippy from '@tippyjs/react'
import reqTemp from '../../../assets/images/game/other/tempIcon.svg'
import reqOx from '../../../assets/images/game/other/oxIcon.svg'
import reqOcean from '../../../assets/images/game/tiles/ocean.svg'
import reqTags from '../../../assets/images/game/tags/any.svg'
import reqProd from '../../../assets/images/game/resources/anyprod.svg'
import reqRes from '../../../assets/images/game/resources/any.svg'
import reqBoard from '../../../assets/images/game/tiles/any.svg'

export const FilterReqs: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div style={{ width: '100%' }} className="custom-filters-req custom-filters-rect">
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.TEMPERATURE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.TEMPERATURE,
               })
            }
         >
            <img style={{ height: '40px' }} src={reqTemp} alt="icon_temp" />
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.OXYGEN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.OXYGEN,
               })
            }
         >
            <img style={{ height: '35px' }} src={reqOx} alt="icon_ox" />
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.OCEAN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.OCEAN })
            }
         >
            <img style={{ height: '35px' }} src={reqOcean} alt="icon_ocean" />
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.TAGS) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.TAGS })
            }
         >
            <img style={{ height: '33px' }} src={reqTags} alt="icon_tags" />
         </div>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.PRODUCTION) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_REQ,
                  payload: REQUIREMENTS.PRODUCTION,
               })
            }
         >
            <img style={{ height: '33px' }} src={reqProd} alt="icon_prod" />
         </div>
         <Tippy
            content="Any cards with resources requirements, i.e. Moss (you need 1 plant in order to be able to play that card)"
            delay={[200, null]}
         >
            <div
               className={`pointer ${
                  stateFilters.requirements.includes(REQUIREMENTS.RESOURCES) && 'bg-selected'
               }`}
               onClick={() =>
                  dispatchFilters({
                     type: ACTIONS_FILTERS.TOGGLE_REQ,
                     payload: REQUIREMENTS.RESOURCES,
                  })
               }
            >
               <img style={{ height: '29px' }} src={reqRes} alt="icon_res" />
            </div>
         </Tippy>
         <Tippy
            content="Any cards with a hidden tile requirement; basically any card that allows you to place on THARSIS planet: a city (except noctis city), greenery (except Mangrove and Protected Valley) or any special tile"
            delay={[200, null]}
         >
            <div
               className={`pointer ${
                  stateFilters.requirements.includes(REQUIREMENTS.BOARD) && 'bg-selected'
               }`}
               onClick={() =>
                  dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.BOARD })
               }
            >
               <img style={{ height: '33px' }} src={reqBoard} alt="icon_board" />
            </div>
         </Tippy>
         <Tippy
            content="Any cards with special, not listed, requirements, which are: Robotic Workforce (86), CEO's Favourite Project (149) and Rad-Suits (186)"
            delay={[200, null]}
         >
            <div
               className={`pointer ${
                  stateFilters.requirements.includes(REQUIREMENTS.OTHER) && 'bg-selected'
               }`}
               onClick={() =>
                  dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.OTHER })
               }
            >
               OTHER
            </div>
         </Tippy>
         <div
            className={`pointer ${
               stateFilters.requirements.includes(REQUIREMENTS.NONE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_REQ, payload: REQUIREMENTS.NONE })
            }
         >
            NO REQ
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
         <label htmlFor="reqand">AND</label>
         <input
            type="radio"
            id="reqor"
            name="reqsandor"
            checked={stateFilters.requirementsAndOr === AND_OR.OR}
            onChange={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.SET_REQ_ANDOR, payload: AND_OR.OR })
            }
         />
         <label htmlFor="reqor">OR</label>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_REQS })}>
            <small>RESET REQS</small>
         </button>
      </div>
   )
}
