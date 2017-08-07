const main = require('remark-lint-are-links-valid-core')

function handleLinkDuplicateError (file, link) {
  const message = `Link is a duplicate: ${link.link.href}`
  const {node} = link

  file.info(message, node)
}

function checkDubplicates (file, links, settings) {
  const duplicates = []
  const valid = {}

  links.map((link) => {
    const url = `${link.link.host}${link.link.path}`
    if (!(url in valid)) {
      valid[url] = link
    } else if (
      settings.whiteListDomains.indexOf(link.link.host) === -1
    ) {
      duplicates.push(link)
    }
  })

  duplicates.map((item) => handleLinkDuplicateError(file, item))
}

function areLinksDuplicate (ast, file, options) {
  const links = main.findLinks(ast)
  const settings = main.getSettings(options)

  checkDubplicates(file, links, settings)
}

module.exports = main.createRule('duplicates', areLinksDuplicate)
