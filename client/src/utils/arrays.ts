import { TAGS } from '../data/tags'

export function matchesAnd(arr: string[], filterArr: string[]): boolean {
   let match: boolean = true
   filterArr.forEach((filterEl) => {
      if (filterEl === TAGS.NONE) {
         // Exception for NONE tag
         if (arr.length > 0) {
            match = false
            return
         }
      } else {
         // Everything else
         if (!arr.includes(filterEl)) {
            match = false
            return
         }
      }
   })
   return match
}

export function matchesOr(arr: string[], filterArr: string[]): boolean {
   let match: boolean = false
   filterArr.forEach((filterEl) => {
      if (arr.includes(filterEl) || (filterEl === TAGS.NONE && arr.length === 0)) {
         match = true
         return
      }
   })
   return match
}
