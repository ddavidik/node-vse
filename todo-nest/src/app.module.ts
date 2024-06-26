import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthGuardProvider } from './auth/providers/auth-guard.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodoModule,
    DatabaseModule,
    AuthModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuardProvider],
})
export class AppModule {}
