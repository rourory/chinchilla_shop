import { ApiRoutes } from "./api-routes";
import { axiosInstance } from "./fetcher-instance";

export const confirmPaidOrder = async (orderId: string, status: string) => {
  const response = await axiosInstance.post(ApiRoutes.CHECKOUT_CALLBACK, {
    object: { metadata: { order_id: orderId }, status: status },
  });
  return response.status;
};
