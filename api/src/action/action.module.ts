import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { LoggerService } from '../logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from './entities/action.entity';
import { User } from '../user/entities/user.entity';
import { TypeAction } from '../type-action/entities/type-action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Action, User, TypeAction])],
  controllers: [ActionController],
  providers: [ActionService, LoggerService],
})
export class ActionModule {}
