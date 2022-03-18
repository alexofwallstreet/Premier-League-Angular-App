import {MatchEvent} from "./MatchEvent";
import {GameEvent} from "./GameEvent";
import {Team} from "./Team";

export interface Match {
  id: number,
  is_started: boolean,
  is_finished: boolean,
  home_team: Team,
  away_team: Team,
  stadium: {
    id: number,
    capacity: number,
    city: string,
    name: string
  },
  date: string,
  stats: {
    goals_home_team: number,
    goals_away_team: number
  } | null,
  match_events: MatchEvent[] | null,
  game_events: GameEvent[] | null
}
