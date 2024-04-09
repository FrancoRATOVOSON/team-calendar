import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Action } from '../../action/entities/action.entity';

@Entity()
@Unique(['name'])
export class TypeAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Action, (action) => action.type)
  actions: Action[];
}
