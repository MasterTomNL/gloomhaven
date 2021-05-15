export interface Character {
  id: string;
  name: string;
  class: string;
  gender: string;
  race: string;
  avatar: string;
  active: boolean;
}

export interface Event {
  id: string;
  title: string;
  order: number;
  type?: string;
  number?: number;
  characters?: string;
  description?: string;
  outcome?: string;
}
