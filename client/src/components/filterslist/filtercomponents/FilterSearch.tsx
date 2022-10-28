import { useFilters } from '../../../context/FiltersContext'
import { ACTIONS_FILTERS } from '../../../store/actions/actionsFilters'
import { debounce } from '../../../utils/debounce'

interface Props {
   searchRef: React.MutableRefObject<HTMLInputElement>
}

export const FilterSearch: React.FC<Props> = ({ searchRef }) => {
   const { dispatchFilters } = useFilters()

   const handleChangeSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) =>
      dispatchFilters({ type: ACTIONS_FILTERS.SET_SEARCHVALUE, payload: e.target.value })
   )

   return (
      <input style={{ width: '23.9%' }}
         ref={searchRef}
         type="text"
         onChange={handleChangeSearch}
         placeholder="Search id, name or description..."
      />
   )
}
