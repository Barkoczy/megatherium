import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '../.env'),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: 'production' === process.env.NODE_ENV ? false : true,
      playground: 'production' === process.env.NODE_ENV ? false : true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
