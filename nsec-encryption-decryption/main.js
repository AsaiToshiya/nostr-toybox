import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import * as nip19 from "nostr-tools/nip19";
import * as nip49 from "./nip49.js";

const enableButtons = () => {
  encryptButton.disabled = false;
  decryptButton.disabled = false;
};

const disableButtons = () => {
  encryptButton.disabled = true;
  decryptButton.disabled = true;
};

document.querySelector("#app").innerHTML = `
  <h1>nsec encryption/decryption</h1>
  <input id="passphrase" type="text" placeholder="passphrase" /><br />
  <input id="nsec" type="text" size="80" placeholder="nsec" />
  <button id="encrypt">encrypt</button><br />
  <input id="ncryptsec" type="text" size="80" placeholder="ncryptsec" />
  <button id="decrypt">decrypt</button><br />
  <img id="nostrich" src="nostrich.gif" style="display: none; height: 1.3em; max-height: 1.3em;">
`;

const encryptButton = document.querySelector("#encrypt");
const decryptButton = document.querySelector("#decrypt");
const nostrich = document.querySelector("#nostrich");

encryptButton.addEventListener("click", async () => {
  disableButtons();
  nostrich.style.display = "inline";
  ncryptsec.value = await nip49.encrypt(
    bytesToHex(nip19.decode(nsec.value).data),
    passphrase.value,
    16
  );
  nostrich.style.display = "none";
  enableButtons();
});

decryptButton.addEventListener("click", async () => {
  disableButtons();
  nostrich.style.display = "inline";
  nsec.value = nip19.nsecEncode(
    hexToBytes(await nip49.decrypt(ncryptsec.value, passphrase.value))
  );
  nostrich.style.display = "none";
  enableButtons();
});
