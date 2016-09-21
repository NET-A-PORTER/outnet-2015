# Contributing

## Change process

Raise a pull request. To test your changes, you can follow the **[Local usage](#local-usage)** instructions with [Preston](https://github.com/NET-A-PORTER/preston) as your project

## Local usage 

1. Clone **outnet-2015** locally to your machine.
2. Link your project to the local version of **outnet-2015**.
  1. In the **outnet-2015** folder, run `bower link`
  2. In your project folder, run `bower link outnet-2015`

You should now be able to make changes in **outnet-2015** and have the changes appear magically in your project under your bower dependencies location.

Once you have committed your changes and finished working locally, you can unlink **outnet-2015** from your project
- `bower unlink outnet-2015`

*Note:* If you're using `npm` rather than `bower`, the above process should still work. Just replace `bower` with `npm` when running your commands. Please not that both outnet-2015 and the linked project must be using the **same version of node**.

###Troubleshooting
- Make sure bower is installed globally
- Make sure your changes in **outnet-2015** are appearing under the bower dependencies directory.
- When you run the bower link commands, make sure the folders used for linking are the same, e.g.
```bash
bower link
/Users/h.brahmbhatt/.local/share/bower/links/outnet-2015 > /Users/h.brahmbhatt/dev/outnet-2015

bower link outnet-2015
/Users/h.brahmbhatt/dev/preston/src/styles/outnet-2015 > /Users/h.brahmbhatt/.local/share/bower/links/outnet-2015
```

##Versioning and publishing changes (for maintainers only)

Once you are ready to make a release, version and publish the latest version of master.
  - `npm run version -- (major|minor|patch)`

#### S3 deployment (subject to change)

This is currently done via [preston](https://github.com/NET-A-PORTER/preston). Upgrade **outnet-2015** in preston and push to master. The CI server will then automatically deploy the built assets to S3 (these include css, images and fonts) after the build has passed.

We will change this to not require this extra step and happen automatically after the versioning and publishing steps above have been completed.

## Upgrading
Update the version of **outnet-2015** in your project by changing your `bower.json` or
- `bower install --save outnet-2015#new-version-number`
