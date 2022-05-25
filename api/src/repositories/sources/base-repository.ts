export interface AbstractRepository<M> {
    find(pkValue: string): Promise<M | null>;
    fetch(pkValue: string): Promise<M | null>;
    search(criteria?: Partial<M> | null): Promise<M[]>;
    delete(entity: M): Promise<void>;
    deleteList(entities: M[]): Promise<void>;
    persist(entity: M): Promise<string>;
    persistList(entities: M[]): Promise<string[]>;
  }
  
  export abstract class BaseRepository {}
  