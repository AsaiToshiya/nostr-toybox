# timeline

timeline は、Nostr のタイムラインを HTML として保存するコマンド ライン ツールです。

## セットアップ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set timeline
git checkout main
cd timeline
npm install
```

## 使い方

1. .env 内の公開鍵を変更

   .env:
  
   ```dosini
   NPUB=npub1pgh3nhq6rpte9sasxah36luewy54azfjjekrj7f45hwa69z35fdqfdrs38
   ```

2. スクリプトを実行

   ```bash
   node index.js
   ```

### オプション

|オプション|説明|
|---|---|
|-date, --d <date&gt;|タイムラインを取得する日付。YYYY-MM-DD 形式。デフォルトはスクリプトの実行日。|
|-exclude, --e <uses&gt;|タイムラインから除外するユーザー。カンマ区切りの npub または name。|
|-timeout, --t <milliseconds&gt;|リレーからの応答を待機する時間。ミリ秒。デフォルトは 180000 ミリ秒 (3 分)。|
|-sort, --s <order&gt;|タイムラインの並べ替え。asc (昇順) または desc (降順)。デフォルトは desc。|

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
