import { expect, test } from "vitest";
import { getRelays } from "./relayList";

const nip02Event = {
  content:
    '{"wss://relay.damus.io":{"read":true,"write":true},"wss://nos.lol":{"read":true,"write":true},"wss://relay.nostr.bg":{"read":true,"write":true},"wss://nostr.mom":{"read":true,"write":true},"wss://nostr.bitcoiner.social":{"read":true,"write":true},"wss://relay.nostr.band":{"read":true,"write":false}}',
  created_at: 1696473222,
  id: "3045427818c0a606a8c0ee66ccb87dc4be13a1bebb0d697f8a05e00b19d21e4d",
  kind: 3,
  pubkey: "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a",
  sig: "77ecc59780b446968e2929cde30d6186d34df27db5eb9f83227c5507cad4d5ea153230c41611a3d72e168ad4472cd874899556a46ab9486343fe89344c3c5d21",
  tags: [
    ["p", "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a"],
  ],
};

const nip65Event = {
  kind: 10002,
  tags: [
    ["r", "wss://alicerelay.example.com"],
    ["r", "wss://brando-relay.com"],
    ["r", "wss://expensive-relay.example2.com", "write"],
    ["r", "wss://nostr-relay.example.com", "read"],
  ],
  content: "",
};

test("get default relays", async () => {
  // スタブ
  const pool = {
    get: async () => null,
    querySync: async () => [],
  };

  const relays = await getRelays(
    pool,
    "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a"
  );

  expect(relays).toEqual([
    "wss://nos.lol",
    "wss://nostr.bitcoiner.social",
    "wss://nostr.mom",
    "wss://relay.damus.io",
    "wss://relay.nostr.bg",
    "wss://relay.nostr.band",
  ]);
});

test("get NIP-02 relays", async () => {
  // スタブ
  const pool = {
    get: async () => null,
    querySync: async () => [nip02Event],
  };

  const relays = await getRelays(
    pool,
    "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a"
  );

  expect(relays).toEqual([
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.nostr.bg",
    "wss://nostr.mom",
    "wss://nostr.bitcoiner.social",
  ]);
});

test("get NIP-65 relays", async () => {
  // スタブ
  const pool = {
    get: async () => nip65Event,
    querySync: async () => [nip02Event],
  };

  const relays = await getRelays(
    pool,
    "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a"
  );

  expect(relays).toEqual([
    "wss://alicerelay.example.com",
    "wss://brando-relay.com",
    "wss://expensive-relay.example2.com",
  ]);
});
