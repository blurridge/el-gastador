'use client';

import { TransactionType } from '@/types/schema';
import { ColumnDef } from '@tanstack/react-table';

export const TransactionColumns: ColumnDef<TransactionType>[] = [
    {
        accessorKey: 'description',
        header: 'Transaction',
    },
    {
        accessorKey: 'amount',
        header: 'Amount',
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
];
