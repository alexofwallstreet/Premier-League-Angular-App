import {Player} from "./Player";

export interface Team {
  id: number,
  name: string,
  manager: string,
  stadium: string,
  logo: string,
  players: Player[] | null,
  is_favorite: {
    id: number | null,
    exists: boolean
  }
}
