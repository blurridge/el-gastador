import { ResponseSchema, ResponseType } from '@/types/schema';

import { RESPONSE_STATUS } from './constants';

export const createResponse = ({ status, message, data }: ResponseType) => {
  const response = { status, message, data };
  try {
    ResponseSchema.parse(response); // Validate response against schema
  } catch (error) {
    console.error('Response validation failed:', error);
    return {
      status: RESPONSE_STATUS.FAIL,
      message: 'Response validation failed',
      data: null,
    };
  }
  return response;
};
