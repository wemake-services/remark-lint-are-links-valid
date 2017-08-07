# remark-lint-are-links-valid-alive

[![Build Status](https://travis-ci.org/wemake-services/remark-lint-are-links-valid.svg?branch=master)](https://travis-ci.org/wemake-services/remark-lint-are-links-valid) [![Coverage Status](https://coveralls.io/repos/github/wemake-services/remark-lint-are-links-valid/badge.svg?branch=master)](https://coveralls.io/github/wemake-services/remark-lint-are-links-valid?branch=master) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Make your links to follow to your rules!


## Installation

```bash
npm install remark-lint-are-links-valid-alive # or yarn
```


## Usage

Add `remark-lint-are-links-valid-alive` to `remark`'s [configuration](https://github.com/wooorm/remark/tree/master/packages/remark-cli):

```json
{
  "plugins": [
    ...
    "remark-lint-are-links-valid-alive"
  ]
}
```


## Options

`remark-lint-are-links-valid-alive` uses [`broken-link-checker`](https://www.npmjs.com/package/broken-link-checker) internally. So you can pass any its [options](https://www.npmjs.com/package/broken-link-checker#options) to `remark-lint-are-links-valid-alive`.


## Changelog

Follows `semver` and `conventional-commits`. See [CHANGELOG.md](CHANGELOG.md).


## License

MIT, see [LICENSE.md](LICENCE.md) for details.


## Part of a bigger family

This project is a part of [remark-lint-are-links-valid](https://github.com/wemake-services/remark-lint-are-links-valid)
