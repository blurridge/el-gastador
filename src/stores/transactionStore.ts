import honoClient from '@/lib/rpc/client/hono-client'
import { TransactionType } from '@/types/schema'
import { RESPONSE_STATUS } from '@/utils/constants'
import { parseApiResponse } from '@/utils/parseResponse'
import { create } from 'zustand'
import useUserStore from './userStore'

type State = {
  transactions: TransactionType | null
  isLoadingTransactions: boolean
}

type Action = {
  updateTransactions: () => Promise<void>
}

const useTransactionStore = create<State & Action>((set) => ({
  transactions: null,
  isLoadingTransactions: false,
  updateTransactions: async () => {
    set({ isLoadingTransactions: true })
    const currentUserId = useUserStore.getState().userProfile?.id
    if (currentUserId) {
      const transactionResponse = await parseApiResponse(honoClient.api.transactions['get-user-transactions'].$get({
        query: {
          id: currentUserId
        }
      }))
      if (transactionResponse.status === RESPONSE_STATUS.SUCCESS) {
        set({ transactions: transactionResponse.data })
      }
    }
    set({ isLoadingTransactions: false })
  }
}))

export default useTransactionStore
