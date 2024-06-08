import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export const DrizzleProvider: Provider = {
  provide: 'drizzleDatabase',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const connectionString = configService.get('SUPABASE_DB_URL');

    console.log(connectionString);

    const client = await postgres(connectionString, {
      prepare: false,
    });

    return drizzle(client);
  },
};
