/* global describe it */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect

const alive = require('../packages/alive')
const lintFabric = require('./utils')
const lint = lintFabric(alive)

// Test cases:

describe('Are links alive', () => {
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

  describe('Broken links', () => {
    it(`Expect 404 warning`, (done) => {
      const result = lint(`
        [Does not exist](http://wemake.services/broken)
      `)

      expect(result).to.eventually.have
        .property('messages').lengthOf(1)
        .notify(done)
    })
  })

  describe('Alive links', () => {
    it(`Expect no warnings on alive links`, (done) => {
      const result = lint(`
        [Exists](http://wemake.services)
      `)

      expect(result).to.eventually.have
        .property('messages').lengthOf(0)
        .notify(done)
    })

    it(`Expect no warnings on hash links`, (done) => {
      const result = lint(`
        # Test
        [Exists hash](#test)
      `)

      expect(result).to.eventually.have
        .property('messages').lengthOf(0)
        .notify(done)
    })
  })
})
