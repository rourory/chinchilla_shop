import { axiosInstance } from "./fetcher-instance";
import { ApiRoutes } from "./api-routes";
import { ExtraOption } from "@prisma/client";

export const getAll = async (): Promise<ExtraOption[]> => {
  const response = await axiosInstance.get<ExtraOption[]>(
    ApiRoutes.EXTRA_OPTIONS,
  );
  return response.data;
};
