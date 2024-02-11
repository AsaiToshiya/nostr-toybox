# nsec encryption/decryption

## セットアップ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set nsec-encryption-decryption
git checkout main
cd nsec-encryption-decryption
pnpm install
curl -O https://raw.githubusercontent.com/AsaiToshiya/learn-nostr/main/nip-49-private-key-encryption/nip49.js
```

## ビルド

```bash
pnpm build
```
