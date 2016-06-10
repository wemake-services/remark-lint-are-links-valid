# remark-lint-are-links-valid

[![Build Status](https://travis-ci.org/wemake-services/remark-lint-are-links-valid.svg?branch=master)](https://travis-ci.org/wemake-services/remark-lint-are-links-valid) [![Coverage Status](https://coveralls.io/repos/github/wemake-services/remark-lint-are-links-valid/badge.svg?branch=master)](https://coveralls.io/github/wemake-services/remark-lint-are-links-valid?branch=master)

This rule checks every link in your `Markdown` file to point to the existing resource. There are also different options to configure.

Inspired by [awesome_bot](https://github.com/dkhamsing/awesome_bot).

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

#### Using different options

Set up your `.remarkrc`:

```JSON
{
  "plugins": {
    "remark-lint": {
      "external": ["remark-lint-are-links-valid"],
      "are-links-valid": {
        "allowDuplicates": false,
        "whiteListDomains": ["github.com"],

        "allowErrors": [301],
        "allowRedirects": true,
        "timeout": 10000,
      }
    }
  }
}
```

Options:

- `allowDuplicates`, defaults to `true`, if set to `false` checks for each domain to be unique on the page, some domains can be whitelisted by the `whiteListDomains` option.
- `whiteListDomains`, defaults to `[]`, if both `allowDuplicates` is set to `false` and it is set to any array containing string domains, will not raise any warnings when there are multiple urls for the same domain on the single page.
- `allowErrors`, defaults to `[]`, when the link is validated it is expected to have the `HTTP` status code `2XX`, this setting allows to add any other numeric values.
- `allowRedirects`, defaults to `true`, when set to `false` will not follow any redirects from the linked resource.
- `timeout`, defaults to `5000`, change this value to set the desired timeout for the request.

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
