# nreq-encoding-decoding

## セットアップ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set nreq-encoding-decoding
git checkout main
cd nreq-encoding-decoding
pnpm install
curl -O https://raw.githubusercontent.com/AsaiToshiya/learn-nostr/main/882-nip-19-add-nreq/nreq.js
curl -O https://raw.githubusercontent.com/AsaiToshiya/learn-nostr/main/nip-19-bech-32-encoded-entities/tlv.js
```

## ビルド

```bash
pnpm build
```
