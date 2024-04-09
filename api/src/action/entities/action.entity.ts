import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeAction } from '../../type-action/entities/type-action.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  description: string;

  @ManyToOne(() => TypeAction)
  @JoinColumn()
  type: TypeAction;

  @ManyToOne(() => User, (user) => user.actions)
  user: User;
}
