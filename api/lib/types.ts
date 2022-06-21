import { GQLServices } from 'src/services/services';

export interface MyContext {}

export type GQLContext = {
  reqHeaders: any;
  services: GQLServices;
};
