import { PrismaService } from '@common/prisma.service';
import { Injectable } from '@nestjs/common';
import { Appointment, Prisma } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAppontmentDto: Prisma.AppointmentCreateInput) {
    const { date, client, location } = createAppontmentDto;
    return this.prisma.appointment.create({
      data: { date, location, client },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppointmentWhereUniqueInput;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appointment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    AppointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<Appointment | null> {
    return this.prisma.appointment.findUniqueOrThrow({
      where: AppointmentWhereUniqueInput,
    });
  }

  async update(params: {
    where: Prisma.AppointmentWhereUniqueInput;
    data: Prisma.AppointmentUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.appointment.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.AppointmentWhereUniqueInput) {
    return this.prisma.appointment.delete({
      where,
    });
  }
}
