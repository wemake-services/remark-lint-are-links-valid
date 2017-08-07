/* global describe it */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const duplicate = require('../packages/duplicate')
const lintFabric = require('./utils')
const lint = lintFabric(duplicate)

// Test cases:

describe('Are there duplicate links', () => {
  describe('No links situation', () => {
    it(`Expect no warnings`, (done) => {
      const result = lint(`
        Hello world!
        There is no problem there, because there're no links
      `)

      expect(result).to.eventually.have
        .property('messages').lengthOf(0)
        .notify(done)
    })
  })

  describe('Testing plugin with duplicated links', () => {
    const markdown = `
      [First duplicated link](https://github.com/wemake-services/remark-lint-are-links-valid)
      [Second duplicted link](https://github.com/wemake-services/remark-lint-are-links-valid)
    `

    it('Expect warnings with default settings', () => {
      const result = lint(markdown)

      return expect(result).to.eventually.have
        .property('messages').lengthOf(1)
    })

    it('Expect no warnings with `whiteListDomains` setting', () => {
      const result = lint(markdown, {whiteListDomains: ['github.com']})

      return expect(result).to.eventually.have
        .property('messages').lengthOf(0)
    })
  })

  describe('Hash links situation', () => {
    it(`Expect no warnings`, (done) => {
      const result = lint(`
        # Test
        [Link](#test)
        [Duplicate Link](#test)
      `)

      expect(result).to.eventually.have
        .property('messages').lengthOf(0)
        .notify(done)
    })
  })
})
