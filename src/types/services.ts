import {IFetchCharactersResponse} from './interfaces';

export interface IApiService {
  retrieveCharacters: (page: number) => Promise<IFetchCharactersResponse>;
}
