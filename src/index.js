//

import rule from 'unified-lint-rule'
import visit from 'unist-util-visit'
import defaults from 'object.defaults'

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

module.exports = {
  findLinks,
  getSettings,
  createRule
}
