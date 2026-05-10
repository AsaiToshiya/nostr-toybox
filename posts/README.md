# posts

posts は、投稿を HTML として保存するためのコマンド ライン ツールです。

## セットアップ

### リポジトリ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set fetch posts
git checkout main
cp -r fetch posts
cd posts
npm install
```

### Vercel

#### ログイン

```bash
$ node ./node_modules/vercel/dist/index.js login
> NOTE: The Vercel CLI now collects telemetry regarding usage of the CLI.
> This information is used to shape the CLI roadmap and prioritize features.
> You can learn more, including how to opt-out if you'd not like to participate in this program, by visiting the following URL:
> https://vercel.com/docs/cli/about-telemetry
>
  Visit https://vercel.com/oauth/device?user_code=FDKC-ZZSJ

  Congratulations! You are now signed in.

  To deploy something, run `vercel`.

  💡 To deploy every commit automatically,
  connect a Git Repository (vercel.link/git (https://vercel.link/git)).
```

#### プロジェクトの作成

```bash
$ node ./node_modules/vercel/dist/index.js project add vercel-nostr-posts
Vercel CLI 28.15.4
> Success! Project vercel-nostr-posts added (asaitoshiya) [564ms]
```

#### リンク

```bash
$ node ./node_modules/vercel/dist/index.js link
? Set up “~/bin/nostr-toybox/posts”? yes
? Which scope should contain your project? asaitoshiya's projects
? Link to existing project? yes
? Which existing project do you want to link? vercel-nostr-posts
✅  Linked to asaitoshiyas-projects/vercel-nostr-posts (created .vercel)
? Would you like to pull environment variables now? yes
> Downloading `development` Environment Variables for asaitoshiyas-projects/vercel-nostr-posts
✅  Created .env.local file and added it to .gitignore [197ms]
```

### crontab

```bash
0 * * * * export PATH=/usr/local/bin/:$PATH; cd /home/pi/bin/nostr-toybox/posts && npm run deploy > /dev/null 2>&1
```

## npm スクリプト

```bash
$ npm run
Lifecycle scripts included in vercel-nostr-posts@1.0.0:
  test
    echo "Error: no test specified" && exit 1

available via `npm run-script`:
  prebuild
    rm -rf public && mkdir public
  build
    node index.js && mv -f index.html hashtag.html ./public && copyfiles -f ./node_modules/github-markdown-css/github-markdown.css ./public
  deploy
    npm run build && npm run toc && cp -f robots.txt ./public && vercel --prod
  toc
    node toc.js && mv -f toc.html ./public

```
