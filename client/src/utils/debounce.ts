export function debounce(cb: (...args: any[]) => void, delay: number = 700): () => void {
   let timer: ReturnType<typeof setTimeout>
   return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
         cb(...args)
      }, delay)
   }
}
