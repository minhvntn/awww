`node.js` 13.5.0

- `webpack`
- `pug`
- `sass`
- `babel`

## Run *.html
- *.html Make sure you have "127.0.0.1   localhost" in your hosts file
- "npm install" 
- "npm run dev" to development
- "npm run build" to build production

## Pug tutorial
- All `https://github.com/pugjs/pug-en/tree/master/src/language`
- Mixins: `https://github.com/pugjs/pug-en/blob/master/src/language/mixins.md`
- Using data:
+ Local data: inside pug file. Add variable in `/src/views/layouts/_variables.pug`
+ Global data: using json file. Add in `/src/data/data.json`. If using more file .json, please delcare in webpack.config.js

## Plugins
If you'd like to extract the media queries from the extracted CSS (so mobile users don't need to load desktop or tablet specific CSS anymore) you should use one of the following plugins:
```https://github.com/mike-diamond/media-query-splitting-plugin```
