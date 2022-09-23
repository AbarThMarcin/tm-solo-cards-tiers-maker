import logo from '../../assets/images/logos/logo.png'
import { useModal } from '../../context/ModalContext'
import { INPUT_TYPES } from '../../interfaces/modalInterface'

interface Props {
   createList: (name: string) => Promise<void>
}

export const ListCreateSnap: React.FC<Props> = ({ createList }) => {
   const { setModal } = useModal()

   const handleClickCreateList = (): void => {
      setModal({
         show: true,
         showInpTxt: true,
         inputType: INPUT_TYPES.LIST,
         inputText: '',
         text: 'Enter the name of new Tiers List:',
         onContinue: (name) => createList(name),
      })
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
