import https from "https";
import { marked } from "marked";
import pkg from "natural";
const { Lexicon, RuleSet, BrillPOSTagger } = pkg;

const urls = [
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/01.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/02.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/03.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/04.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/05.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/06.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/07.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/08.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/09.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/10.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/11.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/12.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/13.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/14.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/15.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/16.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/18.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/19.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/20.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/21.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/22.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/23.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/25.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/26.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/27.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/28.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/30.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/31.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/33.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/36.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/39.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/40.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/42.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/45.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/46.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/47.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/50.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/51.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/56.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/57.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/58.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/65.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/78.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/89.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/94.md",
  "https://raw.githubusercontent.com/nostr-protocol/nips/master/README.md",
];

const count = (words) =>
  words.reduce((acc, obj) => {
    const key =
      Object.keys(acc).find((key) => key.toLowerCase() == obj.toLowerCase()) ??
      obj;
    const currentCount = acc[key] ?? 0;
    return { ...acc, [key]: currentCount + 1 };
  }, {});

const decodeHTMLEntities = (text) =>
  text
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&amp;", "&");

const download = async (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });

const extractWords = (markdown) =>
  marked
    .lexer(markdown)
    .flatMap(flatToken)
    .filter((token) => token.text)
    .map((token) => token.text)
    .flatMap((text) => text.split(/\s/))
    .map((word) =>
      decodeHTMLEntities(word).replace(/^\W+/, "").replace(/\W+$/, "")
    )
    .filter((word) => word);

const flatToken = (token) =>
  token.type === "code"
    ? []
    : token.tokens
    ? token.tokens.map(flatToken)
    : token.items
    ? token.items.map(flatToken)
    : token;

const tag = (words) => {
  const language = "EN";
  const defaultCategory = "N";
  const defaultCategoryCapitalized = "NNP";

  const lexicon = new Lexicon(
    language,
    defaultCategory,
    defaultCategoryCapitalized
  );
  const ruleSet = new RuleSet("EN");
  const tagger = new BrillPOSTagger(lexicon, ruleSet);
  return tagger
    .tag(words)
    .taggedWords.reduce((acc, obj) => ({ ...acc, [obj.token]: obj.tag }), {});
};

const markdowns = await Promise.all(
  urls.map(async (url) => await download(url))
);
const words = markdowns.map(extractWords).flat();
const countedWords = count(words);
const uniqueWords = Object.keys(countedWords);
const taggedWords = tag(uniqueWords);
const sortedWords = [...uniqueWords].sort(
  (a, b) => countedWords[b] - countedWords[a]
);

sortedWords.forEach((word) =>
  console.log(`${word},${countedWords[word]},${taggedWords[word]}`)
);
