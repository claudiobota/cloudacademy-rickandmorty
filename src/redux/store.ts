import {configureStore, ConfigureStoreOptions, EnhancedStore} from "@reduxjs/toolkit";
import characterReducer from './slices/characterSlice';
import {StoreState} from '../types/redux-states';
import {Middleware} from 'redux';
import episodeReducer from './slices/episodeSlice';

export function configureAppStore(preloadedState: StoreState|undefined = undefined) {
  const options: ConfigureStoreOptions = {
    reducer: {
      character: characterReducer,
      episode: episodeReducer
    }
  };

  if (preloadedState) {
    options.preloadedState = preloadedState;
  }

  return configureStore<any, any, ReadonlyArray<Middleware<{}, any>>>(options);
}

const store: EnhancedStore<any, any, ReadonlyArray<Middleware<{}, any>>> = configureAppStore();

export default store;
