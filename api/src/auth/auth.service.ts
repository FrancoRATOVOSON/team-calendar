import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext('AuthService');
  }

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(signInDto.email);
    const isMatch = await bcrypt.compare(
      signInDto.password,
      user.getPassword(),
    );
    if (!isMatch) {
      this.loggerService.error('Invalid credentials');
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    this.loggerService.log('User signed in');
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
