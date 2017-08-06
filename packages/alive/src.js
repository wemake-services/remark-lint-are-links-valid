const blc = require('broken-link-checker')
const main =require('../../dist')

function handleLinkDuplicateError (file, link, reason) {
  const message = `Link ${link.link.href} is not responding: ${reason}`
  const {node} = link

  file.info(message, node)
}

function areLinksAlive (ast, file, options, done) {
  const links = main.findLinks(ast)
  const settings = main.getSettings(options)

  const urlChecker = new blc.UrlChecker(options, {
    link: (result, data) => {
      if (result.broken) {
        handleLinkDuplicateError(file, data, result.brokenReason)
      }
    },
    end: () => done()
  })

  if (links.length > 0) {
    links.map((link) => {
      urlChecker.enqueue(link.link.href, null, link)
    })
  } else {
    // There are no links to handle:
    done()
  }
}

module.exports = main.createRule('alive', areLinksAlive)
