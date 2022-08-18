# Traditional Front Boilerplate

## How to start

1. Install dependencies

```
npm install
```

2. Start dev

```
npm start
```

3. If you want to build prod

```
npm run build
```

It should build `dist` folder with production ready files

## How it works

all assets build to `static` folder, keep in mind or edit `webpack.config.js`

- html files build form `src/html`
- css bundle builds from `src/scss/styles.scss`
- js bundle builds from `src/js/main.js`
- svg sprite builds from `src/sprite`, filenames used for svg symbols ids

## Caveats

Html templates list prepares only on start. If you need to add new template file, consider to restart dev server
