# Wiki Article

## セットアップ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set nreq wiki-article
git checkout main
cd wiki-article
pnpm install
```

## ビルド

```bash
pnpm build
```
