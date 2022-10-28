import { useFilters } from '../../../context/FiltersContext'
import { CARD_TYPES } from '../../../data/cards'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

export const FilterCardType: React.FC = () => {
   const { stateFilters, dispatchFilters } = useFilters()

   return (
      <div style={{ width: '25.9%' }} className="custom-filters-cardtype custom-filters-rect">
         <div
            className={`pointer ${
               stateFilters.cardTypes.includes(CARD_TYPES.GREEN) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                  payload: CARD_TYPES.GREEN,
               })
            }
         >
            auto
         </div>
         <div
            className={`pointer ms-2 ${
               stateFilters.cardTypes.includes(CARD_TYPES.BLUE) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                  payload: CARD_TYPES.BLUE,
               })
            }
         >
            active
         </div>
         <div
            className={`pointer ms-2 ${
               stateFilters.cardTypes.includes(CARD_TYPES.RED) && 'bg-selected'
            }`}
            onClick={() =>
               dispatchFilters({
                  type: ACTIONS_FILTERS.TOGGLE_CARD_TYPE,
                  payload: CARD_TYPES.RED,
               })
            }
         >
            events
         </div>
      </div>
   )
}
