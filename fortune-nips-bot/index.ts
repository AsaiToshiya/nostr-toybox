import * as fs from "fs";
import crypto from "crypto";

import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: ".env.local", override: true });
import {
  SimplePool,
  nip19,
  getPublicKey,
  finishEvent,
  Event,
  Kind,
} from "nostr-tools";
import "websocket-polyfill";

// コンテキストを生成する
const createContent = (post: Event<Kind.Text>) => {
  const hash = generateHash(
    post.pubkey,
    withoutTime(new Date(post.created_at * 1000)),
    sk
  ).substring(0, 2);
  const index = convertToNumber(hash, nips.length - 1);
  const nip = nips[index];
  return `今日のラッキー NIP

${nip.title}
https://github.com/nostr-protocol/nips/blob/master/${nip.filename}`;
};

// タグの配列を生成する
const createTags = (post: Event<Kind.Text>) => {
  // 投稿者を除外する
  const pTags = post.tags.filter(
    (tag: string[]) => tag[0] == "p" && tag[1] != post.pubkey
  );
  return [...pTags, ["e", post.id, "", "root"], ["p", post.pubkey]];
};

// ハッシュを数値に変換する
const convertToNumber = (hash: string, range: number) => {
  const decimal = parseInt(hash, 16);
  return decimal % (range + 1);
};

// ハッシュを生成する
const generateHash = (value1: string, value2: Date, value3: string) => {
  const hash = crypto.createHash("sha256");
  hash.update(value1.toString());
  hash.update(value2.toString());
  hash.update(value3.toString());
  return hash.digest("hex");
};

// 現在の UNIX 時間を返す
const unixTimeNow = () => Math.floor(Date.now() / 1000);

// Date オブジェクトから時刻を取り除く
const withoutTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

// NIPs、リレー、秘密鍵、公開鍵
const nips = fs
  .readFileSync("nips.csv")
  .toString()
  .split("\n")
  .map((line) => line && line.split(","))
  .map((data) => ({
    title: data[0],
    filename: data[1],
  }));
const relays = JSON.parse(process.env.RELAYS!.replace(/'/g, '"'));
const sk = nip19.decode(process.env.NSEC!).data as string;
const pk = getPublicKey(sk);
const npub = nip19.npubEncode(pk);

// 投稿をフェッチする範囲
const now = unixTimeNow();
const twoMinutesAgo = now - 2 * 60;

const pool = new SimplePool();

// 投稿
const posts = await pool.list(relays, [
  {
    kinds: [Kind.Text],
    "#p": [pk],
    since: twoMinutesAgo,
    until: now,
  },
]);

// 返信済みの投稿の ID
const repliedPostIds = posts
  .filter((post: Event<Kind.Text>) => post.pubkey == pk) // ボットか
  .map(
    (post: Event<Kind.Text>) =>
      post.tags.find((tag: string[]) => tag[0] == "e")![1]
  );

// メンション
// prettier-ignore
const mentions = posts.filter(
  (post: Event<Kind.Text>) => post.pubkey != pk &&                       // ボットではないか
  !repliedPostIds.includes(post.id) &&       // 返信済みではないか
  post.tags.every((tag: string[]) => tag[0] != "e") && // 返信に返信しない
  post.content.includes(`nostr:${npub}`)     // content にボットの npub を含むか
);

// 返信
const replies = mentions.map((post: Event<1>) =>
  finishEvent(
    {
      kind: Kind.Text,
      created_at: unixTimeNow(),
      tags: createTags(post),
      content: createContent(post),
    },
    sk
  )
);

// 返信を発行する
await Promise.all(
  replies.map(
    (reply: Event<Kind.Text>) =>
      new Promise((resolve, reject) => {
        const pub = pool.publish(relays, reply);
        pub.on("ok", resolve);
        pub.on("failed", reject);
      })
  )
);

// 後処理を実行する
pool.close(relays);
process.exit();
