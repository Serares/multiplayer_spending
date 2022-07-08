import { User } from 'src/repositories/entities/User.entity';
import { PostgresRepositoryImpl } from './sources/postgres.repository';

export const userRepository = new PostgresRepositoryImpl<User>('user');
