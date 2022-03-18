import {EventType} from "./EventType";

export interface MatchEvent {
  id?: number,
  event_type: EventType,
  minute: number,
  description?: string
}
