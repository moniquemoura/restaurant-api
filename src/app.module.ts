import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { HomeController } from './home.controller';
import { AuthModule } from '@common/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { ScheduleModule } from '@nestjs/schedule';
import { RoleModule } from './role/role.module';

import { DatabaseModule } from '@common/database.module';
import { environments } from './environments';
import { AppointmentsModule } from '@api/restaurant/appointments/appointments.module';
import { MenuModule } from '@api/restaurant/menu/menu.module';
import { ClientModule } from '@api/restaurant/client/client.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: environments[process.env.NODE_ENV] || '.env',
    }),
    UserModule,
    AuthModule,
    RoleModule,
    DatabaseModule,
    AppointmentsModule,
    MenuModule,
    ClientModule,
  ],
  controllers: [HomeController],
})
export class AppModule {}
