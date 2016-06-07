const assert = require('assert');
const fs = require('fs');
const remark = require('remark');
const lintPlugin = require('remark-lint');
const path = require('path');

function createProccessor(settings) {
  const pluginOptions = {
    external: ['../dist/are-links-valid.js'],
  };

  if (settings !== undefined) {
    pluginOptions['are-links-valid'] = settings;
  }

  return remark().use(lintPlugin, pluginOptions);
}

function assertionCallback(err, file, warnings, done) {
  if (err) { throw err; }

  // actual, expected
  assert.deepEqual(warnings, file.messages);
  done();
}

function loadWarnings(fixtureName) {
  return require(path.join(__dirname, fixtureName, 'expected.js'));
}

function loadFixture(fixtureName) {
  return fs.readFileSync(
    path.join(__dirname, fixtureName, 'file.md')
  ).toString();
}

function createMessage(line, column, href, duplicate) {
  const message = duplicate ? `Link is a duplicate: ${href}` : `Link is broken: ${href}`;
  return {
    name: line + ':' + column,
    file: '',
    message,
    reason: message,
    line,
    column,
    location: {
      start: { line, column },
      end: { line: null, column: null },
    },
    fatal: false,
    ruleId: 'are-links-valid',
    source: 'remark-lint',
  };
}

function assertWarningsLength(fixtureName, warnings, done, settings) {
  const processor = createProccessor(settings);

  processor.process(
    loadFixture(fixtureName),
    (err, file) => assertionCallback(err, file, warnings, done)
  );
}

module.exports = { createMessage, assertWarningsLength, loadWarnings };
