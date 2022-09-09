export interface FiltersStateInt {
   searchValue: string
   tags: string[]
   tagsAndOr: string
   cardTypes: string[]
   cost: number | null
   costMinMaxEqual: string
   production: string[]
   productionAndOr: string
   vp: boolean | null
   vpNegPosAll: string
   requirement: string | null
   parameters: string[]
   parametersAndOr: string
   canHaveUnits: string | null
}

export interface FiltersActionInt {
   type: string
   payload: string
}