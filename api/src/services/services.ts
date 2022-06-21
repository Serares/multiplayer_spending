import { UserService } from './users/users.service';

const userService = new UserService();

export const services = {
  userService,
};

export type GQLServices = typeof services;
