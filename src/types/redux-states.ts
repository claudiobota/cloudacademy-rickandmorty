import {ICharacter, IEpisode, ILocation} from './interfaces';

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

export interface EpisodeState {
  items: IEpisode[];
  status: string;
  error: any;
}

export interface StoreState {
  character: CharacterState;
  episode: EpisodeState;
}

export interface LocationState {
  selected: ILocation;
  residents: ICharacter[];
}
