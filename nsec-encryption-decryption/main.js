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
