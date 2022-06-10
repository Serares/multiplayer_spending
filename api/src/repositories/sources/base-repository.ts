import { DeleteResult } from "typeorm";

export interface AbstractRepository<M> {
  find(pkValue: number): Promise<M | null>;
  fetch(pkValue: number): Promise<M | null>;
  search(criteria?: Partial<M> | null): Promise<M[]>;
  delete(pkValue: number): Promise<void>;
  deleteList(entities: M[]): Promise<void>;
  persist(entity: M): Promise<string>;
  persistList(entities: M[]): Promise<string[]>;
}

export abstract class BaseRepository {}
