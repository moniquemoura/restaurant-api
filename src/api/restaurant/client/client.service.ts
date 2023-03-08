import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/prisma.service';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: Prisma.ClientCreateInput): Promise<Client> {
    const { name, doc, email } = createClientDto;
    return this.prisma.client.create({
      data: { name, doc, email },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientWhereUniqueInput;
    where?: Prisma.ClientWhereInput;
    orderBy?: Prisma.ClientOrderByWithRelationInput;
  }): Promise<Client[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    ClientWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    return this.prisma.client.findUniqueOrThrow({
      where: ClientWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUpdateInput;
  }): Promise<Client> {
    const { where, data } = params;
    return this.prisma.client.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({
      where,
    });
  }
}
