import { useMutation } from "@tanstack/react-query";

import { slotSvc } from "../services";
import { ISimResponse } from "../types";

export default function useSim(
  onSuccess: (data: ISimResponse) => void,
  onError: (err: any) => void
) {
  const sim = async ({ count, bet }: { count: number; bet: number }) => {
    const data = await slotSvc.sim(count, bet);
    return data;
  };

  const simMutation = useMutation({
    mutationFn: sim,
    onSuccess: (data: ISimResponse) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  });

  return simMutation;
}
