import asciidoctor from "asciidoctor";
import { SimplePool } from "nostr-tools/pool";
import * as nip19 from "nostr-tools/nip19";

const defaultRelays = [
  "wss://relay.wikifreedia.xyz",
  "wss://nostr.wine",
  "wss://nostr21.com",
  "wss://relay.nostr.band",
];

const createFilter = ({ type, data }) =>
  type === "nevent"
    ? {
        ids: [data.id],
      }
    : {
        kinds: [data.kind],
        authors: [data.pubkey],
        "#d": [data.identifier],
      };

const findTag = (event, tagName) =>
  event?.tags.find((tag) => tag[0] == tagName);

const getMetaOr = (name, defaultValue) =>
  document.querySelector(`meta[name='${name}']`)?.getAttribute("content") ||
  defaultValue;

const normalizeArticleName = (input) =>
  input.trim().toLowerCase().replace(/\W/g, "-");

const render = async () => {
  const pool = new SimplePool();
  const nip19String = location.hash.substring(1);
  const filter = nip19String.startsWith("nreq")
    ? nreq.decode(nip19String)
    : createFilter(nip19.decode(nip19String));
  const event = await pool.get(relays, filter);
  const Asciidoctor = asciidoctor();
  const content = turnWikilinksIntoAsciidocLinks(event.content);
  const title = findTag(event, "title")?.[1];
  title && (document.title = `${title} / Wiki Article`);
  document.body.innerHTML = Asciidoctor.convert(content);
};

const setBodyStyle = () => {
  document.body.style.marginLeft = "auto";
  document.body.style.marginRight = "auto";
  document.body.style.maxWidth = "800px";
};

const turnWikilinksIntoAsciidocLinks = (content) =>
  content.replace(/\[\[(.*?)\]\]/g, (_, content) => {
    const [t1, t2] = content.split("|");
    const display = t2 || t1;
    const target = normalizeArticleName(t1);
    const nreqString = nreq.encode({
      kinds: [30818],
      "#d": [target],
    });
    return `link:${wikilinkPrefix}${nreqString}[${display}]`;
  });

const relays = getMetaOr("relays", defaultRelays);
const showUsage = getMetaOr("usage") !== "false";
const wikilinkPrefix = getMetaOr("wikilink-prefix", "#");

window.addEventListener("hashchange", render);

!location.hash && showUsage
  ? (document.body.innerHTML = `<p>
     usage:
     <code
       >https://asaitoshiya.github.io/nostr-toybox/wiki-article/dist/#&lt;nip-19-code&gt;</code
     >
   </p>`)
  : setBodyStyle() || render();
