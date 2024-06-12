import "dotenv/config";
import { useWebSocketImplementation } from "nostr-tools/pool";
import WebSocket from "ws";
useWebSocketImplementation(WebSocket);
import { SimplePool } from "nostr-tools/pool";

const [fromRelays, toRelays, filters] = [
  process.env.FROM_RELAYS,
  process.env.TO_RELAYS,
  process.env.FILTERS,
].map((value) => JSON.parse(value.replace(/'/g, '"')));

const pool = new SimplePool();
pool.subscribeMany(fromRelays, filters, {
  async onevent(event) {
    await Promise.all(pool.publish(toRelays, event));
  },
});
