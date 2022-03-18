import {Player} from "./Player";
import {Team} from "./Team";
import {EventType} from "./EventType";

export interface GameEvent {
  id?: number,
  event_type: EventType,
  player_id: number,
  team_id: number,
  minute: number,
  description?: string
}
