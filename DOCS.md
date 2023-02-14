# NextJS

## Disable telemetry

```bash
https://nextjs.org/telemetry
```

https://nextjs.org/telemetry

# Prisma

## Setup

As a first step, navigate into server project directory that contains the package.json file.

Next, add the Prisma CLI as a development dependency to your project:

```bash
npm install prisma --save-dev
```

Next, set up your Prisma project by creating your Prisma schema file template with the following command:

```bash
npx prisma init
```

Create user model in prisma schema:

```bash
model User {
  id Int @id @default(autoincrement())
  firstname String
  lastname String
  middlename String?
  fullname String
  email String
  password String
  refreshToken String?
  updatedAt DateTime @default(now())
  createdAt DateTime @default(now())
}
```

Create the first migration:

```bash
npx prisma migrate dev --name init
```

# NestJS

#### Setup

Setting up a new project is quite simple with the Nest CLI. With npm installed, you can create a new Nest project with the following commands in your OS terminal:

```bash
npm i -g @nestjs/cli
```

```bash
nest new server -g
```

Provide user the option to skip git initialization.
<https://github.com/nestjs/nest-cli/issues/232>

### GraphQL

Start by installing the required packages

```bash
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

configure file '@server/src/app.module.ts':

```bash
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: 'production' === process.env.NODE_ENV ? false : true,
      playground: 'production' === process.env.NODE_ENV ? false : true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### Fix endline error issues

In .eslintrc.json file, you should configure rules option. Add the following configuration and it will fix the problem.

```bash
'prettier/prettier': ['error', { 'endOfLine': 'auto' }]
```

<https://stackoverflow.com/questions/70473135/delete-eslintprettier-prettier>

### How to fix "running scripts is disabled on this system"?

Open PowerShell with Run as Administrator. Then, run this command in PowerShell:

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

<https://stackoverflow.com/questions/64633727/how-to-fix-running-scripts-is-disabled-on-this-system>

#### Install and generate Prisma Client

```bash
npm install @prisma/client
```

#### Use Prisma Client in your NestJS services

Create a new PrismaService that takes care of instantiating PrismaClient and connecting to your database.

More info: <https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services>

Generate prisma service:

```bash
nest g service prisma
```

Inside the src directory, create a new file called prisma.service.ts and add the following code to it:

```bash
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```