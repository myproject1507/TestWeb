import { Config } from 'src/app/models/config';

export const environment = {
  production: true,
  siteUrl: Config.prodSiteUrl,
  apiUrl: Config.prodApiUrl,
  basicAuthenticationCredentials: Config.prodBasicAuthenticationCredentials
};
