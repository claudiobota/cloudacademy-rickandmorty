import config from '../configuration/config';
import {IApiService} from '../types/services';
import {IEpisode, IFetchCharactersResponse, IFetchEpisodesResponse} from '../types/interfaces';

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
  retrieveCharacters: page => new Promise<IFetchCharactersResponse>((resolve, reject) => {
    fetch(`${config.api.url}/${config.api.paths.characters}/?page=${page}`)
      .then(response => response.json())
      .then(response => resolve(response))
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
  })
}

export default ApiService;
