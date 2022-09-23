import { useNavigate, useParams } from 'react-router-dom'
import { ListInterface } from '../../interfaces/listInterface'
import { toUrl } from '../../utils/strings'
import logo from '../../assets/images/logos/logo.png'
import { useModal } from '../../context/ModalContext'
import { NoTiersList } from './NoTiersList'

interface Props {
   lists: ListInterface[]
   deleteList: (list: ListInterface) => Promise<void>
}

export const ListSnap: React.FC<Props> = ({ lists, deleteList }) => {
   const navigate = useNavigate()
   const { setModal } = useModal()
   const { tierListName } = useParams()
   const list: ListInterface | undefined = lists.find((l) => toUrl(l.name) === tierListName)

   const handleClickDelete = (): void => {
      setModal((prev) => ({
         ...prev,
         showInpTxt: false,
         show: true,
         text: `Are you sure you want to delete the following list: \n${list?.name}?`,
         onContinue: () => deleteList(list!),
      }))
   }

   return (
      <div className="d-flex flex-column ms-auto me-auto">
         {list ? (
            <>
               <h3>
                  <span>{list?.name}</span>
               </h3>
               <span>{list.players.length} players</span>
               <span>{208 - list.drawnCardsIds.length} cards to draw</span>
               <img
                  src={logo}
                  style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
                  alt="mars-logo"
               />
               <button onClick={() => navigate('details')}>EDIT</button>
               <button onClick={handleClickDelete}>DELETE</button>
            </>
         ) : (
            <NoTiersList />
         )}
      </div>
   )
}
