/* global describe it */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const remark = require('remark')
const remarkLint = require('remark-lint')
const dedent = require('dedent')

const duplicate = require('../packages/duplicate')

// Utils:

const lint = (md, options) => {
  return remark()
    .use(remarkLint)
    .use(duplicate, options)
    .process(md)
}

// Test cases:

describe('No links situation', () => {
  it(`Expect no warnings`, (done) => {
    const result = lint(dedent`
      Hello world!
      There is no problem there, because there're no links
    `)

    expect(result).to.eventually.have
      .property('messages').lengthOf(0)
      .notify(done)
  })
})

describe('Testing plugin with duplicated links', () => {
  const markdown = dedent`
    [First duplicated link](https://github.com/wemake-services/remark-lint-are-links-valid)
    [Second duplicted link](https://github.com/wemake-services/remark-lint-are-links-valid)
  `

  it('Expect warnings with default settings', () => {
    const result = lint(markdown)

    return expect(result).to.eventually.have
      .property('messages').lengthOf(1)
  })

  it('Expect no warnings with `allowDuplicates` setting', () => {
    const result = lint(markdown, {allowDuplicates: true})

    return expect(result).to.eventually.have
      .property('messages').lengthOf(0)
  })

  // TODO: check hash links
})
