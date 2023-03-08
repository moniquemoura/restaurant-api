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
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';
import { Role, Roles } from '@common/auth/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Version('1')
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  findAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.menuService.findAll({
      skip: skip || undefined,
      take: take || undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update({
      where: { id },
      data: updateMenuDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.MASTER, Role.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.menuService.remove({ id });
  }
}
