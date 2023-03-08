import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Role, Roles } from '@common/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Roles(Role.MASTER)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Roles(Role.MASTER)
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  async findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return await this.roleService.findAllWithCount({
      skip: skip || undefined,
      take: take || undefined,
    });
  }

  @Roles(Role.MASTER)
  @Get(':id')
  findOne(@Param('id') id?: number) {
    return this.roleService.findOne({ id });
  }

  @Roles(Role.MASTER)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  @Roles(Role.MASTER)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove({ id });
  }
}
