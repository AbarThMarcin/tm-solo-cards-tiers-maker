import { Nav } from 'react-bootstrap'
import { ListInterface } from '../../interfaces/listInterface'
import { TiDelete } from 'react-icons/ti'
import { toUrl } from '../../utils/strings'
import { NavLink } from 'react-router-dom'
import { useModal } from '../../context/ModalContext'

interface Props {
   list: ListInterface
   deleteList: (list: ListInterface) => Promise<void>
}

export const ListLink: React.FC<Props> = ({ list, deleteList }) => {
   const { setModal } = useModal()

   const handleClickDelete = (): void => {
      setModal((prev) => ({
         ...prev,
         showInpTxt: false,
         show: true,
         text: `Are you sure you want to delete the following list: \n${list.name}?`,
         onContinue: () => deleteList(list),
      }))
   }

   return (
      <>
         {/* Link */}
         <div className="d-flex">
            <Nav.Link as={NavLink} to={toUrl(list.name)}>
               {list.name}
            </Nav.Link>
            <TiDelete size="20px" className="pointer" onClick={handleClickDelete} />
         </div>
      </>
   )
}
