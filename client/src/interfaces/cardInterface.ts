export interface CardInterface {
   id: number
   name: string
   description: string
   type: string
   info: string[]
   cost: number
   requirements: ReqInterface[]
   vp: number
   tags: string[]
   effect: string | null
   iconNames: IconNamesInterface
}

export interface ReqInterface {
   type: string
   value: number
   other: string
}

interface IconNamesInterface {
   vp: string | null
   action: string | null
}
