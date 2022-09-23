import { useLocation } from 'react-router-dom'

export const NoMatch = () => {
   let location = useLocation()
   return (
      <section className="section">
         <div>
            <h3>
               No match for <code>{location.pathname}</code>
            </h3>
         </div>
      </section>
   )
}
