import { expect, test } from "vitest";
import { getRelays, getReadRelays } from "./relayList";

const nip02Event = {
  content:
    '{"wss://relay.damus.io":{"read":false,"write":true},"wss://nos.lol":{"read":true,"write":true},"wss://relay.nostr.bg":{"read":true,"write":true},"wss://nostr.mom":{"read":true,"write":true},"wss://nostr.bitcoiner.social":{"read":true,"write":true},"wss://relay.nostr.band":{"read":true,"write":false}}',
  created_at: 1711335036,
  id: "f528e1a9c92e29a6d7ca037b157aa91094c738cc52a928b8439822e71d1d1754",
  kind: 3,
  pubkey: "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a",
  sig: "c65f9ed05741ba84ff983c7b3e3ab18899f6d46d5029e39b000e9d008a6c8d3647962c2b8ebf880937ca9a69110f89cdc908b94d3ddfb46431ca81d7e4809283",
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

test("get default read relays", async () => {
  // スタブ
  const pool = {
    get: async () => null,
    querySync: async () => [],
  };

  const relays = await getReadRelays(
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

test("get NIP-02 read relays", async () => {
  // スタブ
  const pool = {
    get: async () => null,
    querySync: async () => [nip02Event],
  };

  const relays = await getReadRelays(
    pool,
    "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a"
  );

  expect(relays).toEqual([
    "wss://nos.lol",
    "wss://relay.nostr.bg",
    "wss://nostr.mom",
    "wss://nostr.bitcoiner.social",
    "wss://relay.nostr.band",
  ]);
});

test("get NIP-65 read relays", async () => {
  // スタブ
  const pool = {
    get: async () => nip65Event,
    querySync: async () => [nip02Event],
  };

  const relays = await getReadRelays(
    pool,
    "0a2f19dc1a185792c3b0376f1d7f9971295e8932966c397935a5dddd1451a25a"
  );

  expect(relays).toEqual([
    "wss://alicerelay.example.com",
    "wss://brando-relay.com",
    "wss://nostr-relay.example.com",
  ]);
});

test("empty NIP-65 relays", async () => {
  // スタブ
  const pool = {
    get: async () => ({
      kind: 10002,
      tags: [],
      content: "",
    }),
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
