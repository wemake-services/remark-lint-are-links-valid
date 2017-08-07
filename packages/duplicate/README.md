# remark-lint-are-links-valid-duplicate

[![Build Status](https://travis-ci.org/wemake-services/remark-lint-are-links-valid.svg?branch=master)](https://travis-ci.org/wemake-services/remark-lint-are-links-valid) [![Coverage Status](https://coveralls.io/repos/github/wemake-services/remark-lint-are-links-valid/badge.svg?branch=master)](https://coveralls.io/github/wemake-services/remark-lint-are-links-valid?branch=master) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

> Make your links to follow to your rules!


## Installation

```bash
npm install remark-lint-are-links-valid-duplicate # or yarn
```


## Usage

Add `remark-lint-are-links-valid-duplicate` to `remark`'s [configuration](https://github.com/wooorm/remark/tree/master/packages/remark-cli):

```json
{
  "plugins": [
    ...
    "remark-lint-are-links-valid-duplicate"
  ]
}
```


## Options

- `whiteListDomains` - this option will allow duplicate links for a specified domains, default: `[]`


## Part of a bigger family

This project is a part of [remark-lint-are-links-valid](https://github.com/wemake-services/remark-lint-are-links-valid)
