export const toUrl = (s: string): string => {
   return s.replaceAll(" ", "-").toLowerCase()
}