import config from '../configuration/config';
import {IApiService} from '../types/services';
import {ICharacter, IEpisode, IFetchCharactersResponse, IFetchEpisodesResponse, ILocation} from '../types/interfaces';

const retrieveEpisodes = (page: number) => new Promise<IFetchEpisodesResponse>((resolve, reject) => {
  fetch(`${config.api.url}/${config.api.paths.episodes}/?page=${page}`)
    .then(response => response.json())
    .then(response => resolve(response))
    .catch(error => {
      console.error(error);
      reject(error);
    });
});

const ApiService: IApiService = {
  retrieveCharacters: (page) => new Promise<IFetchCharactersResponse>((resolve, reject) => {
    const queryObject: any = {};

    if (page > -1) {
      queryObject.page = page;
    }

    let queryString = Object.keys(queryObject).map(key => `${key}=${queryObject[key]}`).join('&');

    if (queryString.length > 0) {
      queryString = `?${queryString}`;
    }

    fetch(`${config.api.url}/${config.api.paths.characters}/${queryString}`)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  }),
  retrieveCharactersByIds: (ids = []) => new Promise<ICharacter[]>((resolve, reject) => {
    if (ids.length === 0) {
      resolve([]);
      return;
    }

    fetch(`${config.api.url}/${config.api.paths.characters}/${ids.join(',')}`)
      .then(response => response.json())
      .then(response => {
        if (!Array.isArray(response) && typeof response === 'object') {
          resolve([response]);
        } else {
          resolve(response);
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  }),
  retrieveEpisodes,
  retrieveAllEpisodes: () => new Promise<IEpisode[]>(async (resolve, reject) => {
    let episodes: IEpisode[] = [];
    let page = 1;

    const fetchEpisodes = async (): Promise<IFetchEpisodesResponse> => {
      let response = await retrieveEpisodes(page);
      const results = response.results || [];

      if (response.error) {
        reject(response.error);
        return {};
      }

      episodes = [...episodes, ...results];

      return response;
    }

    let info = (await fetchEpisodes()).info;

    while (info && info.next !== null) {
      page += 1;
      info = (await fetchEpisodes()).info;
    }

    resolve(episodes.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }

      if (a.id > b.id) {
        return 1;
      }

      return 0;
    }));
  }),
  retrieveLocation: locationId => new Promise<ILocation>((resolve, reject) => {
    fetch(`${config.api.url}/${config.api.paths.locations}/${locationId}`)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(error => {
        console.error(error);
        reject(error);
      });
  }),
}

export default ApiService;
