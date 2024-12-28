import { RESPONSE_STATUS } from '@/utils/constants';
import { z } from 'zod'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { userProfiles } from '@/db/schema';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, { message: 'Password must be at least 2 characters.' })
})

export type LoginType = z.infer<typeof LoginSchema>;

export const ResponseSchema = z.object({
  status: z.enum([RESPONSE_STATUS.SUCCESS, RESPONSE_STATUS.FAIL]),
  message: z.string(),
  data: z.any().nullable()
});

export type ResponseType = z.infer<typeof ResponseSchema>;

export const GetProfileSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" })
})

export type GetProfileType = z.infer<typeof GetProfileSchema>;

export const UserProfileSchema = createSelectSchema(userProfiles)
export const UserProfileInsertSchema = createInsertSchema(userProfiles);
export const UserProfileUpdateSchema = createUpdateSchema(userProfiles);

export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserProfileInsertType = z.infer<typeof UserProfileInsertSchema>;
export type UserProfileUpdateType = z.infer<typeof UserProfileUpdateSchema>;

export const PartialUpdateUserProfileSchema = z.object({
  id: z.string().uuid({ message: "Invalid UUID" }),
  email: z.string().email({ message: "Invalid email address" }),
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }),
})

export type PartialUpdateUserProfileType = z.infer<typeof PartialUpdateUserProfileSchema>
