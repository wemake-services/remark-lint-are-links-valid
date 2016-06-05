# remark-lint-are-links-valid

[![Build Status](https://travis-ci.org/wemake-services/remark-lint-are-links-valid.svg?branch=master)](https://travis-ci.org/wemake-services/remark-lint-are-links-valid) [![Coverage Status](https://coveralls.io/repos/github/wemake-services/remark-lint-are-links-valid/badge.svg?branch=master)](https://coveralls.io/github/wemake-services/remark-lint-are-links-valid?branch=master)



## Using the rule

### Via `.remarkrc`

```bash
npm install -g remark
npm install -g remark-lint
npm install remark-lint-are-links-valid # local install!
```

Then, set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-are-links-valid"]
    }
  }
}
```

Now you can use the following command to run the lint:

```bash
remark --no-stdout xxx.md
```

#### Using another ending symbol

Set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-are-links-valid"],
      "are-links-valid": {
        "endings": ["...", ";", "."]
        }
    }
  }
}
```

### Via CLI

```bash
npm install -g remark
npm install -g remark-lint
npm install -g remark-lint-are-links-valid # global install!
remark --no-stdout -u remark-lint="external:[\"remark-lint-are-links-valid\"]" xxx.md
```

Note that the `lint=<lint_options>` option only works with `remark >= 1.1.1`.

## License

MIT, see [LICENSE.md](LICENCE.md) for details.

This `README.md` is based on [this one](https://github.com/chcokr/mdast-lint-sentence-newline/blob/250b106c9e19b387270099cf16f17a84643f8944/README.md) by [@chcokr](https://github.com/chcokr) (MIT).
