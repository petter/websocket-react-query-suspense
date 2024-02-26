import { useEffect } from "react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

import { connect, disconnect } from "./websocket-simulator";

let resolve: (value: unknown) => void = () => null;
const promise = new Promise((res) => {
  resolve = res;
});

export function useWebsocketConnection() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const connectionId = connect((newMessage) => {
      queryClient.setQueryData(["websocket"], newMessage);
      resolve(newMessage);
    });

    return () => disconnect(connectionId);
  }, []);
}

export function useWebsocketData() {
  const queryClient = useQueryClient();
  return useSuspenseQuery({
    queryKey: ["websocket"],
    queryFn: async () => {
      await promise;
      return queryClient.getQueryData(["websocket"]) as string;
    },
  });
}
