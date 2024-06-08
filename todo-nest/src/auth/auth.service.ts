import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async signUp(email: string, password: string) {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(`Error signing up: ${error.message}`);
    }

    return user;
  }

  async signIn(email: string, password: string) {
    const {
      data: { session },
      error,
    } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(`Error signing in: ${error.message}`);
    }

    return session;
  }
}
