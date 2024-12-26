import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: 'Password must be at least 2 characters.' })
})

export type loginSchemaType = z.infer<typeof loginSchema>;
