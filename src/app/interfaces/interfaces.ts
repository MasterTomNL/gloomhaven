export interface Character {
  id: string;
  name: string;
  classIcon: string;
  className: string;
  img: string;
  active?: boolean;
}

export interface Event {
  id: string;
  title: string;
  order: number;
  type?: string;
  number?: number;
  party?: string;
  text?: string;
  outcome?: string;
  icon?: string;
}
