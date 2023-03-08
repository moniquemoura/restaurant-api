import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './Dto/CreateUser';
import { UpdateUserDto } from './Dto/UpdateUser';
import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';

import { Role, Roles } from '@common/auth/guards/roles.guard';
import { Prisma } from '@prisma/client';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/users')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);

  constructor(private readonly usuarioRepository: UserRepository) {}

  @ApiConsumes('multipart/form-data')
  @Roles(Role.MASTER)
  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CreateUserDto) {
    try {
      const { name, email, password, roleId } = dadosDoUsuario;
      const role = roleId
        ? {
            role: {
              connect: { id: roleId },
            },
          }
        : {};

      const user = await this.usuarioRepository.createUser({
        name,
        email,
        password,
        ...role,
      });
      // return user;
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (e) {
      if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
        this.logger.error(e);
      }
      throw new HttpException(e?.meta?.cause, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Roles(Role.MASTER)
  @Get()
  async listUsuarios(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return await this.usuarioRepository.usersWithCount({
      skip: skip || undefined,
      take: take || undefined,
    });
  }

  @ApiBearerAuth()
  @Roles(Role.MASTER)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.usuarioRepository.getUser({ id });
  }

  @ApiConsumes('multipart/form-data')
  @Roles(Role.MASTER)
  @Put(':id')
  async editUser(
    @Param('id') id: number,
    @Body() dadosDoUsuario: UpdateUserDto,
  ) {
    const { name, email, password, roleId } = dadosDoUsuario;
    const role = roleId
      ? {
          role: {
            connect: { id: roleId },
          },
        }
      : {};
    try {
      const user = await this.usuarioRepository.updateUser({
        where: { id },
        data: {
          name,
          email,
          password,
          ...role,
        },
      });
      return {
        user,
        mensagem: 'usuário atualizado com sucesso',
      };
    } catch (e) {
      if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
        this.logger.error(e);
      }
      throw new HttpException(e?.meta?.cause, HttpStatus.BAD_REQUEST);
    }
  }

  @Roles(Role.MASTER)
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try {
      const user = await this.usuarioRepository.deleteUser({ id });
      return {
        id: user.id,
        mensagem: 'usuário removido com sucesso',
      };
    } catch (e) {
      if (e.code === 'P2025') {
        throw new HttpException(
          'Usuário não encontrado',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(e?.meta?.cause, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
