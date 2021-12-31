import { Module } from '@nestjs/common';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { AuthService } from './auth.services'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity'
import { UsersController } from './users.controller'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
@Module({
  imports: [TypeOrmModule.forFeature([User])],


  controllers: [UsersController],
providers: [
   
      UsersService,
  AuthService,
  {provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor
  }
  ],
  exports: [TypeOrmModule.forFeature([User]), UsersService]
})
export class UserModule {}