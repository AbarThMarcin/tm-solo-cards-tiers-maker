export interface ListInterface {
   _id: string
   name: string
   user: string
   drawnCardsIds: number[]
   players: PlayerInterface[]
}

export interface PlayerInterface {
   _id: string
   name: string
   rates: RateInterface[]
}

export interface RateInterface {
   cardId: number
   value: string
}

export interface ListActionInt {
   type: string
   payload: any
}