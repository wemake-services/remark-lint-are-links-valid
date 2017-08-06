import main from '../../dist'

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
  const links = main.findLinks(ast)
  const settings = main.getSettings(options)

  checkAndRemoveDubplicates(file, links, settings)
}

module.exports = main.createRule('duplicates', areLinksDuplicate)
