import { Module } from '@nestjs/common';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeesModule,
    ThrottlerModule.forRoot([
      {
        name:"sort",
        ttl: 1000, // 1 seconds
        limit: 3, // 10 requests
      },
      {
        name:"long",
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests
      }
    ]),
    MyLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
