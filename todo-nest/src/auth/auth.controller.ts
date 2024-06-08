import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/pipe/zodPipe';
import { SignUpDto, signUpSchema } from './dto/signup.dto';
import { SignInDto, signInSchema } from './dto/signin.dto';
import { Public } from './isPublic';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(new ZodPipe(signUpSchema)) body: SignUpDto) {
    try {
      const { email, password } = body;

      return await this.authService.signUp(email, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signin')
  async signIn(@Body(new ZodPipe(signInSchema)) body: SignInDto) {
    try {
      const { email, password } = body;

      return await this.authService.signIn(email, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
