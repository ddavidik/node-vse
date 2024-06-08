import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  clientPrefix: 'VITE_PUBLIC_',

  client: {
    VITE_PUBLIC_API_URL: z.string().min(1),
  },

  runtimeEnv: {
    VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
  },
});
