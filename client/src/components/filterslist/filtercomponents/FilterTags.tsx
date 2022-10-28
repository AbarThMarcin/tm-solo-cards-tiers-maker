import { AND_OR, useFilters } from '../../../context/FiltersContext'
import { TAGS } from '../../../data/tags'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import tagBuilding from '../../../assets/images/game/tags/building.svg'
import tagSpace from '../../../assets/images/game/tags/space.svg'
import tagScience from '../../../assets/images/game/tags/science.svg'
import tagPlant from '../../../assets/images/game/tags/plant.svg'
import tagMicrobe from '../../../assets/images/game/tags/microbe.svg'
import tagAnimal from '../../../assets/images/game/tags/animal.svg'
import tagPower from '../../../assets/images/game/tags/power.svg'
import tagJovian from '../../../assets/images/game/tags/jovian.svg'
import tagEarth from '../../../assets/images/game/tags/earth.svg'
import tagCity from '../../../assets/images/game/tags/city.svg'
import tagEvent from '../../../assets/images/game/tags/event.svg'

export const FilterTags: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div className="custom-filters-rounded" style={{ width: '100%' }}>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.BUILDING) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.BUILDING })
            }
         >
            <img src={tagBuilding} alt="tag_building" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.SPACE) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.SPACE })
            }
         >
            <img src={tagSpace} alt="tag_space" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.SCIENCE) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.SCIENCE })
            }
         >
            <img src={tagScience} alt="tag_science" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.PLANT) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.PLANT })
            }
         >
            <img src={tagPlant} alt="tag_plant" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.MICROBE) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.MICROBE })
            }
         >
            <img src={tagMicrobe} alt="tag_microbe" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.ANIMAL) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.ANIMAL })
            }
         >
            <img src={tagAnimal} alt="tag_animal" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.POWER) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.POWER })
            }
         >
            <img src={tagPower} alt="tag_power" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.JOVIAN) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.JOVIAN })
            }
         >
            <img src={tagJovian} alt="tag_jovian" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.EARTH) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.EARTH })
            }
         >
            <img src={tagEarth} alt="tag_earth" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.CITY) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.CITY })
            }
         >
            <img src={tagCity} alt="tag_city" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.EVENT) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.EVENT })
            }
         >
            <img src={tagEvent} alt="tag_event" />
         </div>
         <div
            className={`pointer ${stateFilters.tags.includes(TAGS.NONE) && 'bg-selected'}`}
            onClick={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.TOGGLE_TAG, payload: TAGS.NONE })
            }
         >
            <div className="no-tag">NO TAG</div>
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
         <label htmlFor="tagsand">AND</label>
         <input
            type="radio"
            id="tagsor"
            name="tagsandor"
            checked={stateFilters.tagsAndOr === AND_OR.OR}
            onChange={() =>
               dispatchFilters({ type: ACTIONS_FILTERS.SET_TAG_ANDOR, payload: AND_OR.OR })
            }
         />
         <label htmlFor="tagsor">OR</label>
         <button onClick={() => dispatchFilters({ type: ACTIONS_FILTERS.RESET_TAGS })}>
            <small>RESET TAGS</small>
         </button>
      </div>
   )
}
