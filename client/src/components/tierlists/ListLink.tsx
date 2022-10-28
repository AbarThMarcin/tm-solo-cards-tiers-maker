import { ListInterface } from '../../interfaces/listInterface'
import { TiDelete } from 'react-icons/ti'
import { useModal } from '../../context/ModalContext'
import { useLists } from '../../context/ListsContext'
import { deleteTiersList } from '../../api/apiTiersList'
import { useUser } from '../../context/UserContext'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'

interface Props {
   list?: ListInterface
}

export const ListLink: React.FC<Props> = ({ list }) => {
   const { stateLists, dispatchLists, selectedListId, setSelectedListId } = useLists()
   const { user } = useUser()
   const { setModal } = useModal()

   const handleClickDelete = (e: React.MouseEvent<HTMLElement>): void => {
      e.stopPropagation()
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
      <li
         className={list?._id === selectedListId || (!list && !selectedListId) ? 'selected' : ''}
         onClick={() => setSelectedListId(list ? list._id : null)}
      >
         <span>{list ? list.name : <strong className="light-green">* CREATE NEW LIST</strong>}</span>
         {list && (
            <TiDelete
               size="20px"
               className="btn-delete-list pointer ms-1"
               onClick={(e: any) => handleClickDelete(e)}
            />
         )}
      </li>
   )
}
