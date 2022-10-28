import { ListInterface } from '../../interfaces/listInterface'
import { useModal } from '../../context/ModalContext'
import { NoTiersList } from './NoTiersList'
import { toUrl } from '../../utils/strings'
import { useLists } from '../../context/ListsContext'
import { useUser } from '../../context/UserContext'
import { deleteTiersList } from '../../api/apiTiersList'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'
import { useNavigateToTop } from '../../hooks/useNavigateToTop'

export const ListSnap: React.FC = () => {
   const navigate = useNavigateToTop()
   const { user } = useUser()
   const { stateLists, dispatchLists, selectedListId, setSelectedListId } = useLists()
   const { setModal } = useModal()
   const list: ListInterface | undefined = stateLists.find((list) => list._id === selectedListId)

   const handleClickDelete = (): void => {
      setModal((prev) => ({
         ...prev,
         showInpTxt: false,
         show: true,
         text: `Are you sure you want to delete the following list: \n${list?.name}?`,
         onContinue: () => deleteList(list?._id || ''),
      }))
   }

   const deleteList = async (listId: String): Promise<any> => {
      if (!user) return
      const res = await deleteTiersList(user.token, { id: listId })
      if (res.success) {
         const newLists = stateLists.filter((l) => l._id !== listId)
         dispatchLists({ type: ACTIONS_LISTS.SET_LISTS, payload: newLists })
         setSelectedListId(newLists.length > 0 ? newLists[0]._id : null)
      }
      return res
   }

   return (
      <div className="list-snap">
         {list ? (
            <>
               <div className="bg">
                  <div className='full-size'>
                     <h2>
                        {list?.name}
                     </h2>
                     <span>
                        <strong className="green" style={{ fontSize: '2rem' }}>{list.players.length}</strong>{' '}
                        {list.players.length === 1 ? 'player' : 'players'}
                     </span>
                     <span>
                        <strong className="green" style={{ fontSize: '2rem' }}>{208 - list.drawnCardsIds.length}</strong>{' '}
                        {list.drawnCardsIds.length === 207 ? 'card to draw' : 'cards to draw'}
                     </span>
                  </div>
               </div>

               <div>
                  <button className="button-light green" onClick={() => navigate(toUrl(list.name))}>
                     EDIT
                  </button>
                  <button className="button-light red" onClick={handleClickDelete}>
                     DELETE
                  </button>
               </div>
            </>
         ) : (
            <NoTiersList />
         )}
      </div>
   )
}
