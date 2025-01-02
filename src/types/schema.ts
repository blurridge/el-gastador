import { RESPONSE_STATUS } from '@/utils/constants';
import { z } from 'zod';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { categories, transactions, userProfiles } from '@/db/schema';

// User Schemas

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(2, { message: 'Password must be at least 2 characters.' }),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const ResponseSchema = z.object({
    status: z.enum([RESPONSE_STATUS.SUCCESS, RESPONSE_STATUS.FAIL]),
    message: z.string(),
    data: z.any().nullable(),
});

export type ResponseType = z.infer<typeof ResponseSchema>;

export const GetProfileSchema = z.object({
    id: z.string().uuid({ message: 'Invalid UUID' }),
});

export type GetProfileType = z.infer<typeof GetProfileSchema>;

export const UserProfileSchema = createSelectSchema(userProfiles);
export const UserProfileInsertSchema = createInsertSchema(userProfiles);
export const UserProfileUpdateSchema = createUpdateSchema(userProfiles);

export type UserProfileType = z.infer<typeof UserProfileSchema>;
export type UserProfileInsertType = z.infer<typeof UserProfileInsertSchema>;
export type UserProfileUpdateType = z.infer<typeof UserProfileUpdateSchema>;

export const PartialUpdateUserProfileSchema = z.object({
    id: z.string().uuid({ message: 'Invalid UUID' }),
    email: z.string().email({ message: 'Invalid email address' }),
    displayName: z.string().min(2, { message: 'Display name must be at least 2 characters.' }),
});

export type PartialUpdateUserProfileType = z.infer<typeof PartialUpdateUserProfileSchema>;

// Category Schemas

export const GetCategorySchema = z.object({
    id: z.string().uuid({ message: 'Invalid UUID' }),
});

export type GetCategoryType = z.infer<typeof GetCategorySchema>;

export const CategorySchema = createSelectSchema(categories);
export const CategoryInsertSchema = createInsertSchema(categories);
export const CategoryUpdateSchema = createUpdateSchema(categories);

export type CategoryType = z.infer<typeof CategorySchema>;
export type CategoryInsertType = z.infer<typeof CategoryInsertSchema>;
export type CategoryUpdateType = z.infer<typeof CategoryUpdateSchema>;

// Transaction Schemas

export const GetTransactionSchema = z.object({
    id: z.string().uuid({ message: 'Invalid UUID' }),
});

export type GetTransactionType = z.infer<typeof GetTransactionSchema>;

export const TransactionSchema = createSelectSchema(transactions).extend({
    category: CategorySchema.optional(),
});

export const TransactionInsertSchema = createInsertSchema(transactions);
export const TransactionUpdateSchema = createUpdateSchema(transactions);

export type TransactionType = z.infer<typeof TransactionSchema>;
export type TransactionInsertType = z.infer<typeof TransactionInsertSchema>;
export type TransactionUpdateType = z.infer<typeof TransactionUpdateSchema>;

export const PartialTransactionSchema = z.object({
    id: z.optional(z.string().uuid({ message: 'Invalid transaction UUID' })),
    categoryId: z.string().uuid({ message: 'Invalid category UUID' }),
    userId: z.string().uuid({ message: 'Invalid user UUID' }),
    amount: z.string({ message: 'Amount must be casted to string due to Drizzle limitations' }),
    description: z.optional(z.string()),
});

export type PartialTransactionType = z.infer<typeof PartialTransactionSchema>;
