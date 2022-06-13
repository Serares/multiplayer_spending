import { fetchSecretArn } from 'lib/fetchSecretsArn';
import { Category } from 'src/controllers/graphql/entities/Category.entity';
import { Transaction } from 'src/controllers/graphql/entities/Transaction.entity';
import { User } from 'src/controllers/graphql/entities/User.entity';
import {
  DataSource,
  DataSourceOptions,
  DeleteResult,
  EntityTarget,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { AuroraPostgresConnectionOptions } from 'typeorm/driver/aurora-postgres/AuroraPostgresConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AbstractRepository, BaseRepository } from './base-repository';

export interface PostgresRepository<M> extends AbstractRepository<M> {
  find(pkValue: number): Promise<M | null>;
  fetch(pkValue: number): Promise<M | null>;
  delete(pkValue: number): Promise<void>;
  search(criteria?: Partial<M> | null): Promise<M[]>;
  deleteList(entities: M[]): Promise<void>;
  persist(entity: M): Promise<string>;
  persistList(entities: M[]): Promise<string[]>;
  disconnect(): Promise<void>;
}

export class PostgresRepositoryImpl<M>
  extends BaseRepository
  implements PostgresRepository<M>
{
  private dataSource: DataSource;
  private entityRepository: Repository<M>;

  private readonly entity: EntityTarget<M>;
  private static readonly SUPORTED_ENTITIES = {
    transaction: Transaction,
    user: User,
    category: Category,
  };
  constructor(private entityName: string, protected pkColumn = 'id') {
    super();
    this.entity = PostgresRepositoryImpl.SUPORTED_ENTITIES[entityName];
    this.connect();
  }

  private async connect(): Promise<void> {
    const isLogging = process.env.POSTGRES_LOGGING === 'true';
    let connection;
    //@ts-ignore TODO
    let connectionOptions: DataSourceOptions = {
      type: process.env.POSTGRES_CONNECTION as
        | PostgresConnectionOptions['type']
        | AuroraPostgresConnectionOptions['type'],
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      logging: isLogging,
      entities: Object.values(PostgresRepositoryImpl.SUPORTED_ENTITIES),
    };
    if (connectionOptions.type === 'postgres') {
      connection = new DataSource({
        ...connectionOptions,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
      });
    } else if (connectionOptions.type === 'aurora-postgres') {
      const secretArn = await fetchSecretArn();

      connection = new DataSource({
        ...connectionOptions,
        resourceArn: process.env.POSTGRES_RESOURCE_ARN as string,
        region: process.env.POSTGRES_REGION as string,
        secretArn,
      });
    } else {
      console.error('No connection type found');
    }

    this.dataSource = connection;
    this.entityRepository = connection.getRepository(this.entity);
  }

  disconnect(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async find(pkValue: number): Promise<M | null> {
    const entity = await this.entityRepository.findOneBy({
      [this.pkColumn]: pkValue,
    } as FindOptionsWhere<M>);

    return entity;
  }

  fetch(pkValue: number): Promise<M | null> {
    throw new Error('Method not implemented.');
  }
  async search(criteria?: Partial<M> | null): Promise<M[]> {
    const entities = await this.entityRepository.find();

    return entities;
  }
  async delete(pkValue: number): Promise<void> {
    await this.entityRepository.delete(pkValue);
  }
  deleteList(entities: M[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async persist(entity: M): Promise<string> {
    const newEntity = await this.entityRepository.save(entity);

    return newEntity[this.pkColumn];
  }
  persistList(entities: M[]): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
}
