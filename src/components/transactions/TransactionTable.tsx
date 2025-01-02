'use client';

import { useGetUserTransactions } from '@/features/transactions';
import { DataTable } from '../ui/data-table';
import { TransactionColumns } from './TransactionColumns';
import { useGetUserInfo } from '@/features/user';
import AddTransactionModal from './AddTransactionModal';

const TransactionTable = () => {
    const { data: user, isLoading: isLoadingUser } = useGetUserInfo();
    const { data, isLoading: isLoadingTransactions, isError } = useGetUserTransactions(user!);
    if (isLoadingTransactions || isLoadingUser) {
        return null;
    }
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-xl">Transaction History</span>
                    <AddTransactionModal />
                </div>
                <DataTable columns={TransactionColumns} data={data} />
            </div>
        </>
    );
};

export default TransactionTable;
