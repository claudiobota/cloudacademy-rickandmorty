import {ICharacter} from './interfaces';

export interface CharacterState {
  items: ICharacter[];
  selectedItem: ICharacter|null;
  status: string;
  error: any;
  next: string|null;
  prev: string|null;
  count: number;
  pages: number;
  page: number;
}

export interface StoreState {
  character: CharacterState;
}
