import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  creationDate?: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  lastModificationDate?: Date;
}
