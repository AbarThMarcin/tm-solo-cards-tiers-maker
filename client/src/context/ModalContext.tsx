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
}

const ModalContext = createContext<ModalContextInt>({ modal: initModal, setModal: () => {} })

interface Props {
   children?: React.ReactNode
}

export const useModal = () => useContext(ModalContext)

export const ModalProvider: React.FC<Props> = ({ children }) => {
   const [modal, setModal] = useState<ModalInterface>(initModal)

   return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>
}
