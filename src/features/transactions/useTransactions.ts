import { useToast } from "@/hooks/use-toast";
import honoClient from "@/lib/rpc/client/hono-client";
import { PartialTransactionType, TransactionType } from "@/types/schema";
import { RESPONSE_STATUS } from "@/utils/constants";
import { parseApiResponse } from "@/utils/parseResponse";
import { User } from "@supabase/supabase-js";
import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const keys = {
    getUserTransactions: ["get-user-transactions"],
    skip: ["skip"]
}

export const useGetUserTransactions = (user: User) => {
    return useQuery({
        queryFn: user ? async () => {
            const transactionResponse = await parseApiResponse(honoClient.api.transactions["get-user-transactions"].$get({
                query: {
                    id: user.id,
                },
            }));
            if (transactionResponse.status === RESPONSE_STATUS.SUCCESS) {
                return transactionResponse.data || [] as TransactionType[]
            } else {
                return [] as TransactionType[]
            }
        } : skipToken,
        queryKey: user ? [...keys.getUserTransactions, user.id] : keys.skip,
        enabled: !!user
    })
}

export const useCreateUserTransaction = (user: User) => {
    const queryClient = useQueryClient();
    const { toast } = useToast()

    return useMutation({
        mutationFn: async (transactionPayload: PartialTransactionType) => {
            const response = await parseApiResponse(honoClient.api.transactions["create-user-transaction"].$post({
                json: transactionPayload
            }))
            if (response.status === RESPONSE_STATUS.SUCCESS) {
                toast({ title: response.message, description: `Transaction created for amount worth ${parseFloat(transactionPayload.amount).toFixed(2)}.` })
            }
            else {
                toast({ variant: "destructive", title: response.message, description: `Failed creating trnasaction for ${user.id}.` })
            }
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [...keys.getUserTransactions, user.id]
            })
        },
    })
}
