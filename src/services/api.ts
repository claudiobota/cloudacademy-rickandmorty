import config from '../configuration/config';
import {IApiService} from '../types/services';
import {ICharacter, IFetchCharactersResponse} from '../types/interfaces';

const ApiService: IApiService = {
  retrieveCharacters: page => new Promise<IFetchCharactersResponse>((resolve, reject) => {
    fetch(`${config.api.url}/${config.api.paths.characters}/?page=${page}`)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  })
}

export default ApiService;
