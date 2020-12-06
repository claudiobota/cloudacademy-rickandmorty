import {IEpisode, IFetchCharactersResponse, IFetchEpisodesResponse} from './interfaces';

export interface IApiService {
  retrieveCharacters: (page: number) => Promise<IFetchCharactersResponse>;
  retrieveEpisodes: (page: number) => Promise<IFetchEpisodesResponse>;
  retrieveAllEpisodes: () => Promise<IEpisode[]>;
}
