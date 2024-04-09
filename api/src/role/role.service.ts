import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('RoleService');
  }
  create(createRoleDto: CreateRoleDto): Promise<Role> {
    this.loggerService.log('Create role');
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOne(id: number): Promise<Role> {
    return this.getRole(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRole(id);
    Object.assign(role, updateRoleDto);
    this.loggerService.log('Role updated');
    return this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.getRole(id);
    await this.roleRepository.delete(role.id);
    this.loggerService.log('Role deleted');
    return { message: 'Role deleted' };
  }

  private async getRole(id: number): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id });
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  }
}
