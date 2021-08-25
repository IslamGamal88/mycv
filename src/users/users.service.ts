import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  find(email: string) {
    return this.repo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const foundUser = await this.repo.findOne(id);
    if (!foundUser) {
      throw new NotFoundException('user not found');
    }
    const newUser = Object.assign(foundUser, attrs);

    return this.repo.save(newUser);
  }

  async remove(id: number) {
    const foundUser = await this.repo.findOne(id);
    if (!foundUser) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(foundUser);
  }
}
