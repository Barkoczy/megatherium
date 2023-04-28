import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaService } from './../prisma/prisma.service';
import { SignUpInput } from './dto/signup.input';
import { SignInInput } from './dto/signin.input';
import { UpdateAuthInput } from './dto/update-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(signUpInput: SignUpInput) {
    const password = await argon.hash(signUpInput.password);
    const user = await this.prisma.user.create({
      data: {
        email: signUpInput.email,
        username: signUpInput.username,
        password,
      },
    });
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInInput.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const doPasswordsMatch = await argon.verify(
      user.password,
      signInInput.password,
    );
    if (!doPasswordsMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  async createTokens(userId: number, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: { not: null },
      },
      data: {
        refreshToken: null,
      },
    });
    return { loggedOut: true };
  }

  async getNewTokens(userId: number, currentRefreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const doRefreshTokensMatch = await argon.verify(
      user.refreshToken,
      currentRefreshToken,
    );
    if (!doRefreshTokensMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }
}
