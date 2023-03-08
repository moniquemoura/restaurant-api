import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma.service';
import { Menu, Prisma } from '@prisma/client';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMenuDto: Prisma.MenuCreateInput) {
    const { name, price, photo, ingredients } = createMenuDto;
    return this.prisma.menu.create({
      data: { name, price, photo, ingredients },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MenuWhereUniqueInput;
    where?: Prisma.MenuWhereInput;
    orderBy?: Prisma.MenuOrderByWithRelationInput;
  }): Promise<Menu[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.menu.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    MenuWhereUniqueInput: Prisma.MenuWhereUniqueInput,
  ): Promise<Menu | null> {
    return this.prisma.menu.findUniqueOrThrow({
      where: MenuWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.MenuWhereUniqueInput;
    data: Prisma.MenuUpdateInput;
  }): Promise<Menu> {
    const { where, data } = params;
    return this.prisma.menu.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.MenuWhereUniqueInput): Promise<Menu> {
    return this.prisma.menu.delete({
      where,
    });
  }
}
