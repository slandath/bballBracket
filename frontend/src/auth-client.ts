import { inferAdditionalFields } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/vue'

export const authClient = createAuthClient({
  baseURL: '/api/auth',
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: 'string',
        },
      },
    }),
  ],
})
