import { responseSchema, ResponseSchemaType } from "@/types/schema";

export const createResponse = ({ status, message, data }: ResponseSchemaType) => {
  const response = { status, message, data };
  try {
    responseSchema.parse(response); // Validate response against schema
  } catch (error) {
    console.error("Response validation failed:", error);
    return {
      status: "error",
      message: "Response validation failed",
      data: null
    };
  }
  return response;
};
