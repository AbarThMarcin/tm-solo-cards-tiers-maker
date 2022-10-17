import { useUser } from '../context/UserContext'
import imgTiersMaker from '../assets/images/pageimages/home/img-tiers-maker.png'
import imgTMSolo from '../assets/images/pageimages/home/img-tm-solo.png'
import imgCardsList from '../assets/images/pageimages/home/img-cards-list.png'
import imgTMSoloGame from '../assets/images/pageimages/home/img-tm-solo-game.png'
import { useNavigateToTop } from '../hooks/useNavigateToTop'

export const Home: React.FC = () => {
   const navigate = useNavigateToTop()
   const { user } = useUser()

   return (
      <article>
         <section className="section">
            <div className="home-section-content">
               <img src={imgTiersMaker} alt="mars-logo-tiers-maker" />
               <div className="d-flex flex-column justify-content-center ms-4">
                  <header className="text-center">
                     <h1>TIERS MAKER</h1>
                  </header>
                  <p>
                     Are you in love with terraforming mars solo? Would you like to rate all cards in <strong className='red'>the best 1-player boardgame - TERRAFORMING MARS</strong> on the planet? You are in the right place! Create an account and start your adventure with cards tiers!
                  </p>
               </div>
            </div>
            <div className="buttons-container">
               <button className="button-light red" onClick={() => navigate('/signup')}>
                  {user ? 'GET STARTED' : 'SIGN UP'}
               </button>
            </div>
         </section>
         <section className="section">
            <div className="home-section-content flex-row-reverse">
               <img src={imgTMSolo} alt="mars-logo-tiers-maker" />
               <div className="d-flex flex-column justify-content-center me-4">
                  <header className="text-center">
                     <h1>TERRAFORMING MARS SOLO</h1>
                  </header>
                  <p>
                     Have you been searching the best solo boardgame ever created? Seek no more! <strong className='blue'>TERRAFORMING MARS</strong> is there and awaits you to have the best possible experience playing a game without other players!
                  </p>
               </div>
            </div>
            <div className="buttons-container">
               <button className="button-light blue" onClick={() => navigate('/about')}>
                  SEE MORE
               </button>
            </div>
         </section>
         <section className="section">
            <div className="home-section-content">
               <img src={imgCardsList} alt="mars-logo-tiers-maker" />
               <div className="d-flex flex-column justify-content-center ms-4">
                  <header className="text-center">
                     <h1>CARDS LIST</h1>
                  </header>
                  <p>
                     Visit the best <strong className='strong'>TERRAFORMING MARS</strong> cards browser there is! Search cards by type, tags, production, resources, requirements and many more!
                  </p>
               </div>
            </div>
            <div className="buttons-container">
               <button className="button-light" onClick={() => navigate('/cards')}>
                  GO TO CARDS LIST
               </button>
            </div>
         </section>
         <section className="section">
            <div className="home-section-content flex-row-reverse">
               <img src={imgTMSoloGame} alt="mars-logo-tiers-maker" />
               <div className="d-flex flex-column justify-content-center me-4">
                  <header className="text-center">
                     <h1>TERRAFORMING MARS SOLO - GAME</h1>
                  </header>
                  <p>
                     Have you ever wondered what would the best boardgame online for one person look like? Here it is: The <strong className='strong blue'>TERRAFORMING MARS SOLO - GAME</strong>!
                  </p>
               </div>
            </div>
            <div className="buttons-container">
               <button className="button-light blue" onClick={() => navigate('/tm-solo-game')}>
                  SEE DETAILS
               </button>
               <button
                  className="button-light red"
                  onClick={() =>
                     window.open('https://terraforming-mars-solo.herokuapp.com', '_blank')
                  }
               >
                  PLAY NOW
               </button>
            </div>
         </section>
      </article>
   )
}
