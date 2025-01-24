'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TransactionType } from '@/types/schema';

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
