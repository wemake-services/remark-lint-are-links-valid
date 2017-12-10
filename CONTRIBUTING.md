# Contributing toremark-are-links-valid


## Pull Requests Welcome

1. Fork `remark-are-links-valid`
2. Create a topic branch
3. Use `commitizen` to commit your changes, simply run `yarn commit` instead of `git commit`
4. Push commits to your fork
5. Open a pull request against `remark-are-links-valid/master`


## Bootstrap

You will need to follow several step to setup development environment:

0. Install `nvm` and run `nvm install && nvm use` to install and activate our `node` version (you can skip this step if versions already match)
1. Install `yarn` and `lerna` with `npm install -g yarn lerna`
2. Run `yarn install && yarn build`


## Development

This repository follows `conventional-commits`, please make sure you document your changes properly.

Please, make sure that all these commands succeed before pushing anything:

1. `yarn test`


## Issues

If you believe there to be a bug, please provide the maintainers with enough
detail to reproduce or a link to an app exhibiting unexpected behavior. For
help, please start with Stack Overflow.
