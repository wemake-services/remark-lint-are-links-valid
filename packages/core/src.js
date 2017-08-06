// Basic logics for all packages.

const url = require('url')

const rule = require('unified-lint-rule')
const visit = require('unist-util-visit')
const defaults = require('object.defaults')

const findLinks = (ast) => {
  const links = []

  visit(ast, 'link', (node) => {
    const link = url.parse(node.url)
    if (link.host !== null) { // links without `host` are just `#hashes`
      links.push({node, link})
    }
  })

  return links
}

const getSettings = (options) => {
  const defaultSettings = {
    // These settings allow duplicate links validation:
    allowDuplicates: false,
    whiteListDomains: []
  }
  const settings = options || {}
  defaults(settings, defaultSettings)

  return settings
}

const createRule = (name, callback) => {
  return rule(
    `remark-lint:are-links-valid:${name}`,
    callback
  )
}

export default {
  findLinks,
  getSettings,
  createRule
}
