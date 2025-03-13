import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'intern' | 'engineer' | 'admin') {
    if (role && role !== 'intern' && role !== 'engineer' && role !== 'admin') {
        throw new NotFoundException("Role not found")
    }

    if(role){
      return this.databaseService.employee.findMany({
        where: {
          role: role,
        },
      });
    }

   return this.databaseService.employee.findMany();
    
  }

  async findOne(id: number) {
    if(!id){
      throw new NotFoundException("Id not found")
    }
    return this.databaseService.employee.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    if(!id){
      throw new NotFoundException("Id not found")
    }
    return this.databaseService.employee.update({
      where: {
        id: id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    if(!id){
      throw new NotFoundException("Id not found")
    }
    return this.databaseService.employee.delete({
      where: {
        id: id,
      },
    });
  }
}
