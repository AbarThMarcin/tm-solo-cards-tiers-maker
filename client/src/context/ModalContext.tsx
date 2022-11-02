import { createContext, useContext, useState } from 'react'
import { ModalInterface } from '../interfaces/modalInterface'

const initModal = {
   show: false,
   showInpTxt: false,
   inputType: '',
   inputText: '',
   text: '',
   onContinue: async () => {},
}

interface ModalContextInt {
   modal: ModalInterface
   setModal: React.Dispatch<React.SetStateAction<ModalInterface>>
   modalCardId: number
   setModalCardId: React.Dispatch<React.SetStateAction<number>>
   modalCharts: boolean,
   setModalCharts: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalContext = createContext<ModalContextInt>({
   modal: initModal,
   setModal: () => {},
   modalCardId: 0,
   setModalCardId: () => {},
   modalCharts: false,
   setModalCharts: () => {}
})

interface Props {
   children?: React.ReactNode
}

export const useModal = () => useContext(ModalContext)

export const ModalProvider: React.FC<Props> = ({ children }) => {
   const [modal, setModal] = useState<ModalInterface>(initModal)
   const [modalCardId, setModalCardId] = useState<number>(0)
   const [modalCharts, setModalCharts] = useState<boolean>(false)

   return (
      <ModalContext.Provider
         value={{ modal, setModal, modalCardId, setModalCardId, modalCharts, setModalCharts }}
      >
         {children}
      </ModalContext.Provider>
   )
}
