'use client'

import { useGetUserTransactions } from "@/features/transactions";
import { DataTable } from "../ui/data-table";
import { TransactionColumns } from "./TransactionColumns";
import { useGetUserInfo } from "@/features/user";

const TransactionTable = () => {
    const { data: user, isLoading: isLoadingUser } = useGetUserInfo();
    const { data, isLoading: isLoadingTransactions, isError } = useGetUserTransactions(user!)
    if (isLoadingTransactions || isLoadingUser) {
        return null;
    }
    return <DataTable columns={TransactionColumns} data={data} />
}

export default TransactionTable;
