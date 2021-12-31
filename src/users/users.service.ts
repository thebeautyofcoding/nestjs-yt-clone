import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, username: string, password): Promise<User> {
    const user = this.repo.create({ email, password, username });

    return this.repo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async find(email: string): Promise<User[]> {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne(id, { relations: ['videos'] });
  }
}
