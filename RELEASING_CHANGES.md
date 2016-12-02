# How to make changes to The Outnet style guide

This document provides full instrucions on how to make changes to The Outnet Style Guide and release those changes, from scratch.

## Installing the repo

`git clone https://github.com/NET-A-PORTER/outnet-2015.git`

## Make the changes

Edit the CSS, HTML or JS files as needed in order to add new styles, change existing ones or improve the visual style guide.

## Build the Style Guide

`npm run build`

## Test your changes

Open the `index.hml` in the `_dist` folder on a browser to check your changes look as expected.

`open _dist/index.html`

## Git commit your changes

Ensure your local git repo is clean by issuing a `git commit` command that includes or all your changes.

## Create a new Version of the Style Guide

**Warning!** Before attempting to version the Style Guide you must make sure you have push access to the github repo where the Style Gyide is hosted.

Next, using semantic versioning criteria (see [semver](http://semver.org)), decide whether you version corresponds to a *patch*, a *minor* or a *major* release.

According to your decision execute one of the following three commands:

      npm run version -- patch
      npm run version -- minor
      npm run version -- major
	  
This command will bump the version numbers in `package.json` and `bower.json`.

After that, you will be prompted to enter your credentials to the remote repo and, if that goes well, the following actions will take place:

- the git repo will be tagged with the new version number
- All these changes will be committed to the remote repo
- a new CI build of the Style Guide will be triggered
- Once the CI build is done a new version of the library will be publicly available at a url with this shape: `//cache.theoutnet.com/preston-assets/2.6.2/css/outnet-2015.css`
