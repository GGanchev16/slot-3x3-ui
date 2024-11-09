import { useMutation } from "@tanstack/react-query";

import { slotSvc } from "../services";
import { IPlayResponse } from "../types";

export default function usePlay(
  onSuccess: (data: IPlayResponse) => void,
  onError: (err: any) => void
) {
  const play = async (bet: number) => {
    const data = await slotSvc.play(bet);
    return data;
  };

  const playMutation = useMutation({
    mutationFn: play,
    onSuccess: (data: IPlayResponse) => {
      onSuccess(data);
    },
    onError: (error) => {
      onError(error);
    },
  });

  return playMutation;
}
