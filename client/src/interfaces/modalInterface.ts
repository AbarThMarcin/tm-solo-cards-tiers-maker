export const INPUT_TYPES = {
   LIST: 'LIST',
   PLAYER: 'PLAYER',
   ADD_RATE: 'ADD_RATE',
   EDIT_RATE: 'EDIT_RATE',
   CARD: 'CARD'
}

export interface ModalInterface {
   show: boolean
   showInpTxt: boolean
   inputType: string
   inputText: string
   text: string
   onContinue: ([...args]?: any) => any
}