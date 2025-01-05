import type { ClientResponse } from 'hono/client';

import { ResponseType } from '@/types/schema';

import { RESPONSE_STATUS } from './constants';

export const parseApiResponse = async <T>(fetchCall: Promise<ClientResponse<T>>): Promise<ResponseType> => {
    const response = await fetchCall;
    if (!response.ok) {
        const error = await response.text();
        return { data: null, message: error, status: RESPONSE_STATUS.FAIL };
    }
    const { status, message, data } = (await response.json()) as ResponseType;
    return { data, message, status };
};
