import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import logo from '../assets/images/logos/logo.png'

export const Home: React.FC = () => {
   const { user } = useUser()

   return (
      <article>
         <section className='section'>
            <div className="custom-section-content h-50 w-100 d-flex justify-content-center align-items-center">
               <img
                  src={logo}
                  style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
                  alt="mars-logo"
               />
               <div
                  className="ms-4 d-flex flex-column justify-content-center"
                  style={{ maxWidth: '400px' }}
               >
                  <header className="text-center">
                     <h1>TIERS MAKER</h1>
                  </header>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia laudantium
                     excepturi quis, quidem dignissimos magnam cupiditate accusantium veritatis,
                     ullam iusto illum facilis suscipit recusandae quasi sint provident maxime
                     quaerat quae repellendus nostrum. Rerum libero fugiat in similique iste itaque
                     necessitatibus voluptatum voluptas
                  </p>
               </div>
            </div>
            <Link to="/signup">
               <button>{user ? 'GET STARTED' : 'SIGN UP'}</button>
            </Link>
         </section>
         <section className='section'>
            <div className="custom-section-content h-50 w-100 d-flex justify-content-center align-items-center flex-row-reverse">
               <img
                  src={logo}
                  style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
                  alt="mars-logo"
               />
               <div
                  className="me-4 d-flex flex-column justify-content-center"
                  style={{ maxWidth: '400px' }}
               >
                  <header className="text-center">
                     <h1>TERRAFORMING MARS SOLO</h1>
                  </header>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia laudantium
                     excepturi quis, quidem dignissimos magnam cupiditate accusantium veritatis,
                     ullam iusto illum facilis suscipit recusandae quasi sint provident maxime
                     quaerat quae repellendus nostrum. Rerum libero fugiat in similique iste itaque
                     necessitatibus voluptatum voluptas
                  </p>
               </div>
            </div>
            <Link to="/about">
               <button>SEE MORE</button>
            </Link>
         </section>
         <section className='section'>
            <div className="custom-section-content h-50 w-100 d-flex justify-content-center align-items-center">
               <img
                  src={logo}
                  style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
                  alt="mars-logo"
               />
               <div
                  className="ms-4 d-flex flex-column justify-content-center"
                  style={{ maxWidth: '400px' }}
               >
                  <header className="text-center">
                     <h1>CARDS LIST</h1>
                  </header>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia laudantium
                     excepturi quis, quidem dignissimos magnam cupiditate accusantium veritatis,
                     ullam iusto illum facilis suscipit recusandae quasi sint provident maxime
                     quaerat quae repellendus nostrum. Rerum libero fugiat in similique iste itaque
                     necessitatibus voluptatum voluptas
                  </p>
               </div>
            </div>
            <Link to="/cards">
               <button>SEE ALL CARDS</button>
            </Link>
         </section>
         <section className='section'>
            <div className="custom-section-content h-50 w-100 d-flex justify-content-center align-items-center flex-row-reverse">
               <img
                  src={logo}
                  style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
                  alt="mars-logo"
               />
               <div
                  className="me-4 d-flex flex-column justify-content-center"
                  style={{ maxWidth: '400px' }}
               >
                  <header className="text-center">
                     <h1>TERRAFORMING MARS SOLO - GAME</h1>
                  </header>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia laudantium
                     excepturi quis, quidem dignissimos magnam cupiditate accusantium veritatis,
                     ullam iusto illum facilis suscipit recusandae quasi sint provident maxime
                     quaerat quae repellendus nostrum. Rerum libero fugiat in similique iste itaque
                     necessitatibus voluptatum voluptas
                  </p>
               </div>
            </div>
            <Link to="/tm-solo-game">
               <button>SEE DETAILS</button>
            </Link>
            <a
               href="https://terraforming-mars-solo.herokuapp.com"
               target="_blank"
               rel="noopener noreferrer"
            >
               <button>PLAY NOW</button>
            </a>
         </section>
      </article>
   )
}
