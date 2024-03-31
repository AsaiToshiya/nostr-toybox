const _defaultRelays = [
  "wss://nos.lol",
  "wss://nostr.bitcoiner.social",
  "wss://nostr.mom",
  "wss://relay.damus.io",
  "wss://relay.nostr.bg",
  "wss://relay.nostr.band",
];

const _getNip02Relays = async (pool, pk, isRead = false) => {
  const events = await pool.querySync(_defaultRelays, {
    authors: [pk],
    kinds: [3],
  });
  const content = events.length
    ? events.sort((a, b) => b.created_at - a.created_at)[0].content
    : null;
  const obj = content ? JSON.parse(content) : null;
  return obj
    ? Object.keys(obj)
        .filter((key) => (isRead ? obj[key].read : obj[key].write))
        .map((key) => key)
    : null;
};

const _getNip65Relays = async (pool, pk, isRead = false) => {
  const event = await pool.get(_defaultRelays, {
    authors: [pk],
    kinds: [10002],
  });
  return event?.tags
    .filter(
      (tag) =>
        tag[0] == "r" &&
        (tag.length == 2 || tag[2] == (isRead ? "read" : "write"))
    )
    .map((tag) => tag[1]);
};

export const getReadRelays = async (pool, pk) =>
  (await _getNip65Relays(pool, pk, true)) ??
  (await _getNip02Relays(pool, pk, true)) ??
  _defaultRelays;

export const getRelays = async (pool, pk) =>
  (await _getNip65Relays(pool, pk)) ??
  (await _getNip02Relays(pool, pk)) ??
  _defaultRelays;
