type ConnectionId = string;

const connections: Record<ConnectionId, (newMessage: string) => void> = {};

export function connect(cb: (newMessage: string) => void): ConnectionId {
  const connectionId = crypto.randomUUID();
  connections[connectionId] = cb;
  return connectionId;
}

export function disconnect(connectionId: ConnectionId) {
  delete connections[connectionId];
}

setInterval(() => {
  const newMessage = "Hello, World!" + crypto.randomUUID();
  console.log("sender ny data", newMessage);
  for (const cb of Object.values(connections)) {
    cb(newMessage);
  }
}, 5000);
