日本語 | [English](./README-en.md)

# NIPs 占い

「NIPs 占い」は、今日のラッキー NIP を占う Nostr 上のボットです。

このボットは、メンションに返信します。

## セットアップ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set fortune-nips-bot
git checkout main
cd fortune-nips-bot
npm install
```

## 使い方

1. .env 内の秘密鍵を変更

   .env:
  
   ```dosini
   NSEC=nsec1fe9rt8twt6l96a977e0r02w6sqhffcwdr3zzcy6s8pxpq3rrchpqhwnvek
   ```

2. スクリプトを実行

   ```bash
   node index.js
   ```

## ライセンス

    MIT License

    Copyright (c) 2023 Asai Toshiya

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
