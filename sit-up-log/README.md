# sit-up-log

## セットアップ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set sit-up-log
git checkout main
cd sit-up-log
curl -O https://raw.githubusercontent.com/AsaiToshiya/nostr-toybox/main/relay-list/relayList.js
```

## ビルド

```
build
```


## ライセンス

    Copyright (C) 2024  Asai Toshiya

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
