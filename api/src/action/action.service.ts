import { Injectable } from '@nestjs/common';
import { CreateActionDto } from './dto/create-action.dto';
import { UpdateActionDto } from './dto/update-action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { Action } from './entities/action.entity';
import { User } from '../user/entities/user.entity';
import { TypeAction } from '../type-action/entities/type-action.entity';

@Injectable()
export class ActionService {
  constructor(
    @InjectRepository(Action)
    private actionRepository: Repository<Action>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TypeAction)
    private typeActionRepository: Repository<TypeAction>,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('ActionService');
  }

  async create(createActionDto: CreateActionDto): Promise<Action> {
    const user = await this.getUser(createActionDto.userId);
    const type = await this.getTypeAction(createActionDto.typeId);
    const action = this.actionRepository.create({
      ...createActionDto,
      user,
      type,
    });
    this.loggerService.log('Action created');
    return this.actionRepository.save(action);
  }

  findAll(): Promise<Action[]> {
    return this.actionRepository.find();
  }

  findOne(id: number): Promise<Action> {
    return this.getAction(id);
  }

  async update(id: number, updateActionDto: UpdateActionDto) {
    const action = await this.getAction(id);
    if (updateActionDto.userId) {
      action.user = await this.getUser(updateActionDto.userId);
    }
    if (updateActionDto.typeId) {
      action.type = await this.getTypeAction(updateActionDto.typeId);
    }
    Object.assign(action, updateActionDto);
    this.loggerService.log('Action updated');
    return this.actionRepository.save(action);
  }

  async remove(id: number) {
    const action = await this.getAction(id);
    await this.actionRepository.delete(action.id);
    this.loggerService.log('Action deleted');
    return { message: 'Action deleted' };
  }

  private async getAction(id: number): Promise<Action> {
    const action = await this.actionRepository.findOneBy({ id });
    if (!action) {
      throw new Error('Action not found');
    }
    return action;
  }

  private async getUser(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  private async getTypeAction(typeActionId: number): Promise<TypeAction> {
    const typeAction = await this.typeActionRepository.findOne({
      where: { id: typeActionId },
    });
    if (!typeAction) {
      throw new Error('TypeAction not found');
    }
    return typeAction;
  }
}
