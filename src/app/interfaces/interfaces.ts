export interface Character {
  id: string;
  name: string;
  class: string;
  active?: boolean;
}

export interface Event {
  id: string;
  title: string;
  order: number;
  eventId?: number;
  type?: string;
  number?: number;
  party?: string[];
  text?: string;
  rewards?: string;
  icon?: string;
  choice?: string;
  outcome?: string;
  summary?: string;
}

export interface User {
  id: string;
  name: string;
  isAdmin?: boolean;
}
