import {ICharacter, IEpisode, IFetchCharactersResponse, IFetchEpisodesResponse, ILocation} from './interfaces';

export interface IApiService {
  retrieveCharacters: (page: number) => Promise<IFetchCharactersResponse>;
  retrieveCharactersByIds: (ids: number[]) => Promise<ICharacter[]>;
  retrieveEpisodes: (page: number) => Promise<IFetchEpisodesResponse>;
  retrieveAllEpisodes: () => Promise<IEpisode[]>;
  retrieveLocation: (locationId: number) => Promise<ILocation>;
}
