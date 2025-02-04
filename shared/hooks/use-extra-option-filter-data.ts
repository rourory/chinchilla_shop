import { ApiClients } from "@/shared/services/api-clients";
import { ExtraOption } from "@prisma/client";
import React from "react";

interface ExtraOptionFilterData {
  extraOptions: ExtraOption[];
}

export const useExtraOptionFilterData = (): ExtraOptionFilterData => {
  const [extraOptions, setExtraOptions] = React.useState<ExtraOption[]>([]);

  React.useEffect(() => {
    ApiClients.extraOptions
      .getAll()
      .then((res) => {
        setExtraOptions(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    extraOptions,
  };
};
