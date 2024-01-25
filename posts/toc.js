import fs from "fs";
import { JSDOM } from "jsdom";

const html = fs.readFileSync("./public/hashtag.html", "utf8");
const dom = new JSDOM(html);
const items = [...dom.window.document.querySelectorAll("h2")].map(
  (h2) =>
    `<li><a href="hashtag.html${h2.textContent}">${h2.textContent}</a></li>`
);
const toc = `
<div id="toc">
  <h2>ハッシュタグ</h2>
  <ul>
    ${items.join("")}
  </ul>
</div>`;
fs.writeFileSync("toc.html", toc);
