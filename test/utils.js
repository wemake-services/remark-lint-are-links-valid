const remark = require('remark')
const remarkLint = require('remark-lint')
const dedent = require('dedent')

// Utils:

const lintFabric = (middleware) => {
  return (md, options) => {
    return remark()
      .use(remarkLint)
      .use(middleware, options)
      .process(dedent(md))
  }
}

module.exports = lintFabric
