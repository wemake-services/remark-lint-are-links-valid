import url from 'url'

import rule from 'unified-lint-rule'
import visit from 'unist-util-visit'
import defaults from 'object.defaults'

function handleLinkDuplicateError (file, link) {
  const message = `Link is a duplicate: ${link.link.href}`
  const {node} = link

  file.info(message, node)
}

function checkAndRemoveDubplicates (file, links, settings) {
  const duplicates = []
  const valid = {}

  links.map((link) => {
    const url = `${link.link.host}${link.link.path}`
    if (!(url in valid)) {
      valid[url] = link
    } else if (
      !settings.allowDuplicates &&
      settings.whiteListDomains.indexOf(link.link.host) === -1
    ) {
      duplicates.push(link)
    }
  })

  duplicates.map((item) => handleLinkDuplicateError(file, item))
}

function areLinksDuplicate (ast, file, options) {
  const defaultSettings = {
    // These settings allow duplicate links validation:
    allowDuplicates: false,
    whiteListDomains: []
  }
  const settings = options || {}
  defaults(settings, defaultSettings)

  const links = []

  visit(ast, 'link', (node) => {
    const link = url.parse(node.url)
    if (link.host !== null) { // links without `host` are just `#hashes`
      links.push({node, link})
    }
  })

  checkAndRemoveDubplicates(file, links, settings)
}

module.exports = rule(
  'remark-lint:are-links-valid:duplicate',
  areLinksDuplicate
)
