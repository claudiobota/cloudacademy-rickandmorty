import configData from './config.json';
import configDevelopmentData from './config.development.json';
import configTestData from './config.test.json';
import configStagingData from './config.staging.json';
import configProductionData from './config.production.json';
import {IConfig} from '../types/interfaces';
import {Environment} from '../types/enums';

let config: IConfig = {
  ...configData
};

const nodeEnv: string = process.env.NODE_ENV || 'development';

switch (nodeEnv) {
  case Environment.DEVELOPMENT:
    config = {
      ...config,
      ...configDevelopmentData
    };
    break;

  case Environment.TEST:
    config = {
      ...config,
      ...configTestData
    };
    break;

  case Environment.STAGING:
    config = {
      ...config,
      ...configStagingData
    };
    break;

  case Environment.PRODUCTION:
    config = {
      ...config,
      ...configProductionData
    };
    break;

  default:
}

export default config;
