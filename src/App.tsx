import { Suspense } from "react";
import { useWebsocketConnection } from "./websocket-data";
import { WebsocketView } from "./websocket-view";

export function App() {
  useWebsocketConnection();
  return (
    <div>
      <Suspense fallback={<p>Laster...</p>}>
        <WebsocketView />
      </Suspense>
    </div>
  );
}
