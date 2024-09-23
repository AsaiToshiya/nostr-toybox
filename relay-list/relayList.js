const _defaultRelays = [
  "wss://nos.lol",
  "wss://nostr.bitcoiner.social",
  "wss://nostr.mom",
  "wss://relay.damus.io",
  "wss://relay.nostr.bg",
  "wss://relay.nostr.band",
];

const _getRelays = async (pool, pk, isRead = false) => {
  const events = await _querySync(pool, _defaultRelays, [
    {
      authors: [pk],
      kinds: [3],
    },
    {
      authors: [pk],
      kinds: [10002],
    },
  ]);
  return (
    (await _getNip65Relays(events, isRead)) ??
    (await _getNip02Relays(events, isRead)) ??
    _defaultRelays
  );
};

const _getNip02Relays = async (events, isRead = false) => {
  const kind3Events = events.filter((event) => event.kind == 3);
  const content = kind3Events.length
    ? kind3Events.sort((a, b) => b.created_at - a.created_at)[0].content
    : null;
  const obj = content ? JSON.parse(content) : null;
  return obj
    ? Object.keys(obj)
        .filter((key) => (isRead ? obj[key].read : obj[key].write))
        .map((key) => key)
    : null;
};

const _getNip65Relays = async (events, isRead = false) => {
  const event = events.find((event) => event.kind == 10002);
  const tags = event?.tags.filter(
    (tag) => isRead || (tag[0] == "r" && (tag.length == 2 || tag[2] == "write"))
  );
  return tags?.length ? tags.map((tag) => tag[1]) : null;
};

const _querySync = async (pool, relays, filters) => {
  return new Promise(async (resolve) => {
    const events = [];
    pool.subscribeManyEose(relays, filters, {
      onevent(event) {
        events.push(event);
      },
      onclose(_) {
        resolve(events);
      },
    });
  });
};

export const getReadRelays = async (pool, pk) =>
  await _getRelays(pool, pk, true);

export const getRelays = async (pool, pk) => await _getRelays(pool, pk);
