import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../jwt.auth.guard';

export const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};
