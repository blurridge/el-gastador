import { pgPolicy } from 'drizzle-orm/pg-core';
import { loans } from '../schema';
import { sql } from 'drizzle-orm';
import { authenticatedRole } from 'drizzle-orm/supabase';

export const loansPolicy = pgPolicy('loans_policy', {
    for: 'all',
    to: authenticatedRole,
    using: sql`${loans}.user_id = auth.uid()`,
    withCheck: sql`${loans}.user_id = auth.uid()`,
}).link(loans);
