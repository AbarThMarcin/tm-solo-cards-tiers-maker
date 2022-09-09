export interface UserInterface {
   _id: string
   name: string
   email: string
   settings: SettingsInterface
   activeMatches: ActiveMatchesInterface
   isAdmin: boolean
   token: string
}

interface SettingsInterface {
   gameSpeed: number
   showTotalVP: true
   handSortId: string
   playedSortId: string
   musicVolume: number
   gameVolume: number
}
interface ActiveMatchesInterface {
   quickMatch: boolean
   quickMatchId: boolean
   ranked: boolean
}