# posts

## セットアップ

### リポジトリ

```bash
git clone --filter=blob:none --no-checkout --sparse https://github.com/AsaiToshiya/nostr-toybox.git
cd nostr-toybox
git sparse-checkout set fetch posts
git checkout main
cd posts
npm install
```

### Vercel

#### ログイン

```bash
$ node ./node_modules/vercel/dist/index.js login to.asai.60@gmail.com
Vercel CLI 28.15.4
We sent an email to to.asai.60@gmail.com. Please follow the steps provided inside it and make sure the security code matches Snowy Vampire Bat.
> Success! Email authentication complete for to.asai.60@gmail.com
Congratulations! You are now logged in. In order to deploy something, run `vercel`.
💡  Connect your Git Repositories to deploy every branch push automatically (https://vercel.link/git).
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
Vercel CLI 28.20.0
? Set up “~\nostr-toybox\posts”? [Y/n] y
? Which scope should contain your project? asaitoshiya
? Link to existing project? [y/N] y
? What’s the name of your existing project? vercel-nostr-posts
✅  Linked to asaitoshiya/vercel-nostr-posts (created .vercel)
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
    npm run build && npm run toc && vercel --prod
  toc
    node toc.js && mv -f toc.html ./public

```
