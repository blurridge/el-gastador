import { pgPolicy } from 'drizzle-orm/pg-core';
import { userProfiles } from '../schema';
import { sql } from 'drizzle-orm';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const userProfilesPolicy = pgPolicy('user_profiles_policy', {
    for: 'all',
    to: authenticatedRole,
    using: sql`${userProfiles}.id = auth.uid()`,
    withCheck: sql`${userProfiles}.id = auth.uid()`,
}).link(userProfiles);
