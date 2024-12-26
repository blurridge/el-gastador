import { RESPONSE_STATUS } from '@/utils/constants';
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: 'Password must be at least 2 characters.' })
})

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const ResponseSchema = z.object({
  status: z.enum([RESPONSE_STATUS.SUCCESS, RESPONSE_STATUS.FAIL]),
  message: z.string(),
  data: z.any().nullable()
});

export type ResponseSchemaType = z.infer<typeof ResponseSchema>;

export const GetProfileSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" })
})

export type GetProfileSchemaType = z.infer<typeof GetProfileSchema>;
