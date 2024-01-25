const _fetch = async (pool, relay, filter, olderEvent) => {
  const events = await pool.list(
    [relay],
    [
      {
        ...filter,
        limit: 200,
      },
    ]
  );
  const oldestEvent = events.sort((a, b) => b.created_at - a.created_at)[
    events.length - 1
  ];
  const needFetchMore = oldestEvent && oldestEvent.id !== olderEvent?.id;
  return [
    ...(needFetchMore
      ? await _fetch(
          pool,
          relay,
          {
            ...filter,
            until: oldestEvent.created_at,
          },
          oldestEvent
        )
      : []),
    ...events,
  ];
};

export const fetch = async (pool, relays, filter) => [
  ...new Map(
    (
      await Promise.all(
        relays.map(async (relay) => {
          const events = [
            ...new Map(
              (await _fetch(pool, relay, filter)).map((obj) => [obj.id, obj])
            ).values(),
          ];
          return filter.limit ? events.slice(0, filter.limit) : events;
        })
      )
    )
      .flat()
      .map((obj) => [obj.id, obj])
  ).values(),
];
