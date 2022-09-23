export interface FiltersStateInt {
   searchValue: string
   tags: string[]
   tagsAndOr: string
   cardTypes: string[]
   cost: string | number
   costMinMaxEqual: string
   production: string[]
   productionAndOr: string
   vp: boolean | null
   vpNegPosAll: string
   requirements: string[]
   requirementsAndOr: string
   parameters: string[]
   parametersAndOr: string
   canHaveUnits: string[]
}

export interface FiltersActionInt {
   type: string
   payload: string
}