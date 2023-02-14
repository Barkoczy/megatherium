import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from './../prisma/prisma.service';

@Module({
  providers: [AuthResolver, AuthService, JwtService, PrismaService],
})
export class AuthModule {}
