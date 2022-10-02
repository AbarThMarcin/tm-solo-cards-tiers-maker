import { createTiersList } from '../../api/apiTiersList'
import { useLists } from '../../context/ListsContext'
import { useModal } from '../../context/ModalContext'
import { useUser } from '../../context/UserContext'
import { INPUT_TYPES } from '../../interfaces/modalInterface'
import { ACTIONS_LISTS } from '../../store/actions/actionsLists'
import logo from '../../assets/images/logos/logo.png'

export const ListCreateSnap: React.FC = () => {
   const { dispatchLists, setSelectedListId } = useLists()
   const { user } = useUser()
   const { setModal } = useModal()

   const handleClickCreateList = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.LIST,
         inputText: '',
         text: 'Enter the name of new Tiers List:',
         onContinue: (name: string) => createList(name),
      })
   }

   const createList = async (listName: string): Promise<any> => {
      if (!user) return
      const res = await createTiersList(user.token, { name: listName })
      if (res.success) {
         const newList = res.data
         dispatchLists({ type: ACTIONS_LISTS.CREATE_LIST, payload: newList })
         setSelectedListId(newList._id)
      }
      return res
   }

   return (
      <div className="d-flex flex-column ms-auto me-auto">
         <img
            src={logo}
            style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
            alt="mars-logo"
         />
         <button onClick={handleClickCreateList}>CREATE TIERS LIST</button>
      </div>
   )
}
