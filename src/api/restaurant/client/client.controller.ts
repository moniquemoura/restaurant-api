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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';
import { Role, Roles } from '@common/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.clientService.findAll({
      skip: skip || undefined,
      take: take || undefined,
    });
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findOne({ id });
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update({
      where: { id },
      data: updateClientDto,
    });
  }

  @Version('1')
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.remove({ id });
  }
}
