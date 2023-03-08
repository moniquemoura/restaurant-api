import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';
import { Role, Roles } from '@common/auth/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiBearerAuth()
@ApiTags('appointments')
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const { date, delivery, location, clientId } = createAppointmentDto;
    return this.appointmentsService.create({
      date,
      delivery,
      location,
      client: {
        connect: { id: clientId },
      },
    });
  }

  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.appointmentsService.findAll({
      skip: skip || undefined,
      take: take || undefined,
    });
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appointmentsService.findOne({ id });
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentsService.remove({ id });
  }
}
