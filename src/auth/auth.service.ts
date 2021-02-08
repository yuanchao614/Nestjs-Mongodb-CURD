import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
        ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUserByName(username);
        if (user && user.passWord === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

      async login(user: any) {
        const payload = { username: user.userName, sub: user._id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
