import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findOne(uuid: string) {
    return this.prismaService.user.findUnique({
      where: { uuid },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      data: updateUserDto,
      where: { uuid },
    });
  }

  async remove(uuid: string) {
    await this.prismaService.user.delete({ where: { uuid } });
  }
}
