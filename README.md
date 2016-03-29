# OUTNET.com Style Guide
The most fashionable styles at your fingertips

## Installation

Add the following in the head section of your page
```html
<link type="text/css" rel="stylesheet" href="https://s3-eu-west-1.amazonaws.com/preston-assets-dev/css/styles/outnet-2015/styles.css">
```

You can install the sass version via [bower](http://bower.io) or [npm](https://www.npmjs.com/package/outnet-2015).
```bash
bower install outnet-2015
```
```bash
npm install outnet-2015
```

## Usage
See [http://preston-nap.herokuapp.com/#/style/outnet-2015](http://preston-nap.herokuapp.com/#/style/outnet-2015)

## Release
- Bump the version: `npm version (major | minor | patch)`
- Publish: `npm publish`

## Tips & Tricks
#### Local usage and changes
After installing via bower or npm, use `bower link` or `npm link` to link your projects to a local version of outnet-2015.
1. `cd outnet-2015 && bower link`
2. `cd my-awesome-project && bower link outnet-2015`
**Note:** This will only work if both projects are currently using the same node version!
