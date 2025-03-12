import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'john Doe',
      email: 'johndoe@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Tim',
      email: 'tim@example.com',
      role: 'admin',
    },
    {
      id: 3,
      name: 'Nathan',
      email: 'nathan@example.com',
      role: 'intern',
    },
    {
      id: 4,
      name: 'Bear Grills',
      email: 'beargrills@example.com',
      role: 'engineer',
    },
    {
      id: 5,
      name: 'Michel Jonson',
      email: 'micheljonson@example.com',
      role: 'engineer',
    },
  ];

  findAll(role?: 'intern' | 'engineer' | 'admin') {
    if (role && role !== 'intern' && role !== 'engineer' && role !== 'admin') {
        throw new NotFoundException("Role not found")
    }
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHigestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: userByHigestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
