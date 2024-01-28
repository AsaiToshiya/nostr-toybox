class Fluent {
  #ids;
  #relays;

  constructor(relays) {
    this.#relays = relays;
  }

  ids(ids) {
    this.#ids = ids.map((id) => window.NostrTools.nip19.decode(id).data.id);
    return this;
  }

  async get() {
    const pool = new window.NostrTools.SimplePool();
    const event = await pool.get(this.#relays, {
      ids: this.#ids,
    });
    pool.close(this.#relays);
    return new FluentEvent(event);
  }
}

class FluentEvent {
  #event;

  constructor(event) {
    this.#event = event;
  }

  naddr() {
    return window.NostrTools.nip19.naddrEncode({
      pubkey: this.#event.pubkey,
      kind: this.#event.kind,
      identifier: this.#event.tags.find((tag) => tag[0] == "d")[1],
    });
  }
}

const fluent = (relays) => new Fluent(relays);
