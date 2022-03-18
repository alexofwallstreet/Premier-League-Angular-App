import {Position} from "./Position";

export interface Player {
  id: number,
  name: string,
  surname: string,
  team: {
    id: number,
    name: string
  },
  position: Position
}

