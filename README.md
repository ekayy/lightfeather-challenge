# LightFeather Challenge

Full Stack Engineer Coding Challenge

## Description

This project is a monorepo utilizing Yarn Workspaces and Lerna to manage dependencies.

- api: `/packages/api`
- client: `/packages/web`

## How To Setup

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer, as well as [Yarn](https://yarnpkg.com/).  Currently tested with node 14.17.0. 

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/ekayy/lightfeather-challenge.git

# Go into the repository
$ cd lightfeather-challenge

# Install dependencies
$ npx lerna bootstrap

# Start app (same as running `yarn dev` within /packages/api and /packages/web)
$ npx lerna run --parallel dev

# Running both tests (can also run `yarn test` within respective folder)
$ npx lerna run --parallel test
```
