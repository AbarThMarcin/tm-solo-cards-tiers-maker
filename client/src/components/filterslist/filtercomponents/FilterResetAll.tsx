import { useFilters } from '../../../context/FiltersContext'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'

interface Props {
   searchRef: React.MutableRefObject<HTMLInputElement>
}

export const FilterResetAll: React.FC<Props> = ({ searchRef }) => {
   const { dispatchFilters } = useFilters()

   return (
      <button
         style={{
            width: '29.2%',
            height: '40px',
            fontSize: '1.7rem',
            marginInline: '5px',
         }}
         onClick={() => {
            dispatchFilters({ type: ACTIONS_FILTERS.RESET_ALL })
            searchRef.current.value = ''
         }}
      >
         <small>RESET ALL</small>
      </button>
   )
}
