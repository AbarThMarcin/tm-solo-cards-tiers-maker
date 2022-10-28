import { COST_TYPES, useFilters } from '../../../context/FiltersContext'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import tagMln from '../../../assets/images/game/resources/mln.svg'
import { useRef } from 'react'

export const FilterCost: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()
   const costInputRef = useRef<HTMLInputElement>(null!)

   const handleChangeCost = (e: React.ChangeEvent<HTMLInputElement>): void => {
      dispatchFilters({ type: ACTIONS_FILTERS.SET_COST, payload: e.target.value })
   }

   const handleChangeCostFilter = (operation: string): void => {
      let v =
         costInputRef.current.value === '' ||
         costInputRef.current.value === '-' ||
         costInputRef.current.value === '--'
            ? 0
            : parseInt(costInputRef.current.value)
      v = operation === 'inc' ? v + 1 : v - 1
      if (v < 0) v = 0
      if (v > 41) v = 41
      costInputRef.current.value = `${v}`.toString()
      dispatchFilters({ type: ACTIONS_FILTERS.SET_COST, payload: v })
   }

   return (
      <div style={{ width: '35%' }}>
         <div className="input-with-arrows">
            <div className="change-num inc-num" onClick={() => handleChangeCostFilter('inc')}>
               <MdOutlineKeyboardArrowUp />
            </div>
            <div className="change-num dec-num" onClick={() => handleChangeCostFilter('dec')}>
               <MdOutlineKeyboardArrowDown />
            </div>
            <div className="change-num-mln">
               <img src={tagMln} alt="bg-mln" />
               <input
                  ref={costInputRef}
                  type="number"
                  min={0}
                  max={41}
                  value={stateFilters.cost}
                  onChange={handleChangeCost}
               />
            </div>
         </div>
         <input
            type="radio"
            id="costmin"
            name="costminmaxequal"
            checked={stateFilters.costMinMaxEqual === COST_TYPES.MIN}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_COST_MINMAXEQUAL,
                  payload: COST_TYPES.MIN,
               })
            }
         />
         <label htmlFor="costmin">MIN</label>
         <input
            type="radio"
            id="costequal"
            name="costminmaxequal"
            checked={stateFilters.costMinMaxEqual === COST_TYPES.EQUAL}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_COST_MINMAXEQUAL,
                  payload: COST_TYPES.EQUAL,
               })
            }
         />
         <label htmlFor="costequal">EQUAL</label>
         <input
            type="radio"
            id="costmax"
            name="minmaxequal"
            checked={stateFilters.costMinMaxEqual === COST_TYPES.MAX}
            onChange={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.SET_COST_MINMAXEQUAL,
                  payload: COST_TYPES.MAX,
               })
            }
         />
         <label htmlFor="costmax">MAX</label>
      </div>
   )
}
