import imgMars from '../assets/images/pageimages/home/img-about.png'

export const About: React.FC = () => {
   return (
      <article>
         <section className="article-section-content">
            <header className="mb-5">
               <h1 className="text-center">TERRAFORMING MARS SOLO</h1>
            </header>
            <img
               src={imgMars}
               alt="mars-half"
               height="215"
               className="me-3 mb-3"
               style={{ float: 'left' }}
            />
            <p>
               In the 2400s, mankind begins to terraform the planet Mars. Giant corporations,
               sponsored by the World Government on Earth, initiate huge projects to raise the
               temperature, the oxygen level, and the ocean coverage until the environment is
               habitable. In Terraforming Mars, you play one of those corporations and work together
               in the terraforming process, but compete for getting victory points that are awarded
               not only for your contribution to the terraforming, but also for advancing human
               infrastructure throughout the solar system, and doing other commendable things.
            </p>
            <p>
               The player acquire unique project cards (from over two hundred different ones) by
               buying them to their hand. The projects (cards) can represent anything from
               introducing plant life or animals, hurling asteroids at the surface, building cities,
               to mining the moons of Jupiter and establishing greenhouse gas industries to heat up
               the atmosphere. The cards can give you immediate bonuses, as well as increasing your
               production of different resources. Many cards also have requirements and they become
               playable when the temperature, oxygen, or ocean coverage increases enough. Buying
               cards is costly, so there is a balance between buying cards (3 megacredits per card)
               and actually playing them (which can cost anything between 0 to 41 megacredits,
               depending on the project). Standard Projects are always available to complement your
               cards.
            </p>
            <p>
               Your basic income, as well as your basic score, is based on your Terraform Rating
               (starting at 14), which increases every time you raise one of the three global
               parameters. However, your income is complemented with your production, and you also
               get VPs from many other sources.
            </p>
            <p>
               A player keeps track of his production and resources on his player board, and the
               game uses six types of resources: MegaCredits, Steel, Titanium, Plants, Energy, and
               Heat. On the game board, you compete for the best places for your city tiles, ocean
               tiles, and greenery tiles. Each round is called a generation (guess why) and consists
               of the following phases:
            </p>
            <ol>
               <li>Research phase: player buy cards from four drawn.</li>
               <li>
                  Action phase: Player does actions from these options: Playing a card, using a
                  Standard project, converting plant into greenery tiles (and raising oxygen),
                  converting heat into a temperature raise, and using the action of a card in play.
                  The turn continues until a player have passed.
               </li>
               <li>
                  Production phase: Player get resources according to his terraform rating and
                  production parameters.
               </li>
            </ol>
            <p>
               When the 14th generation is complete, the terraforming is complete and if all three
               global parameters (temperature, oxygen, ocean) are maxed, you won, otherwise you
               lost. Count your Terraform Rating and other VPs to determine the winning corporation!
            </p>
         </section>
      </article>
   )
}
