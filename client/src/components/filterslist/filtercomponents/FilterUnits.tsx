import { useFilters } from '../../../context/FiltersContext'
import { RESOURCES } from '../../../data/resources'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import Tippy from '@tippyjs/react'
import unitMicrobe from '../../../assets/images/game/resources/microbe.svg'
import unitAnimal from '../../../assets/images/game/resources/animal.svg'
import unitScience from '../../../assets/images/game/resources/science.svg'
import unitFighter from '../../../assets/images/game/resources/fighter.svg'

export const FilterUnits: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div style={{ width: '39.9%' }} className="custom-filters-units custom-filters-rect">
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.MICROBE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.MICROBE })
            }
         >
            <img src={unitMicrobe} alt="tag_microbe" />
         </div>
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.ANIMAL) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.ANIMAL })
            }
         >
            <img src={unitAnimal} alt="tag_animal" />
         </div>
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.SCIENCE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.SCIENCE })
            }
         >
            <img src={unitScience} alt="tag_science" />
         </div>
         <div
            className={`pointer ${
               stateFilters.canHaveUnits.includes(RESOURCES.FIGHTER) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_UNIT, payload: RESOURCES.FIGHTER })
            }
         >
            <img src={unitFighter} alt="tag_fighter" />
         </div>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_UNITS })}>
            <small>RESET UNITS</small>
         </button>
         <Tippy
            content="Any cards, a specific resource can be placed to"
            delay={[200, null]}
         >
            <div className="info-question-mark">?</div>
         </Tippy>
      </div>
   )
}
