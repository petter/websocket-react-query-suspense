import { useWebsocketData } from "./websocket-data";

export function WebsocketView() {
  const query = useWebsocketData();
  return (
    <div>
      <h1>Websocket</h1>
      <p>{query.data}</p>
    </div>
  );
}
