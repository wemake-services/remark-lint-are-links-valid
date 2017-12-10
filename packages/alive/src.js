const blc = require('broken-link-checker')
const main = require('remark-lint-are-links-valid-core')

function handleLinkDuplicateError (file, link, reason) {
  const message = `Link ${link.link.href} is not responding: ${reason}`
  const {node} = link

  file.info(message, node)
}

function findCheckableLinks (ast) {
  const ignoredSchemes = [
    'data:',
    'geo:',
    'irc:',
    'mailto:',
    'sms:',
    'tel:'
  ]

  return main.findLinks(ast).filter(link => {
    return ignoredSchemes.indexOf(link.link.protocol) === -1
  })
}

function areLinksAlive (ast, file, options, done) {
  const links = findCheckableLinks(ast)
  const settings = main.getSettings(options)

  const urlChecker = new blc.UrlChecker(settings, {
    link: (result, data) => {
      if (result.broken) {
        handleLinkDuplicateError(file, data, result.brokenReason)
      }
    },
    end: () => done()
  })

  if (links.length === 0) {
    // There are no links to handle:
    done()
    return
  }

  links.map((link) => {
    urlChecker.enqueue(link.link.href, null, link)
  })
}

module.exports = main.createRule('alive', areLinksAlive)
