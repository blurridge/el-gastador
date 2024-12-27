import type { ClientResponse } from 'hono/client';
import { RESPONSE_STATUS } from './constants';
import { ResponseSchemaType } from '@/types/schema';

export const parseApiResponse = async <T>(fetchCall: Promise<ClientResponse<T>>): Promise<ResponseSchemaType> => {
  const response = await fetchCall;
  if (!response.ok) {
    const error = await response.text();
    return { data: null, message: error, status: RESPONSE_STATUS.FAIL };
  }
  const { status, message, data } = await response.json() as ResponseSchemaType;
  return { data, message, status };
};
