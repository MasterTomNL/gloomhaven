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
  party?: string;
  text?: string;
  outcome?: string;
  icon?: string;
  visible?: boolean;
}

export interface User {
  id: string;
  name: string;
  isAdmin?: boolean;
}
