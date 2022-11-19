import imgTMSoloGame from '../assets/images/pageimages/tmsologame/img-tm-solo-game.png'

export const TMSoloGame: React.FC = () => {
   return (
      <article>
         <section className="article-section-content">
            <header className="mb-5">
               <div className="w-100 d-flex justify-content-center">
                  <img src={imgTMSoloGame} alt="mars-tm-solo-game" />
               </div>
            </header>
            <p>All rules apply as usual for solo play, with these exceptions:</p>
            <ol>
               <li>
                  Before you choose your cards, place 2 neutral city tiles on the map with an
                  adjacent greenery tile each (these tiles are not yours, and do not increase the
                  oxygen level): reveal and discard the 4 top cards of the deck and use their cost
                  numbers to determine the positions of the tiles. The first city is placed counting
                  from top left to right and down, like reading. Skip any illegal placements (like
                  areas reserved for ocean). For the second city you step backwards from bottom
                  right in the same fashion. Then you place the two greeneries by counting the cost
                  numbers and stepping clockwise around each city, starting from top left, skipping
                  illegal placements. Special case: If you choose to play Tharsis Republic this
                  game, you get M€ production for the 2 neutral cities even though they are placed
                  before you reveal your corporation.
               </li>
               <li>
                  Start with a terraform rating of 14 instead of 20 (marked 'solo' on the track) and
                  without the extra production of resources decribed for the standard game.
               </li>
               <li>Awards and Milestones are not used.</li>
               <li>
                  You have a neutral opponent that you can steal from, or reduce any kind of
                  resources and production from.
               </li>
               <li>
                  You always play 14 generations (marked 'solo'). In order to win, you need to
                  complete terraforming (i.e making the three global parameters reach their goal)
                  before the end of generation 14. After generation 14, you may convert plants into
                  greenery tiles, following normal rules but without raising the oxygen, and finally
                  you score VPs to get as high a score as possible. If you have not completed
                  terraforming by the end of generation 14, you lose.
               </li>
            </ol>
            <div className="d-flex justify-content-center">
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
