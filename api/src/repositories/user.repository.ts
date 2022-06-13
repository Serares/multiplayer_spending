import { User } from 'src/controllers/graphql/entities/User.entity';
import { PostgresRepositoryImpl } from './sources/postgres.repository';

export const userRepository = new PostgresRepositoryImpl<User>('user');
