import { Route, Routes } from 'react-router-dom'
import { ListNewRate } from './ListNewRate'
import { ListDetails } from './ListDetails'
import { NoTiersList } from '../../components/tierlists/NoTiersList'

export const ListsLayout: React.FC = () => {
   return (
      <Routes>
         <Route index element={<ListDetails />} />
         <Route path="new-rate" element={<ListNewRate  />} />
         <Route path='*' element={<NoTiersList />} />
      </Routes>
   )
}
